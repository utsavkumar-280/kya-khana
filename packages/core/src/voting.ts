import type { PrismaClient, MealCycle, Vote } from "@kya-khana/db";
import { HttpError } from "./auth.js";

export async function castVote(
	prisma: PrismaClient,
	userId: string,
	mealCycleId: string,
	mealComboId: string,
): Promise<Vote> {
	const cycle = await prisma.mealCycle.findUnique({
		where: { id: mealCycleId },
		include: { mealCombos: { select: { id: true } } },
	});
	if (!cycle) throw new HttpError(404, "MealCycle not found");
	if (cycle.status !== "voting")
		throw new HttpError(400, "Voting is not open for this meal cycle");
	const now = new Date();
	// orderingDeadline is stored as 1970-01-01T<time>Z — pure UTC time offset.
	// Build deadline in UTC from cycle.date (UTC midnight) + deadline time.
	const deadline = cycle.orderingDeadline
		? new Date(
				Date.UTC(
					cycle.date.getUTCFullYear(),
					cycle.date.getUTCMonth(),
					cycle.date.getUTCDate(),
					cycle.orderingDeadline.getUTCHours(),
					cycle.orderingDeadline.getUTCMinutes(),
				),
			)
		: null;
	if (deadline && now >= deadline) throw new HttpError(410, "Voting closed");
	const comboExists = cycle.mealCombos.some((c) => c.id === mealComboId);
	if (!comboExists)
		throw new HttpError(400, "Combo does not belong to this cycle");

	return await prisma.vote.upsert({
		where: { mealCycleId_userId: { mealCycleId, userId } },
		create: { mealCycleId, userId, mealComboId },
		update: { mealComboId },
	});
}

export async function closeVoting(
	prisma: PrismaClient,
	mealCycleId: string,
): Promise<MealCycle> {
	const cycleRaw = await prisma.mealCycle.findUnique({
		where: { id: mealCycleId },
		include: {
			mealCombos: {
				include: {
					items: {
						include: {
							dish: {
								include: { ingredients: true },
							},
						},
					},
				},
			},
			votes: true,
		},
	});
	if (!cycleRaw) throw new HttpError(404, "MealCycle not found");
	const cycle = cycleRaw;
	if (cycle.status !== "voting") {
		return cycle;
	}
	const now = new Date();
	// orderingDeadline is stored as 1970-01-01T<time>Z — pure UTC time offset.
	// Build deadline in UTC from cycle.date (UTC midnight) + deadline time.
	const deadline = cycle.orderingDeadline
		? new Date(
				Date.UTC(
					cycle.date.getUTCFullYear(),
					cycle.date.getUTCMonth(),
					cycle.date.getUTCDate(),
					cycle.orderingDeadline.getUTCHours(),
					cycle.orderingDeadline.getUTCMinutes(),
				),
			)
		: null;
	if (deadline && now < deadline)
		throw new HttpError(400, "Voting deadline has not passed yet");

	// Tally votes per combo
	const voteCounts = new Map<string, number>();
	for (const combo of cycle.mealCombos) {
		voteCounts.set(combo.id, 0);
	}
	for (const vote of cycle.votes) {
		voteCounts.set(
			vote.mealComboId,
			(voteCounts.get(vote.mealComboId) ?? 0) + 1,
		);
	}

	let maxVotes = -1;
	let winners: string[] = [];
	for (const [comboId, count] of voteCounts.entries()) {
		if (count > maxVotes) {
			maxVotes = count;
			winners = [comboId];
		} else if (count === maxVotes) {
			winners.push(comboId);
		}
	}

	// Load inventory for scoring
	const inventoryItems = await prisma.inventoryItem.findMany({
		where: { householdId: cycle.householdId },
	});
	const inventoryMap = new Map<string, number>();
	for (const inv of inventoryItems)
		inventoryMap.set(inv.ingredientId, inv.quantity);

	function comboInventoryScore(comboId: string): number {
		const combo = cycle.mealCombos.find(
			(c: { id: string }) => c.id === comboId,
		);
		if (!combo) return -1;
		let score = 0;
		for (const item of combo.items) {
			for (const di of item.dish.ingredients) {
				const have = inventoryMap.get(di.ingredientId) ?? 0;
				score += Math.min(1, have / di.quantity);
			}
		}
		return score;
	}

	let winningComboId: string | null = null;
	let decidedBy: "votes" | "tie_break" | "default" | null = null;

	if (winners.length === 1 && maxVotes > 0) {
		winningComboId = winners[0];
		decidedBy = "votes";
	} else {
		// Tie or zero votes: break by inventory score
		let bestScore = -1;
		let bestCombos: string[] = [];
		for (const comboId of winners) {
			const score = comboInventoryScore(comboId);
			if (score > bestScore) {
				bestScore = score;
				bestCombos = [comboId];
			} else if (score === bestScore) {
				bestCombos.push(comboId);
			}
		}
		if (bestCombos.length === 1) {
			winningComboId = bestCombos[0];
			decidedBy = maxVotes === 0 ? "default" : "tie_break";
		}
		// If still tied, leave winningComboId null (manual break needed)
	}

	if (winningComboId) {
		return await prisma.mealCycle.update({
			where: { id: mealCycleId },
			data: {
				status: "decided",
				winningComboId,
				decidedBy,
			},
		});
	}

	return cycle;
}

export async function breakTie(
	prisma: PrismaClient,
	mealCycleId: string,
	mealComboId: string,
): Promise<MealCycle> {
	const cycle = await prisma.mealCycle.findUnique({
		where: { id: mealCycleId },
		include: { mealCombos: { select: { id: true } } },
	});
	if (!cycle) throw new HttpError(404, "MealCycle not found");
	const comboExists = cycle.mealCombos.some((c) => c.id === mealComboId);
	if (!comboExists)
		throw new HttpError(400, "Combo does not belong to this cycle");

	return await prisma.mealCycle.update({
		where: { id: mealCycleId },
		data: {
			status: "decided",
			winningComboId: mealComboId,
			decidedBy: "tie_break",
		},
	});
}
