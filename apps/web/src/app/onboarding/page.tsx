"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

export default function OnboardingPage() {
	const router = useRouter();
	const [step, setStep] = useState<Step>(1);
	const [role, setRole] = useState<"housemate" | "cook">("housemate");
	const [morningCookTime, setMorningCookTime] = useState("08:00");
	const [eveningCookTime, setEveningCookTime] = useState("19:30");
	const [cuisinePreference, setCuisinePreference] = useState("north_indian");

	const mutation = useMutation({
		mutationFn: async () => {
			return apiFetch("/auth/onboarding", {
				method: "POST",
				body: JSON.stringify({
					role,
					morningCookTime,
					eveningCookTime,
					cuisinePreference,
				}),
			});
		},
		onSuccess: () => {
			router.push("/");
		},
	});

	return (
		<main className="flex min-h-screen items-center justify-center bg-bg p-4">
			<div className="w-full max-w-[360px]">
				{/* Wordmark */}
				<h1 className="text-center font-display font-extrabold text-[28px] tracking-[-0.03em] text-primary mb-1">
					Kya Khana
				</h1>
				<p className="text-center text-text-muted text-sm mb-2">
					Set up your kitchen
				</p>

				{/* Progress dots */}
				<div className="flex justify-center gap-1.5 mb-8">
					{[1, 2, 3].map((s) => (
						<span
							key={s}
							className={cn(
								"w-2 h-2 rounded-full transition-colors",
								s <= step ? "bg-primary" : "bg-border",
							)}
						/>
					))}
				</div>

				<div className="bg-surface border border-border rounded-[22px] shadow-card p-6">
					{step === 1 && (
						<div className="space-y-3">
							<Label className="text-text text-sm font-semibold font-display block mb-1">
								Your role
							</Label>
							<button
								type="button"
								onClick={() => setRole("housemate")}
								className={cn(
									"w-full text-left p-4 rounded-[16px] border-2 transition-all active:scale-[0.97]",
									role === "housemate"
										? "border-primary bg-primary-soft"
										: "border-border hover:bg-primary-soft/50",
								)}
							>
								<p className="text-lg mb-0.5">🏠 Housemate</p>
								<p className="text-xs text-text-muted">
									Vote on meals, manage inventory, view grocery lists
								</p>
							</button>
							<button
								type="button"
								onClick={() => setRole("cook")}
								className={cn(
									"w-full text-left p-4 rounded-[16px] border-2 transition-all active:scale-[0.97]",
									role === "cook"
										? "border-primary bg-primary-soft"
										: "border-border hover:bg-primary-soft/50",
								)}
							>
								<p className="text-lg mb-0.5">👨‍🍳 Cook</p>
								<p className="text-xs text-text-muted">
									View decided dishes with recipes, mark as cooked
								</p>
							</button>
							<Button
								onClick={() => setStep(2)}
								className="w-full rounded-xl h-11 font-semibold active:scale-[0.97] transition-transform mt-2"
							>
								Continue
							</Button>
						</div>
					)}

					{step === 2 && (
						<div className="space-y-4">
							<Label className="text-text text-sm font-semibold font-display block">
								Cook times
							</Label>
							<div>
								<Label
									htmlFor="morning-time"
									className="text-text text-xs font-semibold"
								>
									Morning
								</Label>
								<input
									id="morning-time"
									type="time"
									value={morningCookTime}
									onChange={(e) => setMorningCookTime(e.target.value)}
									className="onboarding-input"
									required
								/>
							</div>
							<div>
								<Label
									htmlFor="evening-time"
									className="text-text text-xs font-semibold"
								>
									Evening
								</Label>
								<input
									id="evening-time"
									type="time"
									value={eveningCookTime}
									onChange={(e) => setEveningCookTime(e.target.value)}
									className="onboarding-input"
									required
								/>
							</div>
							<div className="flex gap-2 pt-1">
								<Button
									variant="outline"
									onClick={() => setStep(1)}
									className="flex-1 rounded-xl"
								>
									Back
								</Button>
								<Button
									onClick={() => setStep(3)}
									className="flex-1 rounded-xl font-semibold active:scale-[0.97] transition-transform"
								>
									Continue
								</Button>
							</div>
						</div>
					)}

					{step === 3 && (
						<div className="space-y-4">
							<Label className="text-text text-sm font-semibold font-display block">
								Cuisine preference
							</Label>
							<select
								value={cuisinePreference}
								onChange={(e) => setCuisinePreference(e.target.value)}
								className="onboarding-input"
							>
								<option value="north_indian">North Indian</option>
								<option value="south_indian">South Indian</option>
								<option value="mix">Mix</option>
							</select>

							{mutation.isError && (
								<p className="text-[13px] text-nonveg bg-nonveg-bg rounded-lg px-3 py-2">
									{(mutation.error as Error)?.message || "Failed to save"}
								</p>
							)}

							<div className="flex gap-2 pt-1">
								<Button
									variant="outline"
									onClick={() => setStep(2)}
									className="flex-1 rounded-xl"
								>
									Back
								</Button>
								<Button
									onClick={() => mutation.mutate()}
									disabled={mutation.isPending}
									className="flex-1 rounded-xl font-semibold active:scale-[0.97] transition-transform"
								>
									{mutation.isPending ? "Saving..." : "Get Started"}
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
