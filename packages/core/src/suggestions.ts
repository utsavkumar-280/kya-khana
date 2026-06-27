import type {
	PrismaClient,
	MealCombo,
	MealCycle,
	MealType,
	MealSubType,
	Dish,
	SuggestionType,
} from "@kya-khana/db";
import { deriveMealTimes } from "./times.js";

function timeStringToDate(t: string): Date {
	return new Date(`1970-01-01T${t}:00Z`);
}

export async function generateCombosForCycle(
	prisma: PrismaClient,
	mealCycleId: string,
): Promise<MealCombo[]> {
	const cycleRaw = await prisma.mealCycle.findUnique({
		where: { id: mealCycleId },
		include: {
			mealTemplate: {
				include: {
					components: {
						orderBy: { displayOrder: "asc" },
						include: { dishes: true },
					},
				},
			},
		},
	});
	if (!cycleRaw) throw new Error("MealCycle not found");
	const cycle = cycleRaw; // narrowed

	// 1. Get recent winning dish ids for rotation (last 7 decided/cooked cycles)
	const recentCycles = await prisma.mealCycle.findMany({
		where: {
			householdId: cycle.householdId,
			status: { in: ["decided", "cooked"] },
			id: { not: cycle.id },
		},
		orderBy: { date: "desc" },
		take: 7,
		include: {
			winningCombo: {
				include: { items: { select: { dishId: true } } },
			},
			mealCombos: {
				include: { items: { select: { dishId: true } } },
			},
		},
	});

	const recentDishIds = new Set<string>();
	for (const rc of recentCycles) {
		const combos = rc.winningCombo ? [rc.winningCombo] : rc.mealCombos;
		for (const combo of combos) {
			for (const item of combo.items) recentDishIds.add(item.dishId);
		}
	}

	// 2. Load inventory for the household to score availability
	const inventoryItems = await prisma.inventoryItem.findMany({
		where: { householdId: cycle.householdId },
	});
	const inventoryMap = new Map<string, number>();
	for (const inv of inventoryItems)
		inventoryMap.set(inv.ingredientId, inv.quantity);

	// 3. Load dish ingredients for scoring
	const allDishIds: string[] = cycle.mealTemplate.components.flatMap(
		(c: { dishes: Dish[] }) => c.dishes.map((d: Dish) => d.id),
	);
	const dishIngredients = await prisma.dishIngredient.findMany({
		where: { dishId: { in: allDishIds } },
	});
	const dishIngredientsMap = new Map<string, typeof dishIngredients>();
	for (const di of dishIngredients) {
		const arr = dishIngredientsMap.get(di.dishId) ?? [];
		arr.push(di);
		dishIngredientsMap.set(di.dishId, arr);
	}

	function scoreDish(dishId: string): number {
		const ingredients = dishIngredientsMap.get(dishId) ?? [];
		if (ingredients.length === 0) return 0;
		let sum = 0;
		for (const di of ingredients) {
			const have = inventoryMap.get(di.ingredientId) ?? 0;
			const ratio = Math.min(1, have / di.quantity);
			sum += ratio;
		}
		return sum / ingredients.length;
	}

	function pickDishesForCombo(
		excludeDishIds: Set<string>,
	): Map<string, string> {
		const picks = new Map<string, string>(); // componentId -> dishId
		for (const component of cycle.mealTemplate.components) {
			// Filter by mealSubType
			let pool = component.dishes.filter(
				(d: Dish) =>
					d.mealSubType === "any" || d.mealSubType === cycle.mealSubType,
			);
			// Rotation: exclude recently used
			const filtered = pool.filter(
				(d: Dish) => !recentDishIds.has(d.id) && !excludeDishIds.has(d.id),
			);
			if (filtered.length > 0) pool = filtered;
			// If still empty after excluding recent, allow repeats but still respect excludeDishIds
			const nonExcludedPool = pool.filter(
				(d: Dish) => !excludeDishIds.has(d.id),
			);
			if (nonExcludedPool.length > 0) pool = nonExcludedPool;

			if (pool.length === 0) {
				// Fallback: any dish in component matching subtype
				pool = component.dishes.filter(
					(d: Dish) =>
						d.mealSubType === "any" || d.mealSubType === cycle.mealSubType,
				);
			}
			if (pool.length === 0) continue;

			// v1: pick 1 per component unless min/max differ
			const min = component.minSelections;
			const max = component.maxSelections;
			const count = min === 1 && max === 1 ? 1 : min;

			// Weighted random pick
			const scored = pool.map((d: Dish) => ({
				dish: d,
				weight: 0.5 * scoreDish(d.id) + 0.5 * Math.random(),
			}));
			scored.sort(
				(a: { weight: number }, b: { weight: number }) => b.weight - a.weight,
			);

			for (let i = 0; i < count && i < scored.length; i++) {
				picks.set(component.id, scored[i].dish.id);
			}
		}
		return picks;
	}

	// Build combo A
	const comboAPicks = pickDishesForCombo(new Set());
	const comboBPicks = pickDishesForCombo(
		new Set(Array.from(comboAPicks.values())),
	);

	// Persist: delete existing combos first, then create 2 new combos
	return await prisma.$transaction(async (tx) => {
		await tx.mealCombo.deleteMany({ where: { mealCycleId: cycle.id } });

		const createdCombos: MealCombo[] = [];
		for (let order = 1; order <= 2; order++) {
			const picks = order === 1 ? comboAPicks : comboBPicks;
			const combo = await tx.mealCombo.create({
				data: {
					mealCycleId: cycle.id,
					displayOrder: order,
					items: {
						create: Array.from(picks.entries()).map(
							([componentId, dishId]) => ({
								mealComponentId: componentId,
								dishId,
							}),
						),
					},
				},
				include: { items: true },
			});
			createdCombos.push(combo as MealCombo);
		}
		return createdCombos;
	});
}

