import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
	return (
		<main className="app-shell entry-page welcome-page">
			<h1 className="entry-wordmark">
				kya <span className="wordmark-dash">-</span> khana
			</h1>

			<div className="welcome-artwork">
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
					<span className="welcome-dot welcome-dot-1" />
					<span className="welcome-dot welcome-dot-2" />
					<span className="welcome-dot welcome-dot-3" />
					<span className="welcome-dot welcome-dot-4" />
					<span className="welcome-dot welcome-dot-5" />
				</div>
			</div>

			<div className="welcome-content">
				<h2 className="welcome-headline">Plan Meals &amp; Groceries</h2>
				<p className="welcome-subtext">
					Vote on delicious combos, track your kitchen inventory, and let the
					app build your grocery list — all before the cook arrives.
				</p>
			</div>

			<Link href="/login" className="welcome-btn">
				Get Started
			</Link>
		</main>
	);
}
