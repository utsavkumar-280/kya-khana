"use client";

interface CountdownProps {
	seconds: number;
}

export function Countdown({ seconds }: CountdownProps) {
	if (seconds <= 0) return null;

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const label = hours > 0 ? `${hours}h ${minutes}m left` : `${minutes}m left`;

	return (
		<span className="timer-pill">
			<span className="timer-dot" />
			{label}
		</span>
	);
}
