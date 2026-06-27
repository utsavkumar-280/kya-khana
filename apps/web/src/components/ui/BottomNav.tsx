"use client";
import { Home, PackageOpen, MoreHorizontal } from "lucide-react";

type TabId = "dashboard" | "inventory" | "more";

export function BottomNav({
	active,
	onChange,
}: {
	active: TabId;
	onChange: (tab: TabId) => void;
}) {
	const tabs = [
		{
			id: "inventory" as TabId,
			icon: <PackageOpen size={22} />,
			label: "Inventory",
		},
		{ id: "dashboard" as TabId, icon: <Home size={22} />, label: "Dashboard" },
		{ id: "more" as TabId, icon: <MoreHorizontal size={22} />, label: "More" },
	];

	return (
		<nav className="bottomnav">
			{tabs.map((tab) => {
				const isOn = active === tab.id;
				return (
					<button
						key={tab.id}
						className={`navbtn ${isOn ? "navbtn-on" : "navbtn-off"}`}
						onClick={() => onChange(tab.id)}
					>
						<span className="navbtn-ico">{tab.icon}</span>
						{tab.label}
					</button>
				);
			})}
		</nav>
	);
}
