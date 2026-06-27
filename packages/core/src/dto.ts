import type { PrismaClient, MealCycle } from "@kya-khana/db";
import type {
	MealCycleDTO,
	ComboDTO,
	ComboItemDTO,
	VegVariantDTO,
	DashboardFeedDTO,
	MealSubType,
} from "@kya-khana/types";

export async function buildMealCycleDTO(
	prisma: PrismaClient,
	cycle: MealCycle & {
		mealCombos: Array<{
			id: string;
			displayOrder: number;
			items: Array<{
				mealComponentId: string;
				dishId: string;
				dish: {
					id: string;
					name: string;
					isVegetarian: boolean;
				};
				mealComponent: {
					id: string;
					name: string;
				};
			}>;
			votes: Array<{ id: string }>;
		}>;
		winningCombo?: { id: string } | null;
		votes?: Array<{ mealComboId: string }>;
	},
	_viewerUserId?: string,
): Promise<MealCycleDTO> {
	const now = new Date();
	const deadline = cycle.orderingDeadline
		? new Date(
				cycle.date.getFullYear(),
				cycle.date.getMonth(),
				cycle.date.getDate(),
				cycle.orderingDeadline.getUTCHours(),
				cycle.orderingDeadline.getUTCMinutes(),
			)
		: null;

	let state: "active" | "locked" | "decided" = "locked";
	if (cycle.status === "decided" || cycle.status === "cooked") {
		state = "decided";
	} else if (cycle.status === "voting") {
		state = deadline && now < deadline ? "active" : "active"; // past deadline still active until explicitly closed
	}

	let closesInSec: number | undefined;
	let opensInSec: number | undefined;
	if (state === "active" && deadline) {
		closesInSec = Math.max(
			0,
			Math.floor((deadline.getTime() - now.getTime()) / 1000),
		);
	}
	if (state === "locked") {
		opensInSec = 0; // placeholder
	}

	// Build ComboDTOs
	const comboDTOs: ComboDTO[] = [];
	for (const combo of cycle.mealCombos) {
		const isNonVeg = combo.items.some((item) => !item.dish.isVegetarian);
		const diet: "veg" | "nonveg" = isNonVeg ? "nonveg" : "veg";

		const items: ComboItemDTO[] = combo.items.map((item) => ({
			componentId: item.mealComponentId,
			componentName: item.mealComponent.name,
			dishId: item.dishId,
			dishName: item.dish.name,
			isVegetarian: item.dish.isVegetarian,
		}));

		let vegVariant: VegVariantDTO | null = null;
		if (diet === "nonveg" && cycle.mealSubType !== "breakfast") {
			// Find the non-veg component and look up a veg alternative
			const nonVegItem = combo.items.find((item) => !item.dish.isVegetarian);
			if (nonVegItem) {
				// Load component's dish pool to find a veg alternative
				const component = await prisma.mealComponent.findUnique({
					where: { id: nonVegItem.mealComponentId },
					include: { dishes: true },
				});
				if (component) {
					const alt = component.dishes.find(
						(d) =>
							d.isVegetarian &&
							d.id !== nonVegItem.dishId &&
							(d.mealSubType === "any" || d.mealSubType === cycle.mealSubType),
					);
					if (alt) {
						vegVariant = { dishId: alt.id, dishName: alt.name };
					}
				}
			}
		}

		comboDTOs.push({
			id: combo.id,
			displayOrder: combo.displayOrder,
			diet,
			items,
			vegVariant,
			voteCount: combo.votes.length,
		});
	}

	comboDTOs.sort((a, b) => a.displayOrder - b.displayOrder);

	return {
		id: cycle.id,
		date: cycle.date.toISOString().slice(0, 10),
		mealType: cycle.mealType as "morning" | "evening",
		mealSubType: cycle.mealSubType as MealSubType,
		state,
		cookTime: cycle.cookTime
			? cycle.cookTime.toISOString().slice(11, 16)
			: null,
		orderingDeadline: cycle.orderingDeadline
			? cycle.orderingDeadline.toISOString().slice(11, 16)
			: null,
		suggestionTime: cycle.suggestionTime
			? cycle.suggestionTime.toISOString().slice(11, 16)
			: null,
		closesInSec,
		opensInSec,
		combos: comboDTOs,
		winningComboId: cycle.winningComboId ?? null,
		decidedBy: cycle.decidedBy ?? null,
	};
}

export async function buildDashboardFeed(
	prisma: PrismaClient,
	householdId: string,
	_viewerUserId?: string,
): Promise<DashboardFeedDTO> {
	const now = new Date();
	const start = new Date(now);
	start.setDate(start.getDate() - 7);
	const end = new Date(now);
	end.setDate(end.getDate() + 3);

	const cycles = await prisma.mealCycle.findMany({
		where: {
			householdId,
			date: { gte: start, lte: end },
		},
		orderBy: [{ date: "asc" }, { mealType: "asc" }],
		include: {
			mealCombos: {
				orderBy: { displayOrder: "asc" },
				include: {
					items: {
						include: {
							dish: { select: { id: true, name: true, isVegetarian: true } },
							mealComponent: { select: { id: true, name: true } },
						},
					},
					votes: { select: { id: true } },
				},
			},
			winningCombo: { select: { id: true } },
			votes: { select: { mealComboId: true } },
		},
	});

	const meals: MealCycleDTO[] = [];
	for (const cycle of cycles) {
		meals.push(await buildMealCycleDTO(prisma, cycle, _viewerUserId));
	}

	return { meals };
}
