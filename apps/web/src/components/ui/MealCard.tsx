"use client";

import { ComboOption } from "./ComboOption";
import { Countdown } from "./Countdown";
import type { MealCycleDTO } from "@/lib/types";

/* ────────── Labels ────────── */

function mealLabel(m: MealCycleDTO) {
	if (m.mealSubType === "breakfast") return "Breakfast";
	if (m.mealSubType === "dinner") return "Evening Dinner";

	const type =
		m.mealSubType === "lunch"
			? "Lunch"
			: m.mealSubType === "any"
				? "Meal"
				: "Meal";
	return `${m.mealType === "morning" ? "Morning" : "Evening"} ${type}`;
}

function whenLabel(m: MealCycleDTO) {
	const today = new Date().toISOString().slice(0, 10);
	const day =
		m.date === today ? "Today" : m.date < today ? "Yesterday" : "Tomorrow";
	const time = m.mealType === "morning" ? "Morning" : "Evening";
	return `${day} · ${time}`;
}

/* ────────── Props ────────── */

interface MealCardProps {
	meal: MealCycleDTO;
	className?: string;
	onVote?: (comboId: string) => void;
}

/* ────────── Active ────────── */

function ActiveCard({ meal, onVote }: MealCardProps) {
	return (
		<div className="meal-card meal-card-active">
			<div className="meal-top">
				<div>
					<div className="meal-eyebrow meal-eyebrow-active">
						{whenLabel(meal)}
					</div>
					<div className="meal-title">{mealLabel(meal)}</div>
				</div>
				{meal.closesInSec != null && <Countdown seconds={meal.closesInSec} />}
			</div>

			<div className="combos-grid">
				{meal.combos.map((c) => (
					<ComboOption
						key={c.id}
						letter={c.displayOrder === 1 ? "A" : "B"}
						items={c.items.map((i) => ({
							emoji: i.emoji,
							name: i.dishName,
							diet: i.isVegetarian ? "veg" : "nonveg",
						}))}
						vegVariant={c.vegVariant ? { name: c.vegVariant.dishName } : null}
						voteCount={c.voteCount}
						onVote={() => onVote?.(c.id)}
					/>
				))}
			</div>
		</div>
	);
}

/* ────────── Locked ────────── */

function LockedCard({ meal }: MealCardProps) {
	const firstComboDishes =
		meal.combos[0]?.items.map((i) => i.dishName).join(" · ") ||
		"Meals revealed soon";

	return (
		<div className="meal-card meal-card-locked">
			<div className="lockrow">
				<div>
					<div className="meal-eyebrow meal-eyebrow-locked">
						{whenLabel(meal)}
					</div>
					<div className="meal-title">{mealLabel(meal)}</div>
				</div>
				<span className="lockbadge">🔒 Locked</span>
			</div>

			<div className="px-4 pb-3">
				<div className="preview-label">Preview</div>
				<div className="text-[13px] text-muted leading-[1.45]">
					{firstComboDishes}
				</div>
			</div>

			{meal.opensInSec != null && (
				<div className="lockedbtn">
					<Countdown seconds={meal.opensInSec} />
				</div>
			)}
		</div>
	);
}

/* ────────── Decided ────────── */

function DecidedCard({ meal }: MealCardProps) {
	const winner = meal.combos.find((c) => c.id === meal.winningComboId);

	return (
		<div className="meal-card meal-card-decided">
			<div className="decrow">
				<div>
					<div className="meal-eyebrow meal-eyebrow-decided">
						{whenLabel(meal)}
					</div>
					<div className="meal-title meal-title-decided">{mealLabel(meal)}</div>
				</div>
				<span className="donebadge">✅ Done</span>
			</div>

			{winner && (
				<div className="px-4 pb-4">
					<div className="result-label">
						The household chose Combo {winner.displayOrder === 1 ? "A" : "B"}
					</div>
					<div className="flex flex-wrap gap-1.5">
						{winner.items.map((item, i) => (
							<span className="chip" key={i}>
								{item.emoji} {item.dishName}
							</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

/* ────────── Router ────────── */

export function MealCard(props: MealCardProps) {
	if (props.meal.state === "active") return <ActiveCard {...props} />;
	if (props.meal.state === "locked") return <LockedCard {...props} />;
	return <DecidedCard {...props} />;
}
