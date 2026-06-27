export function DietBadge({
	diet,
	size = "md",
}: {
	diet: "veg" | "nonveg";
	size?: "sm" | "md";
}) {
	return (
		<span
			className={`diet-pill ${diet === "veg" ? "diet-pill-veg" : "diet-pill-nonveg"}`}
		>
			{diet === "veg" ? "Veg" : "Non-Veg"}
		</span>
	);
}
