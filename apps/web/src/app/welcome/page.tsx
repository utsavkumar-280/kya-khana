import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
	return (
		<main className="welcome-page max-w-[390px] mx-auto">
			{/* Wordmark + Hero illustration */}
			<div className="welcome-hero">
				<h1 className="welcome-wordmark">
					kya <span className="wordmark-dash">-</span> khana
				</h1>

				<div className="welcome-circle-bg">
					<div className="welcome-circle-img">
						<Image
							src="/welcome_logo.png"
							alt="Kya Khana"
							fill
							className="object-cover"
							priority
						/>
					</div>
				</div>

				{/* Decorative floating dots */}
				<div className="welcome-dots" aria-hidden="true">
					<span
						className="welcome-dot"
						style={{
							width: 11,
							height: 11,
							top: "18%",
							left: "8%",
						}}
					/>
					<span
						className="welcome-dot"
						style={{
							width: 7,
							height: 7,
							top: "28%",
							right: "6%",
						}}
					/>
					<span
						className="welcome-dot"
						style={{
							width: 14,
							height: 14,
							bottom: "22%",
							left: "10%",
						}}
					/>
					<span
						className="welcome-dot"
						style={{
							width: 8,
							height: 8,
							bottom: "30%",
							right: "10%",
						}}
					/>
					<span
						className="welcome-dot"
						style={{
							width: 6,
							height: 6,
							top: "14%",
							left: "24%",
						}}
					/>
				</div>
			</div>

			{/* Feature tagline + description + CTA */}
			<div className="welcome-bottom">
				<h2 className="welcome-headline">Plan Meals &amp; Groceries</h2>
				<p className="welcome-subtext">
					Vote on delicious combos, track your kitchen inventory, and let the
					app build your grocery list — all before the cook arrives.
				</p>

				<Link href="/login">
					<button className="welcome-btn">Get Started</button>
				</Link>
			</div>
		</main>
	);
}
