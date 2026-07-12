"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMealsFeed, useCookView, useMarkCooked } from "@/lib/hooks";
import { AppHeader } from "@/components/ui/AppHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MealCycleDTO } from "@/lib/types";

// ponytail: label helpers (same as MealCard)
function mealLabel(m: MealCycleDTO) {
	const type =
		m.mealSubType === "breakfast"
			? "Breakfast"
			: m.mealSubType === "lunch"
				? "Lunch"
				: m.mealSubType === "dinner"
					? "Dinner"
					: "Meal";
	return `${m.mealType === "morning" ? "Morning" : "Evening"} ${type}`;
}

export default function CookPage() {
	const router = useRouter();
	const { data, isLoading } = useMealsFeed();
	const [selectedCycleId, setSelectedCycleId] = useState("");
	const { data: cookView, isLoading: cookLoading } =
		useCookView(selectedCycleId);
	const markMutation = useMarkCooked();

	const decidedMeals =
		data?.meals?.filter((m) => m.state === "decided" && m.winningComboId) ?? [];

	const handleMarkCooked = async () => {
		if (!selectedCycleId) return;
		// Step 1: get proposal
		const proposal = await markMutation.mutateAsync({
			mealCycleId: selectedCycleId,
		});
		if (Array.isArray(proposal) && proposal.length > 0) {
			// Step 2: accept proposed deductions
			await markMutation.mutateAsync({
				mealCycleId: selectedCycleId,
				adjustments: proposal.map((p) => ({
					ingredientId: p.ingredientId,
					deductQty: p.proposedDeduction,
				})),
			});
		}
		alert("Marked as cooked!");
	};

	return (
		<main className="app-shell flex flex-col h-dvh bg-bg">
			<AppHeader dateLabel="Cook" onDateClick={undefined} />

			<div className="app-scroll flex-1 overflow-y-auto px-4 pb-6 pt-2 flex flex-col gap-4">
				{/* Back button */}
				<button
					type="button"
					onClick={() => router.push("/?tab=more")}
					className="self-start text-sm text-text-muted font-medium active:text-text"
				>
					← More
				</button>

				<h2 className="font-display font-extrabold text-lg text-text">
					👨‍🍳 Cook View
				</h2>

				{isLoading && (
					<p className="text-text-muted text-sm">Loading meals...</p>
				)}

				{!isLoading && decidedMeals.length === 0 && (
					<div className="flex flex-col items-center gap-2 py-8">
						<span className="text-3xl">🍳</span>
						<p className="text-text-muted text-sm text-center">
							No decided meals yet. Once voting ends, the winning dish appears
							here.
						</p>
					</div>
				)}

				{/* Meal selector */}
				{decidedMeals.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{decidedMeals.map((m) => (
							<button
								key={m.id}
								type="button"
								onClick={() => setSelectedCycleId(m.id)}
								className={cn(
									"px-4 py-2 rounded-full text-sm font-semibold border transition-colors",
									selectedCycleId === m.id
										? "bg-primary text-white border-primary"
										: "bg-surface border-border text-text hover:bg-primary-soft",
								)}
							>
								{mealLabel(m)} ({m.date})
							</button>
						))}
					</div>
				)}

				{/* Cook details */}
				{cookLoading && selectedCycleId && (
					<p className="text-text-muted text-sm">Loading recipe...</p>
				)}

				{cookView && (
					<div className="space-y-4">
						{/* Winning combo */}
						<div className="cook-card">
							<h3 className="cook-section-title">Winning Dish</h3>
							<ul className="space-y-2 text-sm">
								{cookView.winningCombo.items.map((item) => (
									<li key={item.dishId} className="flex items-center gap-2">
										<span>{item.emoji || "🍽️"}</span>
										<span className="font-semibold text-text">
											{item.dishName}
										</span>
										{!item.isVegetarian && (
											<span className="text-[10px] bg-nonveg-bg text-nonveg rounded-full px-1.5 py-0.5 font-bold">
												Non-veg
											</span>
										)}
									</li>
								))}
							</ul>
							{cookView.winningCombo.vegVariant && (
								<p className="text-xs text-veg bg-veg-bg rounded-lg px-3 py-2 mt-3">
									🌿 Veg alternative:{" "}
									{cookView.winningCombo.vegVariant.dishName}
								</p>
							)}
						</div>

						{/* Recipe steps */}
						{cookView.recipeSteps.length > 0 && (
							<div className="cook-card">
								<h3 className="cook-section-title">Recipe Steps</h3>
								<ol className="space-y-2 text-sm text-text list-decimal list-inside">
									{cookView.recipeSteps.map((step, i) => (
										<li key={i} className="pl-1">
											{step}
										</li>
									))}
								</ol>
							</div>
						)}

						{/* Video references */}
						{cookView.videoReferences.length > 0 && (
							<div className="cook-card">
								<h3 className="cook-section-title">Video References</h3>
								<div className="space-y-1">
									{cookView.videoReferences.map((url, i) => (
										<button
											key={i}
											type="button"
											onClick={() =>
												window.open(url, "_blank", "noopener,noreferrer")
											}
											className="block min-h-11 text-left text-xs text-primary underline break-all"
										>
											{url}
										</button>
									))}
								</div>
							</div>
						)}

						{/* Meta */}
						<div className="flex gap-3 text-xs text-text-muted">
							<span>⏱️ Prep: {cookView.prepTimeMin} min</span>
							<span>
								{cookView.allIngredientsAvailable
									? "✅ All ingredients in stock"
									: "⚠️ Some ingredients missing"}
							</span>
						</div>

						{/* Mark cooked */}
						<Button
							onClick={handleMarkCooked}
							disabled={markMutation.isPending}
							className="w-full rounded-xl font-semibold"
						>
							{markMutation.isPending ? "Marking..." : "✅ Mark as Cooked"}
						</Button>
					</div>
				)}
			</div>
		</main>
	);
}
