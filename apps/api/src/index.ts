import Fastify from "fastify";
import cors from "@fastify/cors";
import "./types-import.js";
import { auth } from "./auth.js";
import { prisma, type UserRole } from "@kya-khana/db";
import {
	assertCanVote,
	buildDashboardFeed,
	breakTie,
	castVote,
	closeVoting,
	computeGroceryShortfall,
	generateCombosForCycle,
	proposeDeduction,
	applyDeduction,
	requireRole,
	sendToHousehold,
	startSchedulers,
	stopSchedulers,
	subscribe,
	unsubscribe,
	type Session,
} from "@kya-khana/core";

const app = Fastify({ logger: true });

const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:4000";

await app.register(cors, {
	origin: "http://localhost:3000",
	credentials: true,
});

// Better Auth generic handler mounted at /api/auth/*
app.all("/api/auth/*", async (request, reply) => {
	const url = new URL(request.raw.url ?? "/", baseURL);

	const headers = new Headers();
	for (const [k, v] of Object.entries(request.headers)) {
		if (v === undefined) continue;
		if (Array.isArray(v)) {
			for (const item of v) headers.append(k, item);
		} else {
			headers.set(k, v);
		}
	}

	const body =
		request.method === "GET" || request.method === "HEAD"
			? undefined
			: JSON.stringify(request.body);

	const webReq = new Request(url, {
		method: request.method,
		headers,
		body,
	});

	const webRes = await auth.handler(webReq);

	reply.status(webRes.status);
	webRes.headers.forEach((value, key) => {
		void reply.header(key, value);
	});

	const resBody = await webRes.text();
	return reply.send(resBody);
});

// Helper: get session from Better Auth, narrowed to the core Session shape.
async function getSession(
	request: Fastify.FastifyRequest,
): Promise<Session | null> {
	const headers = new Headers();
	for (const [k, v] of Object.entries(request.headers)) {
		if (v === undefined) continue;
		if (Array.isArray(v)) {
			for (const item of v) headers.append(k, item);
		} else {
			headers.set(k, v);
		}
	}
	const raw = await auth.api.getSession({ headers });
	if (!raw?.user) return null;
	return {
		user: {
			id: raw.user.id,
			name: raw.user.name,
			email: raw.user.email,
			role: raw.user.role,
			householdId: raw.user.householdId ?? undefined,
		},
	};
}

// POST /auth/onboarding
app.post("/auth/onboarding", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user) {
		return reply.status(401).send({ error: "Unauthorized" });
	}

	const body = request.body as {
		role?: string;
		morningCookTime?: string;
		eveningCookTime?: string;
		cuisinePreference?: string;
	};

	const role = body.role;
	if (!role || (role !== "housemate" && role !== "cook")) {
		return reply.status(400).send({ error: "Invalid role" });
	}

	const user = await prisma.user.findUnique({
		where: { id: session.user.id },
	});
	if (!user) {
		return reply.status(404).send({ error: "User not found" });
	}

	// Role sticky check
	if (user.role && user.role !== role) {
		return reply
			.status(409)
			.send({ error: "Role already set and cannot be changed" });
	}

	// Update user role
	await prisma.user.update({
		where: { id: user.id },
		data: { role: role as UserRole },
	});

	// Update household cook times / cuisine (idempotent)
	await prisma.household.update({
		where: { id: user.householdId },
		data: {
			morningCookTime: body.morningCookTime
				? new Date(`1970-01-01T${body.morningCookTime}:00Z`)
				: undefined,
			eveningCookTime: body.eveningCookTime
				? new Date(`1970-01-01T${body.eveningCookTime}:00Z`)
				: undefined,
			cuisinePreference: body.cuisinePreference ?? undefined,
		},
	});

	return reply.send({ ok: true });
});

