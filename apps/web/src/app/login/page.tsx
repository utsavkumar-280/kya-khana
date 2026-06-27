"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await authClient.signIn.email({ email, password });
			if (res.error) {
				setError(res.error.message || "Login failed");
				setLoading(false);
				return;
			}
			const me = await apiFetch("/auth/me");
			if (!me.onboarded) {
				router.push("/onboarding");
			} else {
				router.push("/");
			}
		} catch (err: any) {
			setError(err.message || "Login failed");
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-bg p-4">
			<div className="w-full max-w-[360px]">
				{/* Wordmark */}
				<h1 className="text-center font-display font-extrabold text-[28px] tracking-[-0.03em] text-primary mb-1">
					Kya Khana
				</h1>
				<p className="text-center text-text-muted text-sm mb-8">Welcome back</p>

				<div className="bg-surface border border-border rounded-[22px] shadow-card p-6">
					<form onSubmit={onSubmit} className="space-y-4">
						<div>
							<Label
								htmlFor="email"
								className="text-text text-xs font-semibold"
							>
								Email
							</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
								placeholder="you@example.com"
								className="rounded-xl mt-1.5 bg-[#FDFBFA]"
								required
							/>
						</div>
						<div>
							<Label
								htmlFor="password"
								className="text-text text-xs font-semibold"
							>
								Password
							</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) =>
									setPassword((e.target as HTMLInputElement).value)
								}
								placeholder="••••••••"
								className="rounded-xl mt-1.5 bg-[#FDFBFA]"
								required
							/>
						</div>
						{error && (
							<p className="text-[13px] text-nonveg bg-nonveg-bg rounded-lg px-3 py-2">
								{error}
							</p>
						)}
						<Button
							type="submit"
							className="w-full rounded-xl h-11 font-semibold active:scale-[0.97] transition-transform"
							disabled={loading}
						>
							{loading ? "Signing in..." : "Sign In"}
						</Button>
					</form>
					<p className="mt-5 text-center text-[13px] text-text-muted">
						No account?{" "}
						<Link
							href="/signup"
							className="text-primary font-semibold hover:underline"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
