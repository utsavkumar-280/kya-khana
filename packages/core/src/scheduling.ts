import type { PrismaClient } from "@kya-khana/db";
import { revealMealsForWindow } from "./suggestions.js";
import { closeVoting } from "./voting.js";
import { sendToHousehold } from "./push.js";

let cronModule: any = null;
try {
	cronModule = await import("node-cron");
} catch {
	cronModule = null;
}

const jobs: Array<{ stop: () => void }> = [];

export function startSchedulers(prisma: PrismaClient, _app?: any): void {
	const cron = cronModule;
	if (!cron) {
		console.warn("node-cron not available; schedulers not started");
		return;
	}

	// v1: single household default
	const householdId = "household_default";

	// 10:00 AM daily
	const j1 = cron.schedule("0 10 * * *", async () => {
		try {
			await revealMealsForWindow(prisma, householdId, "morning_10am");
			console.log("[cron] Revealed morning window");
		} catch (e: any) {
			console.error("[cron] Morning reveal failed:", e.message);
		}
	});
	jobs.push(j1);

	// 21:30 (9:30 PM) daily
	const j2 = cron.schedule("30 21 * * *", async () => {
		try {
			await revealMealsForWindow(prisma, householdId, "evening_930pm");
			console.log("[cron] Revealed evening window");
		} catch (e: any) {
			console.error("[cron] Evening reveal failed:", e.message);
		}
	});
	jobs.push(j2);

	// Deadline-close every minute
	const j3 = cron.schedule("* * * * *", async () => {
		try {
			const now = new Date();
			const allVoting = await prisma.mealCycle.findMany({
				where: { status: "voting" },
			});
			const overdue = allVoting.filter((cycle) => {
				if (!cycle.orderingDeadline) return false;
				const deadline = new Date(
					Date.UTC(
						cycle.date.getUTCFullYear(),
						cycle.date.getUTCMonth(),
						cycle.date.getUTCDate(),
						cycle.orderingDeadline.getUTCHours(),
						cycle.orderingDeadline.getUTCMinutes(),
					),
				);
				return now >= deadline;
			});
			for (const cycle of overdue) {
				try {
					await closeVoting(prisma, cycle.id);
					console.log(`[cron] Auto-closed voting for cycle ${cycle.id}`);
				} catch (e: any) {
					console.error(
						`[cron] Close voting failed for ${cycle.id}:`,
						e.message,
					);
				}
			}
		} catch (e: any) {
			console.error("[cron] Deadline poll failed:", e.message);
		}
	});
	jobs.push(j3);

	// Notification escalation every minute
	const j4 = cron.schedule("* * * * *", async () => {
		try {
			await evaluateEscalation(prisma, householdId);
		} catch (e: any) {
			console.error("[cron] Escalation failed:", e.message);
		}
	});
	jobs.push(j4);

	console.log("[scheduling] Cron jobs registered");
}

export function stopSchedulers(): void {
	for (const job of jobs) {
		job.stop();
	}
	jobs.length = 0;
}

const ESCALATION_TIERS = [
	{ delayMin: 60, label: "1st" },
	{ delayMin: 90, label: "2nd" },
	{ delayMin: 105, label: "3rd" },
	{ delayMin: 120, label: "final" },
];

export async function evaluateEscalation(
	prisma: PrismaClient,
	householdId: string,
): Promise<string | null> {
	const windows = await prisma.mealWindow.findMany({
		where: { householdId, status: "active" },
		include: {
			items: {
				include: {
					mealCycle: {
						include: { votes: true },
					},
				},
			},
		},
	});

	const now = new Date();
	for (const win of windows) {
		// Stop escalation if any vote exists on any cycle in the window
		const hasVote = win.items.some((item) => item.mealCycle.votes.length > 0);
		if (hasVote) continue;

		const elapsedMin = Math.floor(
			(now.getTime() - win.revealedAt.getTime()) / 60000,
		);

		for (const tier of ESCALATION_TIERS) {
			if (elapsedMin >= tier.delayMin && elapsedMin < tier.delayMin + 1) {
				console.log(`[escalation] ${tier.label} push for window ${win.id}`);
				await sendToHousehold(prisma, householdId, {
					title: "Time to vote!",
					body: `${win.items.length} meals need your pick`,
				});
				return tier.label;
			}
		}
	}
	return null;
}