// GET /auth/me
app.get("/auth/me", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user) {
		return reply.status(401).send({ error: "Unauthorized" });
	}

	const user = await prisma.user.findUnique({
		where: { id: session.user.id },
		include: { household: true },
	});
	if (!user) {
		return reply.status(404).send({ error: "User not found" });
	}

	const household = user.household;
	const onboarded = Boolean(
		user.role && household?.morningCookTime && household?.eveningCookTime,
	);

	return reply.send({
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		householdId: user.householdId,
		household: household
			? {
					id: household.id,
					name: household.name,
					cuisinePreference: household.cuisinePreference,
					morningCookTime: household.morningCookTime
						? household.morningCookTime.toISOString().slice(11, 16)
						: null,
					eveningCookTime: household.eveningCookTime
						? household.eveningCookTime.toISOString().slice(11, 16)
						: null,
				}
			: null,
		onboarded,
	});
});

// POST /auth/logout
app.post("/auth/logout", async (request, reply) => {
	const headers = new Headers();
	for (const [k, v] of Object.entries(request.headers)) {
		if (v === undefined) continue;
		if (Array.isArray(v)) {
			for (const item of v) headers.append(k, item);
		} else {
			headers.set(k, v);
		}
	}

	await auth.api.signOut({ headers });
	return reply.send({ ok: true });
});

// GET /meals/feed
app.get("/meals/feed", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user?.householdId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}
	const feed = await buildDashboardFeed(
		prisma,
		session.user.householdId,
		session.user.id,
	);
	return reply.send(feed);
});

// POST /meals/:cycleId/regenerate
app.post("/meals/:cycleId/regenerate", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user?.householdId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}
	requireRole(session, "housemate", "admin");

	const { cycleId } = request.params as { cycleId: string };
	await generateCombosForCycle(prisma, cycleId);
	const feed = await buildDashboardFeed(
		prisma,
		session.user.householdId,
		session.user.id,
	);
	const meal = feed.meals.find((m) => m.id === cycleId);
	return reply.send(meal ?? feed);
});

// POST /votes
app.post("/votes", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user) {
		return reply.status(401).send({ error: "Unauthorized" });
	}
	assertCanVote(session);

	const body = request.body as { mealCycleId: string; mealComboId: string };
	if (!body.mealCycleId || !body.mealComboId) {
		return reply
			.status(400)
			.send({ error: "mealCycleId and mealComboId required" });
	}

	const vote = await castVote(
		prisma,
		session.user.id,
		body.mealCycleId,
		body.mealComboId,
	);
	return reply.send({
		mealCycleId: vote.mealCycleId,
		mealComboId: vote.mealComboId,
	});
});

// POST /meals/:cycleId/close
app.post("/meals/:cycleId/close", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user?.householdId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}
	requireRole(session, "housemate", "admin");

	const { cycleId } = request.params as { cycleId: string };
	await closeVoting(prisma, cycleId);
	const feed = await buildDashboardFeed(
		prisma,
		session.user.householdId,
		session.user.id,
	);
	const meal = feed.meals.find((m) => m.id === cycleId);
	return reply.send(meal ?? { ok: true });
});

// POST /meals/:cycleId/break-tie
app.post("/meals/:cycleId/break-tie", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user?.householdId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}
	requireRole(session, "housemate", "admin");

	const { cycleId } = request.params as { cycleId: string };
	const body = request.body as { mealComboId: string };
	if (!body.mealComboId) {
		return reply.status(400).send({ error: "mealComboId required" });
	}
	await breakTie(prisma, cycleId, body.mealComboId);
	const feed = await buildDashboardFeed(
		prisma,
		session.user.householdId,
		session.user.id,
	);
	const meal = feed.meals.find((m) => m.id === cycleId);
	return reply.send(meal ?? { ok: true });
});

