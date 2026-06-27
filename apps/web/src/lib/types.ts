// ponytail: frontend DTOs — parallel copies of @kya-khana/types shapes
// (server package may not resolve in browser bundler, so copy the interfaces)

export interface ComboItemDTO {
	componentId: string;
	componentName: string;
	dishId: string;
	dishName: string;
	isVegetarian: boolean;
	emoji?: string;
}

export interface VegVariantDTO {
	dishId: string;
	dishName: string;
}

export interface ComboDTO {
	id: string;
	displayOrder: number;
	diet: "veg" | "nonveg";
	items: ComboItemDTO[];
	vegVariant?: VegVariantDTO | null;
	voteCount: number;
}

export interface MealCycleDTO {
	id: string;
	date: string;
	mealType: "morning" | "evening";
	mealSubType: "breakfast" | "lunch" | "dinner" | "any";
	state: "active" | "locked" | "decided";
	cookTime: string | null;
	orderingDeadline: string | null;
	suggestionTime: string | null;
	closesInSec?: number;
	opensInSec?: number;
	combos: ComboDTO[];
	winningComboId?: string | null;
	decidedBy?: "votes" | "tie_break" | "default" | null;
}

export interface DashboardFeedDTO {
	meals: MealCycleDTO[];
}

export interface VoteRequest {
	mealCycleId: string;
	mealComboId: string;
}

export interface VoteResponse {
	mealCycleId: string;
	mealComboId: string;
}

export interface InventoryItemDTO {
	ingredientId: string;
	name: string;
	quantity: number;
	unit: string;
	category: string;
}

export interface StockResponse {
	categories: {
		name: string;
		items: InventoryItemDTO[];
	}[];
}

export interface GroceryListItemDTO {
	ingredientId: string;
	name: string;
	need: number;
	have: number;
	unit: string;
	shortfall: number;
}

export interface GroceryListDTO {
	items: GroceryListItemDTO[];
}

export interface CookViewDTO {
	mealCycleId: string;
	mealSubType: string;
	winningCombo: ComboDTO;
	recipeSteps: string[];
	videoReferences: string[];
	prepTimeMin: number;
	allIngredientsAvailable: boolean;
	vegVariant?: VegVariantDTO | null;
}

export interface DeductionProposalDTO {
	ingredientId: string;
	name: string;
	proposedDeduction: number;
	currentQty: number;
	unit: string;
}

export interface MeResponse {
	id: string;
	name: string;
	email: string;
	role: string;
	householdId: string | null;
	household: {
		id: string;
		name: string;
		cuisinePreference: string;
		morningCookTime: string | null;
		eveningCookTime: string | null;
	} | null;
	onboarded: boolean;
}
