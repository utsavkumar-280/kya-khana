"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { DeviceAttributes } from "@/components/device-attributes";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<DeviceAttributes />
			{children}
		</QueryClientProvider>
	);
}
