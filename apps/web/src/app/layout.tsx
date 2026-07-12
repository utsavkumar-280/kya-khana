import type { Metadata, Viewport } from "next";
import {
	Plus_Jakarta_Sans,
	Be_Vietnam_Pro,
	Noto_Sans_Devanagari,
} from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const displayFont = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-display",
	weight: ["500", "600", "700", "800"],
});

const bodyFont = Be_Vietnam_Pro({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["400", "500", "600", "700"],
});

const hindiFont = Noto_Sans_Devanagari({
	subsets: ["devanagari"],
	variable: "--font-hindi",
	weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Kya Khana",
	description: "Meal planning for shared households",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#E65100",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${displayFont.variable} ${bodyFont.variable} ${hindiFont.variable}`}
		>
			<body className="app-viewport bg-bg text-ink antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