export async function revealMealsForWindow(
	prisma: PrismaClient,
	householdId: string,
	suggestionType: "morning_10am" | "evening_930pm",
): Promise<MealCycle[]> {
	const now = new Date();
	const today = new Date(
		Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
	);
	const tomorrow = new Date(today);
	tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

	const household = await prisma.household.findUnique({
		where: { id: householdId },
	});
	if (!household) throw new Error("Household not found");

	function makeDateTime(_date: Date, timeStr: string | null): Date | null {
		if (!timeStr) return null;
		return timeStringToDate(timeStr);
	}

	function getCookTime(mealType: MealType): string | null {
		const t =
			mealType === "morning"
				? (household?.morningCookTime?.toISOString().slice(11, 16) ?? "08:00")
				: (household?.eveningCookTime?.toISOString().slice(11, 16) ?? "19:30");
		return t;
	}

	async function findOrCreateCycle(
		date: Date,
		mealType: MealType,
		mealSubType: MealSubType,
	): Promise<MealCycle> {
		const cookTime = getCookTime(mealType);
		const derived = cookTime ? deriveMealTimes(cookTime) : null;

		// Find template matching mealSubType
		const templateWithDishes = await prisma.mealTemplate.findFirst({
			where: { householdId, mealSubType, isActive: true },
			include: { components: { include: { dishes: true } } },
		});
		// Fallback: if template exists but has zero dishes, use lunch template
		const hasDishes =
			templateWithDishes &&
			templateWithDishes.components.some(
				(c: { dishes: unknown[] }) => c.dishes.length > 0,
			);
		let templateId = templateWithDishes?.id;
		if (!hasDishes && mealSubType !== "lunch") {
			const fallback = await prisma.mealTemplate.findFirst({
				where: { householdId, mealSubType: "lunch", isActive: true },
			});
			if (fallback) templateId = fallback.id;
		}
		if (!templateId) throw new Error(`No active template for ${mealSubType}`);

		const existing = await prisma.mealCycle.findFirst({
			where: {
				householdId,
				date,
				mealType,
				mealSubType,
			},
		});

		if (existing) {
			if (existing.status === "pending") {
				const updated = await prisma.mealCycle.update({
					where: { id: existing.id },
					data: {
						status: "voting",
						revealedAt: now,
						cookTime: makeDateTime(date, derived?.cookTime ?? cookTime),
						orderingDeadline: makeDateTime(
							date,
							derived?.orderingDeadline ?? cookTime,
						),
						suggestionTime: makeDateTime(
							date,
							derived?.suggestionTime ?? cookTime,
						),
						mealTemplateId: templateId,
					},
				});
				return updated;
			}
			return existing;
		}

		const created = await prisma.mealCycle.create({
			data: {
				householdId,
				date,
				mealType,
				mealSubType,
				mealTemplateId: templateId,
				cookTime: makeDateTime(date, derived?.cookTime ?? cookTime),
				orderingDeadline: makeDateTime(
					date,
					derived?.orderingDeadline ?? cookTime,
				),
				suggestionTime: makeDateTime(date, derived?.suggestionTime ?? cookTime),
				revealedAt: now,
				status: "voting",
			},
		});
		return created;
	}

	let targets: Array<{
		date: Date;
		mealType: MealType;
		mealSubType: MealSubType;
	}> = [];

	if (suggestionType === "morning_10am") {
		targets = [
			{ date: today, mealType: "evening", mealSubType: "dinner" },
			{ date: tomorrow, mealType: "morning", mealSubType: "breakfast" },
			{ date: tomorrow, mealType: "evening", mealSubType: "dinner" },
		];
	} else {
		// evening_930pm: gap-fill undecided for tomorrow
		const tomorrowBreakfast = await prisma.mealCycle.findFirst({
			where: {
				householdId,
				date: tomorrow,
				mealType: "morning",
				mealSubType: "breakfast",
			},
		});
		const tomorrowDinner = await prisma.mealCycle.findFirst({
			where: {
				householdId,
				date: tomorrow,
				mealType: "evening",
				mealSubType: "dinner",
			},
		});
		if (!tomorrowBreakfast || tomorrowBreakfast.status === "pending") {
			targets.push({
				date: tomorrow,
				mealType: "morning",
				mealSubType: "breakfast",
			});
		}
		if (!tomorrowDinner || tomorrowDinner.status === "pending") {
			targets.push({
				date: tomorrow,
				mealType: "evening",
				mealSubType: "dinner",
			});
		}
	}

	const cycles: MealCycle[] = [];
	for (const target of targets) {
		const cycle = await findOrCreateCycle(
			target.date,
			target.mealType,
			target.mealSubType,
		);
		cycles.push(cycle);
		await generateCombosForCycle(prisma, cycle.id);
	}

	// Create or update MealWindow linking the revealed cycles
	if (cycles.length > 0) {
		await prisma.$transaction(async (tx) => {
			const window = await tx.mealWindow.create({
				data: {
					householdId,
					revealedAt: now,
					suggestionType: suggestionType as SuggestionType,
					status: "active",
				},
			});
			await tx.mealWindowItem.createMany({
				data: cycles.map((c, i) => ({
					mealWindowId: window.id,
					mealCycleId: c.id,
					displayOrder: i + 1,
				})),
			});
		});
	}

	return cycles;
}
