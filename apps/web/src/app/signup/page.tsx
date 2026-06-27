"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await authClient.signUp.email({
				name,
				email,
				password,
			});
			if (res.error) {
				setError(res.error.message || "Sign up failed");
				setLoading(false);
				return;
			}
			router.push("/onboarding");
		} catch (err: any) {
			setError(err.message || "Sign up failed");
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
				<p className="text-center text-text-muted text-sm mb-8">
					Create your account
				</p>

				<div className="bg-surface border border-border rounded-[22px] shadow-card p-6">
					<form onSubmit={onSubmit} className="space-y-4">
						<div>
							<Label htmlFor="name" className="text-text text-xs font-semibold">
								Name
							</Label>
							<Input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName((e.target as HTMLInputElement).value)}
								placeholder="Your name"
								className="rounded-xl mt-1.5 bg-[#FDFBFA]"
								required
							/>
						</div>
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
							{loading ? "Signing up..." : "Sign Up"}
						</Button>
					</form>
					<p className="mt-5 text-center text-[13px] text-text-muted">
						Already have an account?{" "}
						<Link
							href="/login"
							className="text-primary font-semibold hover:underline"
						>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</main>
	);
}
