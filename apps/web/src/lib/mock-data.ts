// ponytail: mock data for Phase 4; replace with API in Phase 5

export interface ComboItem {
	emoji?: string;
	name: string;
	hindi?: string;
	diet?: "veg" | "nonveg";
}

export interface ComboData {
	letter: "A" | "B";
	items: ComboItem[];
	vegVariant?: { name: string } | null;
	voteCount: number;
	isVoted?: boolean;
	isWinner?: boolean;
}

export interface Meal {
	id: string;
	meal: string;
	hindi?: string;
	when: string;
	state: "active" | "locked" | "decided";
	combos: ComboData[];
	closesInSec?: number;
	opensInSec?: number;
	winningCombo?: string;
}

export const mockMeals: Meal[] = [
	// Past — yesterday morning (decided)
	{
		id: "past-1",
		meal: "Yesterday Morning",
		hindi: "कल सुबह",
		when: "Yesterday · Morning",
		state: "decided",
		winningCombo: "A",
		combos: [
			{
				letter: "A",
				items: [
					{ emoji: "🥞", name: "Idli", hindi: "इडली" },
					{ emoji: "🍲", name: "Sambar", hindi: "सांबर" },
					{ emoji: "🥥", name: "Coconut Chutney", hindi: "नारियल चटनी" },
				],
				voteCount: 3,
				isWinner: true,
			},
			{
				letter: "B",
				items: [
					{ emoji: "🍞", name: "Bread Toast", hindi: "ब्रेड टोस्ट" },
					{ emoji: "🍳", name: "Masala Omelette", hindi: "मसाला ऑमलेट" },
				],
				voteCount: 1,
				isWinner: false,
			},
		],
	},
	// Past — yesterday evening (decided)
	{
		id: "past-2",
		meal: "Yesterday Evening",
		hindi: "कल शाम",
		when: "Yesterday · Evening",
		state: "decided",
		winningCombo: "B",
		combos: [
			{
				letter: "A",
				items: [
					{ emoji: "🍚", name: "Jeera Rice", hindi: "जीरा राइस" },
					{
						emoji: "🍗",
						name: "Butter Chicken",
						hindi: "बटर चिकन",
						diet: "nonveg",
					},
					{ emoji: "🫘", name: "Dal Tadka", hindi: "दाल तड़का" },
					{ emoji: "🥗", name: "Green Salad", hindi: "हरा सलाद" },
				],
				vegVariant: { name: "Paneer Butter Masala" },
				voteCount: 1,
			},
			{
				letter: "B",
				items: [
					{ emoji: "🫓", name: "Wheat Roti", hindi: "गेहूं की रोटी" },
					{
						emoji: "🌿",
						name: "Palak Paneer",
						hindi: "पालक पनीर",
						diet: "veg",
					},
					{ emoji: "🫘", name: "Dal Makhani", hindi: "दाल मखनी" },
					{ emoji: "🥒", name: "Boondi Raita", hindi: "बूंदी रायता" },
				],
				voteCount: 3,
				isWinner: true,
			},
		],
	},
	// Today — active voting
	{
		id: "today-1",
		meal: "Tonight's Dinner",
		hindi: "आज रात का खाना",
		when: "Today · Evening",
		state: "active",
		closesInSec: 11520, // 3h 12m
		combos: [
			{
				letter: "A",
				items: [
					{ emoji: "🍚", name: "Jeera Rice", hindi: "जीरा राइस" },
					{
						emoji: "🍗",
						name: "Butter Chicken",
						hindi: "बटर चिकन",
						diet: "nonveg",
					},
					{ emoji: "🫘", name: "Dal Tadka", hindi: "दाल तड़का" },
					{ emoji: "🥗", name: "Green Salad", hindi: "हरा सलाद" },
				],
				vegVariant: { name: "Paneer Butter Masala" },
				voteCount: 2,
			},
			{
				letter: "B",
				items: [
					{ emoji: "🫓", name: "Wheat Roti", hindi: "गेहूं की रोटी" },
					{
						emoji: "🌿",
						name: "Palak Paneer",
						hindi: "पालक पनीर",
						diet: "veg",
					},
					{ emoji: "🫘", name: "Dal Makhani", hindi: "दाल मखनी" },
					{ emoji: "🥒", name: "Boondi Raita", hindi: "बूंदी रायता" },
				],
				voteCount: 1,
			},
		],
	},
	// Future — tomorrow breakfast (locked)
	{
		id: "future-1",
		meal: "Tomorrow Breakfast",
		hindi: "कल का नाश्ता",
		when: "Tomorrow · Morning",
		state: "locked",
		opensInSec: 43200, // 12h
		combos: [
			{
				letter: "A",
				items: [
					{ emoji: "🍳", name: "Masala Omelette", hindi: "मसाला ऑमलेट" },
					{ emoji: "🍞", name: "Bread Toast", hindi: "ब्रेड टोस्ट" },
				],
				voteCount: 0,
			},
			{
				letter: "B",
				items: [
					{ emoji: "🥞", name: "Poha", hindi: "पोहा" },
					{ emoji: "☕", name: "Masala Chai", hindi: "मसाला चाय" },
				],
				voteCount: 0,
			},
		],
	},
	// Future — tomorrow lunch (locked)
	{
		id: "future-2",
		meal: "Tomorrow Lunch",
		hindi: "कल का खाना",
		when: "Tomorrow · Afternoon",
		state: "locked",
		opensInSec: 57600, // 16h
		combos: [
			{
				letter: "A",
				items: [
					{ emoji: "🫓", name: "Bajra Roti", hindi: "बाजरा रोटी" },
					{
						emoji: "🍆",
						name: "Baingan Bharta",
						hindi: "बैंगन भर्ता",
						diet: "veg",
					},
					{ emoji: "🫘", name: "Moong Dal", hindi: "मूंग दाल" },
					{ emoji: "🥒", name: "Cucumber Raita", hindi: "खीरा रायता" },
				],
				voteCount: 0,
			},
			{
				letter: "B",
				items: [
					{ emoji: "🍚", name: "Steamed Rice", hindi: "उबले चावल" },
					{ emoji: "🌿", name: "Aloo Gobi", hindi: "आलू गोभी", diet: "veg" },
					{ emoji: "🫘", name: "Dal Fry", hindi: "दाल फ्राई" },
					{ emoji: "🥗", name: "Kachumber Salad", hindi: "कचुंबर" },
				],
				voteCount: 0,
			},
		],
	},
];

