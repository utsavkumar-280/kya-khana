"use client";

import { useEffect, useRef } from "react";
import { useMealsFeed, useVote } from "@/lib/hooks";
import { MealCard } from "@/components/ui/MealCard";

export function DashboardScreen() {
	const { data, isLoading, error } = useMealsFeed();
	const voteMutation = useVote();
	const feedRef = useRef<HTMLDivElement>(null);

	// Scroll to first active meal on load
	useEffect(() => {
		if (!data?.meals?.length) return;
		const firstActive = data.meals.find((m) => m.state === "active");
		if (firstActive) {
			const el = feedRef.current?.querySelector(
				`[data-meal-id="${firstActive.id}"]`,
			);
			el?.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, [data]);

	if (isLoading) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<p className="text-muted">Loading meals...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<p className="text-nonveg">Failed to load meals</p>
			</div>
		);
	}

	const meals = data?.meals ?? [];

	if (meals.length === 0) {
		return (
			<div className="flex-1 flex flex-col items-center justify-center px-4 gap-3">
				<span className="text-4xl">🍽️</span>
				<p className="text-sm text-muted text-center max-w-[260px]">
					No meals yet. Meals will appear here when the next suggestion window
					opens.
				</p>
			</div>
		);
	}

	return (
		<div
			ref={feedRef}
			className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col gap-4 px-4 pt-1.5 pb-[72px]"
			style={{ scrollSnapType: "y proximity", scrollBehavior: "smooth" }}
		>
			<p
				style={{
					textAlign: "center",
					fontSize: "11.5px",
					color: "#B6ABA0",
					fontWeight: 500,
					padding: "2px 0 4px",
				}}
			>
				↑ Scroll up for upcoming meals · down for history ↓
			</p>

			{meals.map((meal) => (
				<div
					key={meal.id}
					data-meal-id={meal.id}
					style={{ scrollSnapAlign: "start", scrollMarginTop: 6 }}
				>
					<MealCard
						meal={meal}
						onVote={(comboId) =>
							voteMutation.mutate({
								mealCycleId: meal.id,
								mealComboId: comboId,
							})
						}
					/>
				</div>
			))}
		</div>
	);
}
