"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleReset(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await apiFetch("/auth/forgot-password", {
				method: "POST",
				body: JSON.stringify({ email }),
			});
			setSent(true);
		} catch (err) {
			setError((err as Error).message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="app-shell entry-page auth-page auth-page-with-artwork">
			{/* Wordmark */}
			<h1 className="entry-wordmark">
				kya <span className="wordmark-dash">-</span> khana
			</h1>
			<p className="auth-greeting">Forgot Password</p>
			<p className="auth-subheader">
				{sent
					? "Check your email for a reset link"
					: "Enter your email and we&apos;ll send you a reset link"}
			</p>

			{/* Error */}
			{error && <p className="auth-error">{error}</p>}

			{!sent && (
				<form onSubmit={handleReset}>
					<div>
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

					<button type="submit" disabled={loading} className="auth-btn">
						{loading ? "Sending…" : "Send Reset Link"}
					</button>
				</form>
			)}

			{/* Back to login */}
			<p className="auth-link">
				<Link href="/login">← Back to login</Link>
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
