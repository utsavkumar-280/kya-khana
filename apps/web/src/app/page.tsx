"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth";
import { api } from "@/lib/api";
import { useRevealDev } from "@/lib/hooks";
import { AppHeader } from "@/components/ui/AppHeader";
import { BottomNav } from "@/components/ui/BottomNav";
import { DashboardScreen } from "@/components/screens/DashboardScreen";
import { InventoryScreen } from "@/components/screens/InventoryScreen";
import { MoreScreen } from "@/components/screens/MoreScreen";

type TabId = "dashboard" | "inventory" | "more";

function HomePageInner() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const tabParam = searchParams.get("tab") as TabId | null;
	const [tab, setTab] = useState<TabId>(tabParam || "dashboard");
	const [loading, setLoading] = useState(true);
	const revealMutation = useRevealDev();

	useEffect(() => {
		let cancelled = false;
		async function checkAuth() {
			try {
				const data = await api.get<{ onboarded: boolean }>("/auth/me");
				if (!cancelled) {
					if (!data.onboarded) {
						router.push("/onboarding");
						return;
					}
					setLoading(false);
				}
			} catch {
				if (!cancelled) router.push("/login");
			}
		}
		checkAuth();
		return () => {
			cancelled = true;
		};
	}, [router]);

	useEffect(() => {
		if (tabParam) setTab(tabParam);
	}, [tabParam]);

	const changeTab = (t: TabId) => {
		setTab(t);
		router.replace(`/?tab=${t}`, { scroll: false });
	};

	const handleLogout = async () => {
		await api.post("/auth/logout");
		await authClient.signOut();
		router.push("/login");
	};

	if (loading) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-bg">
				<p className="text-text-muted">Loading...</p>
			</main>
		);
	}

	return (
		<main className="flex flex-col h-dvh max-w-[390px] mx-auto bg-bg relative">
			<AppHeader dateLabel="Today" />

			{tab === "dashboard" && <DashboardScreen />}
			{tab === "inventory" && <InventoryScreen />}
			{tab === "more" && <MoreScreen onLogout={handleLogout} />}

			<BottomNav active={tab} onChange={changeTab} />

			{/* Dev toolbar — ponytail: hidden in production */}
			{typeof window !== "undefined" &&
				process.env.NODE_ENV !== "production" && (
					<div className="absolute bottom-20 right-3 z-50 flex flex-col gap-1">
						<button
							type="button"
							onClick={() => revealMutation.mutate("morning_10am")}
							disabled={revealMutation.isPending}
							className="bg-primary text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-lg active:scale-95 transition-transform"
						>
							{revealMutation.isPending ? "..." : "Dev: Morning"}
						</button>
						<button
							type="button"
							onClick={() => revealMutation.mutate("evening_930pm")}
							disabled={revealMutation.isPending}
							className="bg-primary text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow-lg active:scale-95 transition-transform"
						>
							{revealMutation.isPending ? "..." : "Dev: Evening"}
						</button>
					</div>
				)}
		</main>
	);
}

export default function HomePage() {
	return (
		<Suspense
			fallback={
				<main className="flex min-h-screen items-center justify-center bg-bg">
					<p className="text-text-muted">Loading...</p>
				</main>
			}
		>
			<HomePageInner />
		</Suspense>
	);
}
