const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiFetch(path: string, init?: RequestInit) {
	const res = await fetch(`${apiUrl}${path}`, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(init?.headers || {}),
		},
		...init,
	});
	if (!res.ok) {
		const body = await res.json().catch(() => ({ error: res.statusText }));
		throw new Error(body.error || res.statusText);
	}
	return res.json();
}

export const api = {
	get: <T = unknown>(path: string) => apiFetch(path) as Promise<T>,
	post: <T = unknown>(path: string, body?: unknown) =>
		apiFetch(path, {
			method: "POST",
			body: body ? JSON.stringify(body) : undefined,
		}) as Promise<T>,
	patch: <T = unknown>(path: string, body?: unknown) =>
		apiFetch(path, {
			method: "PATCH",
			body: body ? JSON.stringify(body) : undefined,
		}) as Promise<T>,
	delete: <T = unknown>(path: string, body?: unknown) =>
		apiFetch(path, {
			method: "DELETE",
			body: body ? JSON.stringify(body) : undefined,
		}) as Promise<T>,
};
