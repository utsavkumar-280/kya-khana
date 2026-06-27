import type { PrismaClient } from "@kya-khana/db";

// ponytail: web-push lives in apps/api deps; core loads it dynamically at runtime
type WebPushModule = typeof import("web-push");
let webPush: WebPushModule | null = null;

async function loadWebPush() {
	if (webPush) return webPush;
	try {
		webPush = await import("web-push");
	} catch {
		webPush = null;
	}
	return webPush;
}

export async function sendToHousehold(
	prisma: PrismaClient,
	householdId: string,
	payload: { title: string; body: string; data?: Record<string, unknown> },
): Promise<void> {
	const wp = await loadWebPush();
	if (!wp) {
		console.warn("web-push not available; skipping push notifications");
		return;
	}

	const publicKey = process.env.VAPID_PUBLIC_KEY;
	const privateKey = process.env.VAPID_PRIVATE_KEY;
	if (!publicKey || !privateKey) {
		console.warn("VAPID keys missing; skipping push notifications");
		return;
	}

	wp.setVapidDetails("mailto:admin@kyakhana.local", publicKey, privateKey);

	const subs = await prisma.pushSubscription.findMany({
		where: { householdId },
	});

	for (const sub of subs) {
		try {
			await wp.sendNotification(
				{
					endpoint: sub.endpoint,
					keys: { p256dh: sub.p256dh, auth: sub.auth },
				},
				JSON.stringify(payload),
			);
		} catch (err: unknown) {
			const e = err as { statusCode?: number; message?: string };
			if (e.statusCode === 404 || e.statusCode === 410) {
				await prisma.pushSubscription
					.delete({ where: { id: sub.id } })
					.catch(() => {});
			} else {
				console.warn("Push send failed:", e.message);
			}
		}
	}
}

export async function subscribe(
	prisma: PrismaClient,
	householdId: string,
	userId: string,
	sub: { endpoint: string; keys: { p256dh: string; auth: string } },
): Promise<void> {
	await prisma.pushSubscription.upsert({
		where: { userId_endpoint: { userId, endpoint: sub.endpoint } },
		create: {
			householdId,
			userId,
			endpoint: sub.endpoint,
			p256dh: sub.keys.p256dh,
			auth: sub.keys.auth,
		},
		update: {
			p256dh: sub.keys.p256dh,
			auth: sub.keys.auth,
		},
	});
}

export async function unsubscribe(
	prisma: PrismaClient,
	endpoint: string,
): Promise<void> {
	await prisma.pushSubscription.deleteMany({ where: { endpoint } });
}
