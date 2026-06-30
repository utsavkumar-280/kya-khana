"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth";

type AuthTab = "email" | "phone";

export default function SignupPage() {
	const router = useRouter();

	// Tab state
	const [activeTab, setActiveTab] = useState<AuthTab>("email");

	// Email/password state
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Phone OTP state
	const [phone, setPhone] = useState("");
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [otpSent, setOtpSent] = useState(false);

	// Shared state
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// ── Email/password signup ──
	async function handleEmailSignup(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const { error: authError } = await authClient.signUp.email({
			name,
			email,
			password,
		});

		setLoading(false);

		if (authError) {
			setError(authError.message || "Could not create account");
		} else {
			router.push("/onboarding");
		}
	}

	// ── Phone OTP: send ──
	async function handleSendOTP() {
		setError("");
		// TODO: wire up phone OTP send endpoint
		// await api.post("/auth/phone/send-otp", { phone });
		setOtpSent(true);
	}

	// ── Phone OTP: verify & signup ──
	async function handleOtpSignup(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const code = otp.join("");
		if (code.length < 6) {
			setError("Please enter the 6-digit code");
			setLoading(false);
			return;
		}

		// TODO: wire up phone OTP signup endpoint
		// const { error: authError } = await authClient.signUp.phone({ name, phone, code });
		console.log("OTP signup:", { name, phone, code });

		setLoading(false);
		// router.push("/onboarding");
	}

	// ── Google SSO ──
	async function handleGoogleSignup() {
		setError("");
		// TODO: wire up Google SSO via better-auth social provider
		// await authClient.signIn.social({ provider: "google", callbackURL: "/onboarding" });
		console.log("Google signup triggered");
	}

	// ── OTP input handler ──
	function handleOtpChange(index: number, value: string) {
		if (!/^\d?$/.test(value)) return;
		const next = [...otp];
		next[index] = value;
		setOtp(next);

		if (value && index < 5) {
			const el = document.getElementById(`signup-otp-${index + 1}`);
			el?.focus();
		}
	}

	function handleOtpKeyDown(
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			const el = document.getElementById(`signup-otp-${index - 1}`);
			el?.focus();
		}
	}

	return (
		<main className="auth-page">
			<div className="auth-card">
				{/* Wordmark */}
				<h1 className="auth-wordmark">
					Kya <span className="wordmark-dash">—</span> Khana
				</h1>
				<p className="auth-greeting">Create Account</p>
				<p className="auth-subheader">Join your household</p>

				{/* Error banner */}
				{error && <p className="auth-error">{error}</p>}

				{/* Tab switcher: Email | Phone */}
				<div className="auth-tabs">
					<button
						type="button"
						className={`auth-tab ${activeTab === "email" ? "auth-tab-active" : ""}`}
						onClick={() => setActiveTab("email")}
					>
						Email
					</button>
					<button
						type="button"
						className={`auth-tab ${activeTab === "phone" ? "auth-tab-active" : ""}`}
						onClick={() => setActiveTab("phone")}
					>
						Phone
					</button>
				</div>

				{/* ── Email form ── */}
				{activeTab === "email" && (
					<form onSubmit={handleEmailSignup}>
						<div className="mb-3">
							<label htmlFor="name" className="auth-label">
								Full Name
							</label>
							<input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="auth-input"
								placeholder="Priya Sharma"
								required
							/>
						</div>

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
								placeholder="Min. 8 characters"
								minLength={8}
								required
							/>
						</div>

						<button type="submit" disabled={loading} className="auth-btn">
							{loading ? "Creating account…" : "Create Account"}
						</button>
					</form>
				)}

				{/* ── Phone OTP form ── */}
				{activeTab === "phone" && (
					<form onSubmit={handleOtpSignup}>
						<div className="mb-3">
							<label htmlFor="signup-name" className="auth-label">
								Full Name
							</label>
							<input
								id="signup-name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="auth-input"
								placeholder="Priya Sharma"
								required
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="signup-phone" className="auth-label">
								Phone Number
							</label>
							<div className="auth-phone-row">
								<input
									id="signup-phone"
									type="tel"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="auth-input"
									placeholder="+91 98765 43210"
									required
								/>
								<button
									type="button"
									className="auth-send-otp"
									onClick={handleSendOTP}
									disabled={otpSent}
								>
									{otpSent ? "Resend" : "Send OTP"}
								</button>
							</div>
						</div>

						{otpSent && (
							<div className="mb-4">
								<label className="auth-label">Enter OTP</label>
								<div className="auth-otp-grid">
									{otp.map((digit, i) => (
										<input
											key={i}
											id={`signup-otp-${i}`}
											type="text"
											inputMode="numeric"
											maxLength={1}
											value={digit}
											onChange={(e) => handleOtpChange(i, e.target.value)}
											onKeyDown={(e) => handleOtpKeyDown(i, e)}
											className="auth-otp-input"
										/>
									))}
								</div>
							</div>
						)}

						<button
							type="submit"
							disabled={loading || !otpSent}
							className="auth-btn"
						>
							{loading ? "Verifying…" : "Create Account"}
						</button>
					</form>
				)}

				{/* Divider */}
				<div className="auth-divider">or continue with</div>

				{/* Google SSO */}
				<button
					type="button"
					className="auth-social"
					onClick={handleGoogleSignup}
				>
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
					Sign up with Google
				</button>

				{/* Sign in link */}
				<p className="auth-link">
					Already have an account? <Link href="/login">Sign in</Link>
				</p>
			</div>
		</main>
	);
}
