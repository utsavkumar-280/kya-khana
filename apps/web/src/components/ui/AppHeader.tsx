"use client";
import { Calendar, ChevronDown } from "lucide-react";

export function AppHeader({
	dateLabel = "Today",
	onDateClick,
}: {
	dateLabel?: string;
	onDateClick?: () => void;
}) {
	return (
		<header className="appheader">
			<span className="wordmark">
				kya<span className="wordmark-dash">-</span>khana
			</span>
			<button className="datebtn" onClick={onDateClick}>
				<Calendar size={17} color="#E65100" />
				{dateLabel}
				<ChevronDown className="datebtn-chev" size={16} color="#B6ABA0" />
			</button>
		</header>
	);
}
