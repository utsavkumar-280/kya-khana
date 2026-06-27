// Kya Khana — sample data for the app UI kit (North Indian meals)
// Plain global module: window.KK_DATA

window.KK_DATA = {
  // Dashboard feed, ordered past → future (rendered bottom = past, top = future)
  meals: [
    {
      id: 'y-dinner', meal: 'Yesterday Dinner', hindi: 'रात का खाना', when: 'Yesterday · Evening',
      day: 'Yesterday', state: 'decided',
      combos: [
        { letter: 'A', diet: 'veg', votes: 3, winner: true, items: [
          { emoji: '🫓', name: 'Roti', hindi: 'रोटी' },
          { emoji: '🧀', name: 'Paneer Butter Masala', diet: 'veg' },
          { emoji: '🫘', name: 'Dal Makhani' },
          { emoji: '🥗', name: 'Boondi Raita' } ] },
        { letter: 'B', diet: 'nonveg', votes: 1, vegVariant: 'Aloo Gobi instead of Egg Curry', items: [
          { emoji: '🍚', name: 'Jeera Rice' },
          { emoji: '🍳', name: 'Egg Curry', diet: 'nonveg' },
          { emoji: '🥗', name: 'Green Salad' } ] },
      ],
    },
    {
      id: 't-breakfast', meal: 'Breakfast', hindi: 'नाश्ता', when: 'Today · Morning',
      day: 'Today', state: 'decided',
      combos: [
        { letter: 'A', diet: 'veg', votes: 2, winner: true, items: [
          { emoji: '🥔', name: 'Aloo Paratha', hindi: 'आलू पराठा' },
          { emoji: '🥭', name: 'Curd & Mango Pickle' } ] },
        { letter: 'B', diet: 'veg', votes: 1, items: [
          { emoji: '🍚', name: 'Poha', hindi: 'पोहा' },
          { emoji: '🍋', name: 'Sev & Lemon' } ] },
      ],
    },
    {
      id: 't-lunch', meal: "Today's Lunch", hindi: 'दोपहर का खाना', when: 'Today · Afternoon',
      day: 'Today', state: 'decided',
      combos: [
        { letter: 'A', diet: 'veg', votes: 1, items: [
          { emoji: '🍚', name: 'Jeera Rice' },
          { emoji: '🫘', name: 'Rajma', diet: 'veg' },
          { emoji: '🧅', name: 'Onion Salad' } ] },
        { letter: 'B', diet: 'veg', votes: 3, winner: true, items: [
          { emoji: '🫓', name: 'Roti' },
          { emoji: '🥬', name: 'Bhindi Masala', diet: 'veg' },
          { emoji: '🫘', name: 'Dal Tadka' },
          { emoji: '🥛', name: 'Papad & Curd' } ] },
      ],
    },
    {
      id: 't-dinner', meal: "Tonight's Dinner", hindi: 'रात का खाना', when: 'Today · Evening',
      day: 'Today', state: 'active', closesInSec: 8049, // ~2h14m
      combos: [
        { letter: 'A', diet: 'veg', votes: 2, items: [
          { emoji: '🫓', name: 'Roti', hindi: 'रोटी' },
          { emoji: '🧀', name: 'Paneer Butter Masala', diet: 'veg' },
          { emoji: '🫘', name: 'Dal Tadka' },
          { emoji: '🥗', name: 'Boondi Raita' } ] },
        { letter: 'B', diet: 'nonveg', votes: 1, vegVariant: 'Aloo Gobi instead of Chicken Curry', items: [
          { emoji: '🍚', name: 'Jeera Rice' },
          { emoji: '🍗', name: 'Chicken Curry', diet: 'nonveg' },
          { emoji: '🥗', name: 'Green Salad' } ] },
      ],
    },
    {
      id: 'tm-breakfast', meal: 'Tomorrow Breakfast', hindi: 'नाश्ता', when: 'Tomorrow · Morning',
      day: 'Tomorrow', state: 'locked', opensInSec: 36120,
      combos: [
        { letter: 'A', diet: 'veg', votes: 0, items: [
          { emoji: '🥔', name: 'Stuffed Paratha' },
          { emoji: '🥛', name: 'Curd & Pickle' } ] },
        { letter: 'B', diet: 'veg', votes: 0, items: [
          { emoji: '🍲', name: 'Upma', hindi: 'उपमा' },
          { emoji: '🥥', name: 'Coconut Chutney' } ] },
      ],
    },
    {
      id: 'tm-lunch', meal: 'Tomorrow Lunch', hindi: 'दोपहर का खाना', when: 'Tomorrow · Afternoon',
      day: 'Tomorrow', state: 'locked', opensInSec: 64800,
      combos: [
        { letter: 'A', diet: 'veg', votes: 0, items: [
          { emoji: '🍚', name: 'Rice' },
          { emoji: '🥘', name: 'Kadhi Pakora', diet: 'veg' },
          { emoji: '🥗', name: 'Salad' } ] },
        { letter: 'B', diet: 'nonveg', votes: 0, vegVariant: 'Chana Masala instead of Fish Curry', items: [
          { emoji: '🍚', name: 'Steamed Rice' },
          { emoji: '🐟', name: 'Fish Curry', diet: 'nonveg' },
          { emoji: '🥗', name: 'Kachumber' } ] },
      ],
    },
  ],

  stock: [
    // Vegetables
    { category: 'Vegetables', name: 'Onion', hindi: 'प्याज़', emoji: '🧅', qty: 4, unit: ' pcs' },
    { category: 'Vegetables', name: 'Tomato', hindi: 'टमाटर', emoji: '🍅', qty: 6, unit: ' pcs' },
    { category: 'Vegetables', name: 'Potato', hindi: 'आलू', emoji: '🥔', qty: 8, unit: ' pcs' },
    { category: 'Vegetables', name: 'Spinach (Palak)', hindi: 'पालक', emoji: '🥬', qty: 200, unit: 'g' },
    { category: 'Vegetables', name: 'Capsicum', hindi: 'शिमला मिर्च', emoji: '🫑', qty: 3, unit: ' pcs' },
    { category: 'Vegetables', name: 'Garlic', hindi: 'लहसुन', emoji: '🧄', qty: 10, unit: ' cloves' },
    // Dairy
    { category: 'Dairy', name: 'Paneer', hindi: 'पनीर', emoji: '🧀', qty: 400, unit: 'g' },
    { category: 'Dairy', name: 'Curd (Yogurt)', hindi: 'दही', emoji: '🥛', qty: 500, unit: 'g' },
    { category: 'Dairy', name: 'Butter', hindi: 'मक्खन', emoji: '🧈', qty: 200, unit: 'g' },
    // Grains & Flours
    { category: 'Grains & Flours', name: 'Wheat Flour (Atta)', hindi: 'आटा', emoji: '🌾', qty: 2, unit: 'kg' },
    { category: 'Grains & Flours', name: 'Basmati Rice', hindi: 'चावल', emoji: '🍚', qty: 1.5, unit: 'kg' },
    // Lentils
    { category: 'Lentils', name: 'Toor Dal', hindi: 'तूर दाल', emoji: '🫘', qty: 500, unit: 'g' },
    { category: 'Lentils', name: 'Moong Dal', hindi: 'मूंग दाल', emoji: '🫘', qty: 300, unit: 'g' },
  ],

  // Auto-generated from decided meals; grouped by the meal that needs them.
  grocery: [
    { forMeal: "Tonight's Dinner", name: 'Chicken', hindi: 'चिकन', emoji: '🍗', need: 300, have: 0, unit: 'g' },
    { forMeal: "Tonight's Dinner", name: 'Fresh Cream', hindi: 'क्रीम', emoji: '🥛', need: 50, have: 0, unit: 'ml' },
    { forMeal: "Tonight's Dinner", name: 'Ginger', hindi: 'अदरक', emoji: '🫚', need: 15, have: 0, unit: 'g' },
    { forMeal: "Tonight's Dinner", name: 'Onion', hindi: 'प्याज़', emoji: '🧅', need: 2, have: 4, unit: ' pcs' },
    { forMeal: "Tonight's Dinner", name: 'Tomato', hindi: 'टमाटर', emoji: '🍅', need: 4, have: 6, unit: ' pcs' },
    { forMeal: 'Tomorrow Breakfast', name: 'Eggs', hindi: 'अंडे', emoji: '🥚', need: 6, have: 0, unit: ' pcs' },
    { forMeal: 'Tomorrow Breakfast', name: 'Bread', hindi: 'ब्रेड', emoji: '🍞', need: 1, have: 0, unit: ' pack' },
    { forMeal: 'Tomorrow Breakfast', name: 'Onion', hindi: 'प्याज़', emoji: '🧅', need: 1, have: 4, unit: ' pcs' },
  ],

  recipes: [
    { name: 'Paneer Butter Masala', hindi: 'पनीर बटर मसाला', mins: 35, serves: 4,
      steps: ['Sauté onion–tomato masala until oil separates', 'Add cream, butter & kasuri methi', 'Fold in paneer cubes, simmer 5 min'] },
    { name: 'Dal Tadka', hindi: 'दाल तड़का', mins: 25, serves: 4,
      steps: ['Pressure-cook toor dal with turmeric', 'Prepare ghee tadka: cumin, garlic, red chili', 'Pour over dal, garnish coriander'] },
  ],

  notifications: [
    { icon: '🔔', title: 'Voting opens for Tonight\u2019s Dinner', time: '10:00 AM', unread: true },
    { icon: '🛒', title: 'Grocery list updated — 3 items short', time: '6:02 AM', unread: true },
    { icon: '✅', title: 'Lunch decided: Roti + Bhindi Masala', time: 'Yesterday', unread: false },
  ],
};
