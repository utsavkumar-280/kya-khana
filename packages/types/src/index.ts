export type UserRole = "housemate" | "cook" | "admin";
export type MealSubType = "breakfast" | "lunch" | "dinner" | "any";
export type MealType = "morning" | "evening";
export type MealCycleStatus = "pending" | "voting" | "decided" | "cooked";
export type DecidedBy = "votes" | "tie_break" | "default";
export type SuggestionType = "morning_10am" | "evening_930pm";

export interface OnboardingRequest {
	role: "housemate" | "cook";
	morningCookTime?: string;
	eveningCookTime?: string;
	cuisinePreference?: string;
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
	mealType: MealType;
	mealSubType: MealSubType;
	state: "active" | "locked" | "decided";
	cookTime: string | null;
	orderingDeadline: string | null;
	suggestionTime: string | null;
	closesInSec?: number;
	opensInSec?: number;
	combos: ComboDTO[];
	winningComboId?: string | null;
	decidedBy?: DecidedBy | null;
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
	categories: Array<{
		name: string;
		items: InventoryItemDTO[];
	}>;
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
	forMeal?: string;
}

export interface CookViewDTO {
	mealCycleId: string;
	mealSubType: MealSubType;
	winningCombo: ComboDTO | null;
	recipeSteps: string[];
	videoReferences: string[];
	prepTimeMin: number;
	allIngredientsAvailable: boolean;
}

export interface MarkCookedRequest {
	mealCycleId: string;
}

export interface DeductionProposalDTO {
	ingredientId: string;
	name: string;
	proposedDeduction: number;
	currentQty: number;
	unit: string;
}

export interface PushSubscriptionRequest {
	endpoint: string;
	keys: {
		p256dh: string;
		auth: string;
	};
}
