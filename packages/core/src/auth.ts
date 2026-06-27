export interface Session {
	user: {
		id: string;
		name: string;
		email: string;
		role?: string;
		householdId?: string;
	};
}

export class HttpError extends Error {
	constructor(
		public statusCode: number,
		message: string,
	) {
		super(message);
		this.name = "HttpError";
	}
}

export function requireRole(session: Session, ...allowed: string[]): void {
	if (!session?.user?.role || !allowed.includes(session.user.role)) {
		throw new HttpError(403, "Forbidden: insufficient role");
	}
}

export function assertCanVote(session: Session): void {
	if (session?.user?.role === "cook") {
		throw new HttpError(403, "Forbidden: cook does not vote");
	}
}
