"use client";

import { useEffect } from "react";

type NavigatorWithUserAgentData = Navigator & {
	userAgentData?: {
		mobile?: boolean;
		platform?: string;
	};
};

function getDisplayMode() {
	if (window.matchMedia("(display-mode: standalone)").matches) {
		return "standalone";
	}

	if (window.matchMedia("(display-mode: fullscreen)").matches) {
		return "fullscreen";
	}

	return "browser";
}

function getViewportClass(width: number) {
	if (width <= 440) return "phone";
	if (width < 768) return "phone-wide";
	if (width < 1024) return "tablet";
	return "desktop";
}

function hasCoarseTouch(maxTouchPoints: number) {
	return maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
}

function mobileUserAgent(nav: NavigatorWithUserAgentData, ua: string) {
	return (
		nav.userAgentData?.mobile === true ||
		/iPhone|iPod|Android|Mobile|Windows Phone|FBAN|FBAV/i.test(ua)
	);
}

function getOs(ua: string, platform: string, maxTouchPoints: number) {
	if (
		/iPhone|iPod/i.test(ua) ||
		(/Mac/i.test(platform) && maxTouchPoints > 1)
	) {
		return "ios";
	}

	if (/Android/i.test(ua)) {
		return "android";
	}

	return "desktop";
}

function getDeviceKind({
	hasTouch,
	isMobileUa,
	ua,
	width,
}: {
	hasTouch: boolean;
	isMobileUa: boolean;
	ua: string;
	width: number;
}) {
	if (isMobileUa && hasTouch && width <= 480) {
		return "phone";
	}

	if (
		hasTouch &&
		width > 480 &&
		width <= 1024 &&
		/iPad|Tablet|Android/i.test(ua)
	) {
		return "tablet";
	}

	return "desktop";
}

function getDeviceProfile() {
	const nav = navigator as NavigatorWithUserAgentData;
	const ua = nav.userAgent || "";
	const platform = nav.userAgentData?.platform || "";
	const width = window.innerWidth;
	const maxTouchPoints = nav.maxTouchPoints || 0;
	const hasTouch = hasCoarseTouch(maxTouchPoints);
	const isMobileUa = mobileUserAgent(nav, ua);

	return {
		device: getDeviceKind({ hasTouch, isMobileUa, ua, width }),
		displayMode: getDisplayMode(),
		os: getOs(ua, platform, maxTouchPoints),
		touch: hasTouch ? "coarse" : "fine",
		viewport: getViewportClass(width),
	};
}

export function DeviceAttributes() {
	useEffect(() => {
		const root = document.documentElement;
		const profile = getDeviceProfile();

		root.dataset.device = profile.device;
		root.dataset.displayMode = profile.displayMode;
		root.dataset.os = profile.os;
		root.dataset.touch = profile.touch;
		root.dataset.viewport = profile.viewport;
	}, []);

	return null;
}
