import { hashPassword } from "better-auth/crypto";
import * as fs from "fs";
import * as path from "path";
import { prisma } from "./src/index.js";

interface SeedData {
	household: {
		id: string;
		name: string;
		cuisinePreference: string;
	};
	users: Array<{
		id: string;
		name: string;
		email: string;
		role: string;
		householdId: string;
	}>;
	mealTemplates: Array<{
		id: string;
		householdId: string;
		name: string;
		mealSubType: string;
		isActive: boolean;
	}>;
	mealComponents: Array<{
		id: string;
		mealTemplateId: string;
		name: string;
		isRequired: boolean;
		displayOrder: number;
		minSelections: number;
		maxSelections: number;
	}>;
	ingredients: Record<
		string,
		Array<{
			id: string;
			name: string;
			defaultUnit: string;
			category: string;
		}>
	>;
	dishes: Array<{
		id: string;
		name: string;
		componentId: string;
		mealSubType: string;
		isVegetarian: boolean;
		prepTimeMin: number;
		recipeSteps: string[];
		videoReferences: string[];
		ingredients: Array<{
			ingredientId: string;
			quantity: number;
			unit: string;
		}>;
	}>;
	inventoryItems: Array<{
		ingredientId: string;
		quantity: number;
		unit: string;
		householdId: string;
	}>;
}

async function main() {
	const seedPath = path.join(__dirname, "../../docs/seed-data.json");
	let data: SeedData;
	try {
		const raw = fs.readFileSync(seedPath, "utf-8");
		data = JSON.parse(raw);
	} catch (e) {
		console.error("Failed to read/parse seed-data.json:", e);
		process.exit(1);
	}

	// 1. Household
	await prisma.household.upsert({
		where: { id: data.household.id },
		create: data.household,
		update: data.household,
	});

	// 2. Users
	for (const u of data.users) {
		await prisma.user.upsert({
			where: { id: u.id },
			create: {
				id: u.id,
				name: u.name,
				email: u.email,
				role: u.role as any,
				householdId: u.householdId,
			},
			update: {
				name: u.name,
				email: u.email,
				role: u.role as any,
				householdId: u.householdId,
			},
		});
	}

	// 2b. Accounts (Better Auth credential rows for seeded users)
	const seededPassword = await hashPassword("password123");
	for (const u of data.users) {
		await prisma.account.upsert({
			where: { id: `acc_${u.id}` },
			create: {
				id: `acc_${u.id}`,
				userId: u.id,
				providerId: "credential",
				accountId: u.email,
				password: seededPassword,
			},
			update: {
				userId: u.id,
				providerId: "credential",
				accountId: u.email,
				password: seededPassword,
			},
		});
	}

	// 3. MealTemplates
	for (const t of data.mealTemplates) {
		await prisma.mealTemplate.upsert({
			where: { id: t.id },
			create: {
				id: t.id,
				householdId: t.householdId,
				name: t.name,
				mealSubType: t.mealSubType as any,
				isActive: t.isActive,
			},
			update: {
				householdId: t.householdId,
				name: t.name,
				mealSubType: t.mealSubType as any,
				isActive: t.isActive,
			},
		});
	}

	// 4. MealComponents
	for (const c of data.mealComponents) {
		await prisma.mealComponent.upsert({
			where: { id: c.id },
			create: c,
			update: c,
		});
	}

	// 5. Ingredients (flatten categories)
	const allIngredients: SeedData["ingredients"][string] = [];
	for (const category of Object.values(data.ingredients)) {
		allIngredients.push(...category);
	}
	for (const ing of allIngredients) {
		await prisma.ingredient.upsert({
			where: { id: ing.id },
			create: ing,
			update: ing,
		});
	}

	// 6. Dishes
	for (const d of data.dishes) {
		await prisma.dish.upsert({
			where: { id: d.id },
			create: {
				id: d.id,
				name: d.name,
				componentId: d.componentId,
				mealSubType: d.mealSubType as any,
				isVegetarian: d.isVegetarian,
				prepTimeMin: d.prepTimeMin,
				recipeSteps: d.recipeSteps,
				videoReferences: d.videoReferences ?? [],
				imageUrl: null,
			},
			update: {
				name: d.name,
				componentId: d.componentId,
				mealSubType: d.mealSubType as any,
				isVegetarian: d.isVegetarian,
				prepTimeMin: d.prepTimeMin,
				recipeSteps: d.recipeSteps,
				videoReferences: d.videoReferences ?? [],
				imageUrl: null,
			},
		});
	}

	// 7. DishIngredients (derived from dish.ingredients)
	const dishIngredients: Array<{
		id: string;
		dishId: string;
		ingredientId: string;
		quantity: number;
		unit: string;
	}> = [];
	for (const d of data.dishes) {
		for (const di of d.ingredients) {
			dishIngredients.push({
				id: `di_${d.id}_${di.ingredientId}`,
				dishId: d.id,
				ingredientId: di.ingredientId,
				quantity: di.quantity,
				unit: di.unit,
			});
		}
	}
	for (const di of dishIngredients) {
		await prisma.dishIngredient.upsert({
			where: { id: di.id },
			create: di,
			update: di,
		});
	}

	// 8. InventoryItems (seed has no id; generate deterministic)
	for (const item of data.inventoryItems) {
		const id = `inv_${item.householdId}_${item.ingredientId}`;
		await prisma.inventoryItem.upsert({
			where: { id },
			create: {
				id,
				householdId: item.householdId,
				ingredientId: item.ingredientId,
				quantity: item.quantity,
				unit: item.unit,
			},
			update: {
				householdId: item.householdId,
				ingredientId: item.ingredientId,
				quantity: item.quantity,
				unit: item.unit,
			},
		});
	}

	// Verify counts
	const counts = {
		Household: await prisma.household.count(),
		Users: await prisma.user.count(),
		Accounts: await prisma.account.count(),
		MealTemplates: await prisma.mealTemplate.count(),
		MealComponents: await prisma.mealComponent.count(),
		Ingredients: await prisma.ingredient.count(),
		Dishes: await prisma.dish.count(),
		DishIngredients: await prisma.dishIngredient.count(),
		InventoryItems: await prisma.inventoryItem.count(),
	};

	console.log("\n=== Seed Counts ===");
	for (const [k, v] of Object.entries(counts)) {
		console.log(`${k}: ${v}`);
	}
	console.log("===================\n");

	const expected = {
		Household: 1,
		Users: 4,
		Accounts: 4,
		MealTemplates: 3,
		MealComponents: 10,
		Ingredients: allIngredients.length,
		Dishes: 40,
		DishIngredients: dishIngredients.length,
		InventoryItems: 40,
	};

	let ok = true;
	for (const [k, v] of Object.entries(expected)) {
		if (counts[k as keyof typeof counts] !== v) {
			console.error(
				`MISMATCH: ${k} expected ${v}, got ${counts[k as keyof typeof counts]}`,
			);
			ok = false;
		}
	}

	if (ok) {
		console.log("All counts match expected values.");
	} else {
		throw new Error("Seed count verification failed.");
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
