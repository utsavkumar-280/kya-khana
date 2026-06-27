"use client";

import { useRouter } from "next/navigation";
import { useMe } from "@/lib/hooks";
import {
	ChefHat,
	Bell,
	Utensils,
	Clock,
	User,
	LogOut,
	ChevronRight,
} from "lucide-react";

interface MoreScreenProps {
	onLogout: () => void;
}

export function MoreScreen({ onLogout }: MoreScreenProps) {
	const router = useRouter();
	const { data: profile, isLoading } = useMe();

	const initials = profile?.name
		? profile.name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2)
		: "?";

	const cookTimesSubtitle = profile?.household
		? `Morning: ${profile.household.morningCookTime ?? "8:00 AM"} · Evening: ${profile.household.eveningCookTime ?? "7:30 PM"}`
		: "Morning: 8:00 AM · Evening: 7:30 PM";

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="more-scroll no-scrollbar">
			{/* Profile card */}
			<div className="profile-card">
				<div className="profile-avatar">{initials}</div>
				<div className="flex-1 min-w-0">
					<div className="profile-name">{profile?.name ?? "User"}</div>
					<div className="profile-meta">{profile?.email}</div>
				</div>
				<span className="rolebadge">{profile?.role}</span>
			</div>

			{/* Cook View */}
			<button className="menuitem" onClick={() => router.push("/cook")}>
				<ChefHat className="menuitem-icon" size={22} />
				<div className="menuitem-body">
					<div className="menuitem-title">Cook View</div>
				</div>
				<ChevronRight className="menuitem-chevron" size={18} />
			</button>

			{/* Notifications */}
			<button className="menuitem">
				<Bell className="menuitem-icon" size={22} />
				<div className="menuitem-body">
					<div className="menuitem-title">Notifications</div>
					<div className="menuitem-subtitle">
						Vote reminders, food ready alerts
					</div>
				</div>
				<ChevronRight className="menuitem-chevron" size={18} />
				<span className="menuitem-badge">2</span>
			</button>

			{/* Meal Templates */}
			<button className="menuitem">
				<Utensils className="menuitem-icon" size={22} />
				<div className="menuitem-body">
					<div className="menuitem-title">Meal Templates</div>
					<div className="menuitem-subtitle">Edit breakfast, lunch, dinner</div>
				</div>
				<ChevronRight className="menuitem-chevron" size={18} />
			</button>

			{/* Cook Times */}
			<button className="menuitem">
				<Clock className="menuitem-icon" size={22} />
				<div className="menuitem-body">
					<div className="menuitem-title">Cook Times</div>
					<div className="menuitem-subtitle">{cookTimesSubtitle}</div>
				</div>
				<ChevronRight className="menuitem-chevron" size={18} />
			</button>

			{/* Profile */}
			<button className="menuitem">
				<User className="menuitem-icon" size={22} />
				<div className="menuitem-body">
					<div className="menuitem-title">Profile</div>
					<div className="menuitem-subtitle">Your account</div>
				</div>
				<ChevronRight className="menuitem-chevron" size={18} />
			</button>

			{/* Logout */}
			<button className="menuitem logout-btn" onClick={onLogout}>
				<LogOut className="menuitem-icon" size={22} />
				<div className="menuitem-body">
					<div className="menuitem-title">Logout</div>
				</div>
			</button>
		</div>
	);
}
