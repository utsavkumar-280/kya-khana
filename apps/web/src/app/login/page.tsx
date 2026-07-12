"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Phone } from "lucide-react";
import { authClient } from "@/lib/auth";

function GoogleIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
			<path
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
				fill="#4285F4"
			/>
			<path
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
				fill="#34A853"
			/>
			<path
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
				fill="#FBBC05"
			/>
			<path
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
				fill="#EA4335"
			/>
		</svg>
	);
}

export default function LoginPage() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleEmailLogin(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const { error: authError } = await authClient.signIn.email({
			email,
			password,
			callbackURL: "/",
		});

		setLoading(false);

		if (authError) {
			setError(authError.message || "Invalid email or password");
		} else {
			router.push("/");
		}
	}

	async function handleGoogleLogin() {
		setError("");
		console.log("Google login triggered");
	}

	async function handlePhoneLogin() {
		setError("");
		console.log("Phone login triggered");
	}

	return (
		<main className="app-shell entry-page auth-page auth-page-with-artwork">
			{/* Wordmark */}
			<h1 className="entry-wordmark">
				kya <span className="wordmark-dash">-</span> khana
			</h1>
			<p className="auth-greeting">Welcome Back</p>
			<p className="auth-subheader">Sign in to continue</p>

			{/* Error */}
			{error && <p className="auth-error">{error}</p>}

			{/* Google + Phone row */}
			<div className="auth-social-row">
				<button
					type="button"
					className="auth-google-btn"
					onClick={handleGoogleLogin}
				>
					<GoogleIcon />
					Google
				</button>

				<button
					type="button"
					className="auth-phone-btn"
					onClick={handlePhoneLogin}
				>
					<Phone size={20} />
					Phone
				</button>
			</div>

			{/* Divider */}
			<div className="auth-divider">or</div>

			{/* Email form */}
			<form onSubmit={handleEmailLogin}>
				<div className="mb-3">
					<label htmlFor="email" className="auth-label">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="auth-input"
						placeholder="you@example.com"
						required
					/>
				</div>

				<div>
					<label htmlFor="password" className="auth-label">
						Password
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="auth-input"
						placeholder="••••••••"
						required
					/>
					<Link href="/forgot-password" className="auth-forgot">
						Forgot Password?
					</Link>
				</div>

				<button type="submit" disabled={loading} className="auth-btn">
					{loading ? "Signing in…" : "Log In"}
				</button>
			</form>

			{/* Sign up link */}
			<p className="auth-link">
				Don&apos;t have an account? <Link href="/signup">Sign up</Link>
			</p>

			<div className="auth-footer-artwork" aria-hidden="true">
				<Image
					src="/auth_footer_aw.png"
					alt=""
					width={1448}
					height={1086}
					priority
					className="auth-footer-artwork-img"
				/>
			</div>
		</main>
	);
}
