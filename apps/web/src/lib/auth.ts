import { createAuthClient } from "better-auth/client";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const authClient = createAuthClient({
	baseURL: `${apiUrl}/api/auth`,
});
