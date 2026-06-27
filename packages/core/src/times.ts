/**
 * Derive orderingDeadline (cookTime - 2h) and suggestionTime (cookTime + 2h).
 * Wraps modulo 24h; day-wrap noted in caller if needed.
 */
export function deriveMealTimes(cookTime: string): {
	cookTime: string;
	orderingDeadline: string;
	suggestionTime: string;
} {
	const [hStr, mStr] = cookTime.split(":");
	const h = parseInt(hStr, 10);
	const m = parseInt(mStr, 10);
	const totalMinutes = h * 60 + m;

	const sub = (mins: number) => {
		const raw = (totalMinutes - mins) % (24 * 60);
		const wrapped = raw < 0 ? raw + 24 * 60 : raw;
		const hh = String(Math.floor(wrapped / 60)).padStart(2, "0");
		const mm = String(wrapped % 60).padStart(2, "0");
		return `${hh}:${mm}`;
	};

	const add = (mins: number) => {
		const wrapped = (totalMinutes + mins) % (24 * 60);
		const hh = String(Math.floor(wrapped / 60)).padStart(2, "0");
		const mm = String(wrapped % 60).padStart(2, "0");
		return `${hh}:${mm}`;
	};

	return {
		cookTime,
		orderingDeadline: sub(120),
		suggestionTime: add(120),
	};
}

if (import.meta.url === `file://${process.argv[1]}`) {
	const r = deriveMealTimes("08:00");
	if (r.orderingDeadline !== "06:00")
		throw new Error("Expected orderingDeadline 06:00");
	if (r.suggestionTime !== "10:00")
		throw new Error("Expected suggestionTime 10:00");
	console.log("times self-check passed");
}