// GET /inventory/stock
app.get("/inventory/stock", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user?.householdId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}

	const items = await prisma.inventoryItem.findMany({
		where: { householdId: session.user.householdId },
		include: { ingredient: true },
	});

	const categoryMap = new Map<
		string,
		{
			name: string;
			items: Array<{
				ingredientId: string;
				name: string;
				quantity: number;
				unit: string;
				category: string;
			}>;
		}
	>();
	for (const item of items) {
		const cat = item.ingredient.category;
		if (!categoryMap.has(cat)) {
			categoryMap.set(cat, { name: cat, items: [] });
		}
		categoryMap.get(cat)!.items.push({
			ingredientId: item.ingredientId,
			name: item.ingredient.name,
			quantity: item.quantity,
			unit: item.unit,
			category: cat,
		});
	}

	return reply.send({ categories: Array.from(categoryMap.values()) });
});

// PATCH /inventory/:ingredientId
app.patch("/inventory/:ingredientId", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user?.householdId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}

	const { ingredientId } = request.params as { ingredientId: string };
	const body = request.body as { quantity?: number; unit?: string };
	if (body.quantity === undefined) {
		return reply.status(400).send({ error: "quantity required" });
	}

	const upserted = await prisma.inventoryItem.upsert({
		where: {
			householdId_ingredientId: {
				householdId: session.user.householdId,
				ingredientId,
			},
		},
		create: {
			id: `inv_${session.user.householdId}_${ingredientId}`,
			householdId: session.user.householdId,
			ingredientId,
			quantity: body.quantity,
			unit: body.unit ?? "g",
		},
		update: {
			quantity: body.quantity,
			unit: body.unit ?? undefined,
		},
		include: { ingredient: true },
	});

	return reply.send({
		ingredientId: upserted.ingredientId,
		name: upserted.ingredient.name,
		quantity: upserted.quantity,
		unit: upserted.unit,
		category: upserted.ingredient.category,
	});
});

// GET /grocery/list
app.get("/grocery/list", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user?.householdId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}

	const query = request.query as { cycleIds?: string };
	const cycleIds = query.cycleIds ? query.cycleIds.split(",") : undefined;
	const items = await computeGroceryShortfall(
		prisma,
		session.user.householdId,
		cycleIds,
	);
	return reply.send({ items });
});

// GET /cook/:mealCycleId
app.get("/cook/:mealCycleId", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user?.householdId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}
	requireRole(session, "cook", "admin");

	const { mealCycleId } = request.params as { mealCycleId: string };
	const cycle = await prisma.mealCycle.findUnique({
		where: { id: mealCycleId },
		include: {
			winningCombo: {
				include: {
					items: {
						include: {
							dish: {
								include: {
									ingredients: { include: { ingredient: true } },
								},
							},
							mealComponent: true,
						},
					},
				},
			},
		},
	});
	if (!cycle) {
		return reply.status(404).send({ error: "Meal cycle not found" });
	}
	const combo = cycle.winningCombo;
	if (!combo) {
		return reply.status(400).send({ error: "No winning combo yet" });
	}

	const inventoryItems = await prisma.inventoryItem.findMany({
		where: { householdId: session.user.householdId },
	});
	const inventoryMap = new Map<string, number>();
	for (const inv of inventoryItems)
		inventoryMap.set(inv.ingredientId, inv.quantity);

	let allIngredientsAvailable = true;
	let recipeSteps: string[] = [];
	let videoReferences: string[] = [];
	let prepTimeMin = 0;

	const items = combo.items.map((item: any) => ({
		componentId: item.mealComponentId,
		componentName: item.mealComponent.name,
		dishId: item.dishId,
		dishName: item.dish.name,
		isVegetarian: item.dish.isVegetarian,
	}));

	const isNonVeg = items.some((item: any) => !item.isVegetarian);
	const diet = isNonVeg ? "nonveg" : "veg";

	// Veg variant for cook: if nonveg sabji wins (non-breakfast), show veg alt the cook must also make
	let vegVariant: { dishId: string; dishName: string } | null = null;
	if (isNonVeg && cycle.mealSubType !== "breakfast") {
		const nonvegItem = items.find((item: any) => !item.isVegetarian);
		if (nonvegItem) {
			const vegAlt = await prisma.dish.findFirst({
				where: {
					componentId: nonvegItem.componentId,
					isVegetarian: true,
					id: { not: nonvegItem.dishId },
				},
			});
			if (vegAlt) vegVariant = { dishId: vegAlt.id, dishName: vegAlt.name };
		}
	}

	for (const item of combo.items) {
		prepTimeMin = Math.max(prepTimeMin, item.dish.prepTimeMin);
		recipeSteps = recipeSteps.concat(item.dish.recipeSteps);
		videoReferences = videoReferences.concat(item.dish.videoReferences);
		for (const di of item.dish.ingredients) {
			const have = inventoryMap.get(di.ingredientId) ?? 0;
			if (have < di.quantity) allIngredientsAvailable = false;
		}
	}

	return reply.send({
		mealCycleId: cycle.id,
		mealSubType: cycle.mealSubType,
		winningCombo: {
			id: combo.id,
			displayOrder: 1,
			diet,
			items,
			voteCount: 0,
			vegVariant,
		},
		recipeSteps,
		videoReferences,
		prepTimeMin,
		allIngredientsAvailable,
	});
});

