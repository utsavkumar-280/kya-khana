import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "@kya-khana/db";

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) {
	throw new Error(
		"BETTER_AUTH_SECRET env var is required (run: openssl rand -hex 32)",
	);
}

export const auth = betterAuth({
	secret,
	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:4000",
	basePath: "/api/auth",
	database: prismaAdapter(prisma, { provider: "postgresql" }),
	trustedOrigins: ["http://localhost:3000"],
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: true,
				defaultValue: "housemate",
			},
			householdId: {
				type: "string",
				required: false,
			},
		},
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					return {
						data: {
							...user,
							householdId: "household_default",
						},
					};
				},
			},
		},
	},
});
