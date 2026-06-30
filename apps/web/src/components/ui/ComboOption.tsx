"use client";

interface ComboItem {
	emoji?: string;
	name: string;
	diet?: "veg" | "nonveg";
}

export interface ComboOptionProps {
	letter: "A" | "B";
	items: ComboItem[];
	vegVariant?: { name: string } | null;
	voteCount: number;
	isVoted?: boolean;
	onVote?: () => void;
	disabled?: boolean;
}

export function ComboOption({
	letter,
	items,
	vegVariant,
	voteCount,
	isVoted,
	onVote,
	disabled,
}: ComboOptionProps) {
	const hasNonVeg = items.some((i) => i.diet === "nonveg");
	const glyph = hasNonVeg ? "🍗" : "🟢";

	return (
		<div className={`combo-col ${isVoted ? "combo-col-selected" : ""}`}>
			<div className="combo-head">
				<span className={`combo-tag ${isVoted ? "combo-tag-selected" : ""}`}>
					COMBO {letter}
				</span>
				<span className="combo-votes">
					{glyph} {voteCount}
				</span>
			</div>

			<div className="dish-list">
				{items.map((item, i) => (
					<div className="dish-row" key={i}>
						<span className="dish-emoji">{item.emoji || "🍽️"}</span>
						<span className="flex-1 text-ink">{item.name}</span>
						{item.diet && (
							<span className={`diet-pill diet-pill-${item.diet}`}>
								{item.diet === "nonveg" ? "Non-Veg" : "Veg"}
							</span>
						)}
					</div>
				))}
			</div>

			{vegVariant && hasNonVeg && (
				<div className="vegnote">
					<span>🌿</span>
					<span>
						<b>Veg:</b> {vegVariant.name}
					</span>
				</div>
			)}

			{!disabled && (
				<button
					type="button"
					className={`votebtn ${isVoted ? "votebtn-selected" : ""}`}
					onClick={onVote}
				>
					{isVoted ? <>✅ Voted {letter}</> : <>Vote {letter}</>}
				</button>
			)}
		</div>
	);
}
