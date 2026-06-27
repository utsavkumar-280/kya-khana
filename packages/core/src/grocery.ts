import type { PrismaClient, MealCycleStatus } from "@kya-khana/db";
import type {
	GroceryListItemDTO,
	DeductionProposalDTO,
} from "@kya-khana/types";

export async function computeGroceryShortfall(
	prisma: PrismaClient,
	householdId: string,
	mealCycleIds?: string[],
): Promise<GroceryListItemDTO[]> {
	const where = mealCycleIds?.length
		? {
				id: { in: mealCycleIds },
				householdId,
				status: { in: ["decided", "cooked"] as MealCycleStatus[] },
			}
		: {
				householdId,
				status: { in: ["decided", "cooked"] as MealCycleStatus[] },
			};

	const cycles = await prisma.mealCycle.findMany({
		where,
		include: {
			winningCombo: {
				include: {
					items: {
						include: {
							dish: {
								include: {
									ingredients: {
										include: { ingredient: true },
									},
								},
							},
						},
					},
				},
			},
		},
	});

	const requiredMap = new Map<
		string,
		{ name: string; quantity: number; unit: string }
	>();

	for (const cycle of cycles) {
		const combo = cycle.winningCombo;
		if (!combo) continue;
		for (const item of combo.items) {
			for (const di of item.dish.ingredients) {
				const existing = requiredMap.get(di.ingredientId);
				if (existing) {
					existing.quantity += di.quantity;
				} else {
					requiredMap.set(di.ingredientId, {
						name: di.ingredient.name,
						quantity: di.quantity,
						unit: di.unit,
					});
				}
			}
		}
	}

	const inventoryItems = await prisma.inventoryItem.findMany({
		where: { householdId },
		include: { ingredient: true },
	});
	const inventoryMap = new Map<string, number>();
	for (const inv of inventoryItems)
		inventoryMap.set(inv.ingredientId, inv.quantity);

	const result: GroceryListItemDTO[] = [];
	for (const [ingredientId, req] of requiredMap.entries()) {
		const have = inventoryMap.get(ingredientId) ?? 0;
		const shortfall = Math.max(0, req.quantity - have);
		result.push({
			ingredientId,
			name: req.name,
			need: req.quantity,
			have,
			unit: req.unit,
			shortfall,
		});
	}

	// Also include in-stock items that have zero shortfall so UI can show ✅
	for (const inv of inventoryItems) {
		if (!requiredMap.has(inv.ingredientId)) {
			result.push({
				ingredientId: inv.ingredientId,
				name: inv.ingredient.name,
				need: 0,
				have: inv.quantity,
				unit: inv.unit,
				shortfall: 0,
			});
		}
	}

	// Persist grocery list (find-or-create by household + latest meal window)
	const latestCycle = cycles.length
		? cycles.reduce((a, b) => (a.date > b.date ? a : b))
		: null;
	if (latestCycle) {
		const window = await prisma.mealWindow.findFirst({
			where: { householdId },
			orderBy: { revealedAt: "desc" },
		});
		if (window) {
			await prisma.groceryList.upsert({
				where: { id: `gl_${window.id}` },
				create: {
					id: `gl_${window.id}`,
					mealWindowId: window.id,
					householdId,
					status: "pending",
				},
				update: {},
			});
		}
	}

	return result.sort((a, b) => b.shortfall - a.shortfall);
}

export async function proposeDeduction(
	prisma: PrismaClient,
	mealCycleId: string,
): Promise<DeductionProposalDTO[]> {
	const cycle = await prisma.mealCycle.findUnique({
		where: { id: mealCycleId },
		include: {
			winningCombo: {
				include: {
					items: {
						include: {
							dish: {
								include: {
									ingredients: {
										include: { ingredient: true },
									},
								},
							},
						},
					},
				},
			},
		},
	});
	if (!cycle?.winningCombo) {
		throw new Error("MealCycle not found or no winning combo");
	}

	const inventoryItems = await prisma.inventoryItem.findMany({
		where: { householdId: cycle.householdId },
		include: { ingredient: true },
	});
	const inventoryMap = new Map<string, { quantity: number; unit: string }>();
	for (const inv of inventoryItems) {
		inventoryMap.set(inv.ingredientId, {
			quantity: inv.quantity,
			unit: inv.unit,
		});
	}

	const requiredMap = new Map<
		string,
		{ name: string; quantity: number; unit: string }
	>();
	const combo = cycle.winningCombo!;
	for (const item of combo.items) {
		for (const di of item.dish.ingredients) {
			const existing = requiredMap.get(di.ingredientId);
			if (existing) {
				existing.quantity += di.quantity;
			} else {
				requiredMap.set(di.ingredientId, {
					name: di.ingredient.name,
					quantity: di.quantity,
					unit: di.unit,
				});
			}
		}
	}

	const proposals: DeductionProposalDTO[] = [];
	for (const [ingredientId, req] of requiredMap.entries()) {
		const current = inventoryMap.get(ingredientId);
		proposals.push({
			ingredientId,
			name: req.name,
			proposedDeduction: req.quantity,
			currentQty: current?.quantity ?? 0,
			unit: req.unit,
		});
	}

	return proposals;
}

export async function applyDeduction(
	prisma: PrismaClient,
	mealCycleId: string,
	adjustments?: { ingredientId: string; deductQty: number }[],
): Promise<void> {
	const cycle = await prisma.mealCycle.findUnique({
		where: { id: mealCycleId },
		include: {
			winningCombo: {
				include: {
					items: {
						include: {
							dish: {
								include: {
									ingredients: {
										include: { ingredient: true },
									},
								},
							},
						},
					},
				},
			},
		},
	});
	if (!cycle?.winningCombo) {
		throw new Error("MealCycle not found or no winning combo");
	}

	const requiredMap = new Map<string, number>();
	const combo = cycle.winningCombo!;
	for (const item of combo.items) {
		for (const di of item.dish.ingredients) {
			requiredMap.set(
				di.ingredientId,
				(requiredMap.get(di.ingredientId) ?? 0) + di.quantity,
			);
		}
	}

	await prisma.$transaction(async (tx) => {
		for (const [ingredientId, reqQty] of requiredMap.entries()) {
			const adj = adjustments?.find((a) => a.ingredientId === ingredientId);
			const deductQty = adj?.deductQty ?? reqQty;
			if (deductQty <= 0) continue;

			const existing = await tx.inventoryItem.findUnique({
				where: {
					householdId_ingredientId: {
						householdId: cycle.householdId,
						ingredientId,
					},
				},
			});

			if (existing) {
				await tx.inventoryItem.update({
					where: { id: existing.id },
					data: { quantity: Math.max(0, existing.quantity - deductQty) },
				});
			} else {
				await tx.inventoryItem.create({
					data: {
						id: `inv_${cycle.householdId}_${ingredientId}`,
						householdId: cycle.householdId,
						ingredientId,
						quantity: 0,
						unit: "g", // v1 default
					},
				});
			}
		}

		await tx.mealCycle.update({
			where: { id: mealCycleId },
			data: { status: "cooked" },
		});
	});
}
