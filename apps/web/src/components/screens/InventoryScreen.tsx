"use client";

import { useState } from "react";
import { useInventory, useUpdateInventory, useGroceryList } from "@/lib/hooks";

export function InventoryScreen() {
	const [tab, setTab] = useState<"stock" | "grocery">("stock");
	const { data: stock, isLoading: stockLoading } = useInventory();
	const { data: grocery, isLoading: groceryLoading } = useGroceryList();
	const updateMutation = useUpdateInventory();

	// ponytail: group items client-side by category field
	const stockItems = stock?.categories?.flatMap((c) => c.items) ?? [];
	const stockByCategory = new Map<string, typeof stockItems>();
	for (const item of stockItems) {
		const cat = item.category || "Other";
		if (!stockByCategory.has(cat)) stockByCategory.set(cat, []);
		stockByCategory.get(cat)!.push(item);
	}

	const needItems = grocery?.items?.filter((i) => i.shortfall > 0) ?? [];
	const haveItems = grocery?.items?.filter((i) => i.shortfall === 0) ?? [];
	const groceryItems = grocery?.items?.length ?? 0;

	const shareWhatsApp = () => {
		if (!grocery?.items?.length) return;
		const text = grocery.items
			.map((i) => `⬜ ${i.name}: ${i.shortfall}${i.unit}`)
			.join("\n");
		window.open(
			`https://wa.me/?text=${encodeURIComponent(`*Grocery List*\n${text}`)}`,
			"_blank",
		);
	};

	return (
		<div className="flex-1 min-h-0 flex flex-col">
			{/* Toggle bar */}
			<div className="pt-1 px-4 pb-3">
				<div className="toggle-track">
					<button
						className={`toggle-btn ${tab === "stock" ? "toggle-btn-on" : ""}`}
						onClick={() => setTab("stock")}
					>
						Stock
					</button>
					<button
						className={`toggle-btn ${tab === "grocery" ? "toggle-btn-on" : ""}`}
						onClick={() => setTab("grocery")}
					>
						Grocery List
						{groceryItems > 0 && (
							<span className="toggle-count">{groceryItems}</span>
						)}
					</button>
				</div>
			</div>

			{/* Stock view */}
			{tab === "stock" && (
				<div className="stock-scroll no-scrollbar">
					{stockLoading && <p>Loading inventory...</p>}
					{!stockLoading &&
						Array.from(stockByCategory.entries()).map(([cat, items]) => (
							<div key={cat}>
								<div className="seclabel">{cat}</div>
								{items.map((item) => (
									<div key={item.ingredientId} className="stock-row">
										<span className="stock-name">{item.name}</span>
										<div className="flex items-center gap-1.5">
											<button
												className="stepper-btn"
												onClick={() =>
													updateMutation.mutate({
														ingredientId: item.ingredientId,
														quantity: Math.max(0, item.quantity - 1),
														unit: item.unit,
													})
												}
											>
												−
											</button>
											<span className="stepper-value">
												{item.quantity}
												{item.unit}
											</span>
											<button
												className="stepper-btn"
												onClick={() =>
													updateMutation.mutate({
														ingredientId: item.ingredientId,
														quantity: item.quantity + 1,
														unit: item.unit,
													})
												}
											>
												+
											</button>
										</div>
									</div>
								))}
							</div>
						))}
				</div>
			)}

			{/* Grocery list */}
			{tab === "grocery" && (
				<div className="stock-scroll no-scrollbar">
					{groceryLoading && <p>Loading grocery list...</p>}
					{!groceryLoading && (
						<>
							{needItems.length > 0 && (
								<>
									<div className="seclabel">Need to buy</div>
									{needItems.map((item) => (
										<div
											key={item.ingredientId}
											className="grocery-row grocery-need"
										>
											<span>📋</span>
											<span className="stock-name">{item.name}</span>
											<span
												className="grocery-qty"
												style={{ color: "#C62828" }}
											>
												{item.shortfall}
												{item.unit}
											</span>
										</div>
									))}
								</>
							)}
							{haveItems.length > 0 && (
								<>
									<div className="seclabel">In stock</div>
									{haveItems.map((item) => (
										<div
											key={item.ingredientId}
											className="grocery-row grocery-have"
										>
											<span>✅</span>
											<span
												className="stock-name"
												style={{ textDecoration: "line-through" }}
											>
												{item.name}
											</span>
											<span
												className="grocery-qty"
												style={{ color: "#2E7D32" }}
											>
												In stock
											</span>
										</div>
									))}
								</>
							)}
							{grocery && grocery.items.length > 0 && (
								<button className="whatsapp-btn" onClick={shareWhatsApp}>
									📤 Share via WhatsApp
								</button>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
}