// POST /cook/mark-cooked
app.post("/cook/mark-cooked", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user?.householdId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}
	requireRole(session, "cook", "admin");

	const body = request.body as {
		mealCycleId: string;
		adjustments?: Array<{ ingredientId: string; deductQty: number }>;
	};
	if (!body.mealCycleId) {
		return reply.status(400).send({ error: "mealCycleId required" });
	}

	if (!body.adjustments || body.adjustments.length === 0) {
		const proposals = await proposeDeduction(prisma, body.mealCycleId);
		return reply.send(proposals);
	}

	await applyDeduction(prisma, body.mealCycleId, body.adjustments);
	await sendToHousehold(prisma, session.user.householdId, {
		title: "Food is ready!",
		body: "The cook has marked the meal as ready. Time to eat!",
	});
	return reply.send({ ok: true });
});

// POST /push/subscribe
app.post("/push/subscribe", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user?.householdId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}

	const body = request.body as {
		endpoint: string;
		keys: { p256dh: string; auth: string };
	};
	if (!body.endpoint || !body.keys?.p256dh || !body.keys?.auth) {
		return reply.status(400).send({ error: "Invalid subscription payload" });
	}
	await subscribe(prisma, session.user.householdId, session.user.id, body);
	return reply.send({ ok: true });
});

// DELETE /push/subscription
app.delete("/push/subscription", async (request, reply) => {
	const session = await getSession(request);
	if (!session?.user) {
		return reply.status(401).send({ error: "Unauthorized" });
	}

	const body = request.body as { endpoint?: string };
	if (!body.endpoint) {
		return reply.status(400).send({ error: "endpoint required" });
	}
	await unsubscribe(prisma, body.endpoint);
	return reply.send({ ok: true });
});

// Dev-only: trigger reveal manually
app.post("/dev/reveal", async (request, reply) => {
	if (process.env.NODE_ENV === "production") {
		return reply.status(404).send({ error: "Not found" });
	}
	const session = await getSession(request);
	if (!session?.user?.householdId) {
		return reply.status(401).send({ error: "Unauthorized" });
	}

	const { type } = request.query as { type?: string };
	const suggestionType =
		type === "evening_930pm"
			? ("evening_930pm" as const)
			: ("morning_10am" as const);

	const { revealMealsForWindow } = await import("@kya-khana/core");
	const cycles = await revealMealsForWindow(
		prisma,
		session.user.householdId,
		suggestionType,
	);
	return reply.send({ cycles: cycles.map((c) => c.id) });
});

app.get("/health", async () => {
	return { status: "ok" };
});

const PORT = Number(process.env.PORT) || 4000;

app.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
	app.log.info(`API listening on http://localhost:${PORT}`);
	startSchedulers(prisma, app);
});

export { app, stopSchedulers };