// Inventory mock data

export interface StockItem {
	emoji: string;
	name: string;
	hindi?: string;
	quantity: number;
	unit: string;
}

export interface StockCategory {
	category: string;
	items: StockItem[];
}

export const mockStock: StockCategory[] = [
	{
		category: "Vegetables",
		items: [
			{
				emoji: "🧅",
				name: "Onion",
				hindi: "प्याज़",
				quantity: 4,
				unit: "pieces",
			},
			{
				emoji: "🍅",
				name: "Tomato",
				hindi: "टमाटर",
				quantity: 6,
				unit: "pieces",
			},
			{ emoji: "🥔", name: "Potato", hindi: "आलू", quantity: 8, unit: "pieces" },
			{ emoji: "🥬", name: "Spinach", hindi: "पालक", quantity: 200, unit: "g" },
			{
				emoji: "🫑",
				name: "Capsicum",
				hindi: "शिमला मिर्च",
				quantity: 3,
				unit: "pieces",
			},
			{
				emoji: "🧄",
				name: "Garlic",
				hindi: "लहसुन",
				quantity: 10,
				unit: "cloves",
			},
		],
	},
	{
		category: "Dairy",
		items: [
			{ emoji: "🧀", name: "Paneer", hindi: "पनीर", quantity: 400, unit: "g" },
			{
				emoji: "🥛",
				name: "Curd (Yogurt)",
				hindi: "दही",
				quantity: 500,
				unit: "g",
			},
			{ emoji: "🧈", name: "Butter", hindi: "मक्खन", quantity: 200, unit: "g" },
		],
	},
	{
		category: "Grains & Flours",
		items: [
			{
				emoji: "🌾",
				name: "Wheat Flour",
				hindi: "आटा",
				quantity: 2,
				unit: "kg",
			},
			{
				emoji: "🍚",
				name: "Basmati Rice",
				hindi: "बासमती चावल",
				quantity: 1.5,
				unit: "kg",
			},
		],
	},
	{
		category: "Lentils",
		items: [
			{
				emoji: "🫘",
				name: "Toor Dal",
				hindi: "तूर दाल",
				quantity: 500,
				unit: "g",
			},
			{
				emoji: "🫘",
				name: "Moong Dal",
				hindi: "मूंग दाल",
				quantity: 300,
				unit: "g",
			},
		],
	},
];

export interface GroceryNeeds {
	needToBuy: StockItem[];
	inStock: StockItem[];
}

export interface GroceryMeal {
	meal: string;
	items: GroceryNeeds;
}

export const mockGroceryList: GroceryMeal[] = [
	{
		meal: "Tonight's Dinner",
		items: {
			needToBuy: [
				{ emoji: "🍗", name: "Chicken", quantity: 300, unit: "g" },
				{ emoji: "🥛", name: "Fresh Cream", quantity: 50, unit: "ml" },
				{ emoji: "🫚", name: "Ginger", quantity: 15, unit: "g" },
			],
			inStock: [
				{ emoji: "🧅", name: "Onion", quantity: 0, unit: "in stock" },
				{ emoji: "🍅", name: "Tomato", quantity: 0, unit: "in stock" },
			],
		},
	},
	{
		meal: "Tomorrow Breakfast",
		items: {
			needToBuy: [
				{ emoji: "🥚", name: "Eggs", quantity: 6, unit: "pieces" },
				{ emoji: "🍞", name: "Bread", quantity: 1, unit: "pack" },
			],
			inStock: [{ emoji: "🧅", name: "Onion", quantity: 0, unit: "in stock" }],
		},
	},
];

// More screen data

export interface MenuItem {
	icon: string;
	title: string;
	subtitle: string;
	badge?: number;
}

export const mockMenuItems: MenuItem[] = [
	{
		icon: "👨‍🍳",
		title: "Cook View",
		subtitle: "Today's recipes and cook instructions",
	},
	{
		icon: "🔔",
		title: "Notifications",
		subtitle: "Vote reminders, food ready alerts",
		badge: 2,
	},
	{
		icon: "📋",
		title: "Meal Templates",
		subtitle: "Edit breakfast, lunch, dinner components",
	},
	{
		icon: "🕐",
		title: "Cook Times",
		subtitle: "Morning: 8:00 AM · Evening: 7:30 PM",
	},
	{ icon: "👤", title: "Profile", subtitle: "Housemate 1" },
];

export const mockProfile = {
	name: "Housemate 1",
	role: "housemate" as const,
	avatarInitials: "H1",
};
