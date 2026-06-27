"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import type {
	DashboardFeedDTO,
	VoteRequest,
	VoteResponse,
	StockResponse,
	GroceryListDTO,
	CookViewDTO,
	DeductionProposalDTO,
	MeResponse,
} from "./types";

// ── helpers ───────────────────────────────────────────────────────

function invalidateMeals(qc: ReturnType<typeof useQueryClient>) {
	qc.invalidateQueries({ queryKey: ["meals"] });
}

// ── meals feed ─────────────────────────────────────────────────────

export function useMealsFeed() {
	return useQuery<DashboardFeedDTO>({
		queryKey: ["meals"],
		queryFn: () => api.get("/meals/feed"),
	});
}

// ── vote (optimistic) ──────────────────────────────────────────────

export function useVote() {
	const qc = useQueryClient();

	return useMutation<
		VoteResponse,
		Error,
		VoteRequest,
		{ prev: DashboardFeedDTO | undefined }
	>({
		mutationFn: (req) => api.post("/votes", req),
		onMutate: async (req) => {
			await qc.cancelQueries({ queryKey: ["meals"] });
			const prev = qc.getQueryData<DashboardFeedDTO>(["meals"]);
			qc.setQueryData<DashboardFeedDTO>(["meals"], (old) => {
				if (!old) return old;
				return {
					...old,
					meals: old.meals.map((m) => {
						if (m.id !== req.mealCycleId) return m;
						return {
							...m,
							combos: m.combos.map((c) => ({
								...c,
								voteCount:
									c.id === req.mealComboId ? c.voteCount + 1 : c.voteCount,
							})),
						};
					}),
				};
			});
			return { prev };
		},
		onError: (_err, _req, ctx) => {
			if (ctx?.prev) qc.setQueryData(["meals"], ctx.prev);
		},
		onSettled: () => invalidateMeals(qc),
	});
}

// ── close voting ───────────────────────────────────────────────────

export function useCloseVoting() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (cycleId: string) => api.post(`/meals/${cycleId}/close`),
		onSuccess: () => invalidateMeals(qc),
	});
}

// ── break tie ──────────────────────────────────────────────────────

export function useBreakTie() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			cycleId,
			mealComboId,
		}: {
			cycleId: string;
			mealComboId: string;
		}) => api.post(`/meals/${cycleId}/break-tie`, { mealComboId }),
		onSuccess: () => invalidateMeals(qc),
	});
}

// ── inventory ──────────────────────────────────────────────────────

export function useInventory() {
	return useQuery<StockResponse>({
		queryKey: ["inventory"],
		queryFn: () => api.get("/inventory/stock"),
	});
}

export function useUpdateInventory() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			ingredientId,
			quantity,
			unit,
		}: {
			ingredientId: string;
			quantity: number;
			unit?: string;
		}) => api.patch(`/inventory/${ingredientId}`, { quantity, unit }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
	});
}

// ── grocery list ───────────────────────────────────────────────────

export function useGroceryList(cycleIds?: string[]) {
	return useQuery<GroceryListDTO>({
		queryKey: ["grocery", cycleIds],
		queryFn: () =>
			api.get(
				"/grocery/list" +
					(cycleIds?.length ? `?cycleIds=${cycleIds.join(",")}` : ""),
			),
	});
}

// ── cook view ──────────────────────────────────────────────────────

export function useCookView(cycleId: string) {
	return useQuery<CookViewDTO>({
		queryKey: ["cook", cycleId],
		queryFn: () => api.get(`/cook/${cycleId}`),
		enabled: !!cycleId,
	});
}

// ── mark cooked ────────────────────────────────────────────────────

export function useMarkCooked() {
	const qc = useQueryClient();
	return useMutation<
		DeductionProposalDTO[] | { ok: boolean },
		Error,
		{
			mealCycleId: string;
			adjustments?: { ingredientId: string; deductQty: number }[];
		}
	>({
		mutationFn: (req) => api.post("/cook/mark-cooked", req),
		onSuccess: (_data, req) => {
			// second step (confirm) invalidates meals + inventory
			if (req.adjustments?.length) {
				qc.invalidateQueries({ queryKey: ["meals"] });
				qc.invalidateQueries({ queryKey: ["inventory"] });
			}
		},
	});
}

// ── me ─────────────────────────────────────────────────────────────

export function useMe() {
	return useQuery<MeResponse>({
		queryKey: ["me"],
		queryFn: () => api.get("/auth/me"),
		staleTime: 60_000,
	});
}

// ── onboarding ─────────────────────────────────────────────────────

export function useOnboarding() {
	return useMutation({
		mutationFn: (req: {
			role: string;
			morningCookTime?: string;
			eveningCookTime?: string;
			cuisinePreference?: string;
		}) => api.post("/auth/onboarding", req),
	});
}

// ── dev reveal ─────────────────────────────────────────────────────

export function useRevealDev() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (type: string) => api.post(`/dev/reveal?type=${type}`),
		onSuccess: () => invalidateMeals(qc),
	});
}
