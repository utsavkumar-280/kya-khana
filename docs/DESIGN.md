# Kya Khana (क्या खाना)

A meal-planning PWA for shared Indian households with 3-4 housemates and one cook.

## Purpose

Decide what to eat and what groceries to buy — before the cook arrives.

## Core Workflow

- **10 AM** — System reveals up to 3 future meals (today PM, tomorrow AM, tomorrow PM)
- **9:30 PM** — Gap-fill: only undecided meals
- **6 AM & 5:30 PM** — Voting deadlines, grocery lists generated

## App Structure: 3-Tab Bottom Navigation

Three evenly-spaced tabs with icons and labels, always visible:

```
[📦 Inventory]  [🏠 Dashboard]  [⚙️ More]
```

Active tab: pill-shaped highlight in warm amber. Inactive: muted with icon + label.

### Common Header (All Screens)

- **Left**: "kya-khana" wordmark logo — small refined logotype, warm orange (#E65100), Plus Jakarta Sans
- **Right**: Date-picker dropdown button — 📅 calendar icon + contextual date label ("Today" / "Yesterday" / "Tomorrow" / DD/MM/YY) + ▼ chevron that rotates 180° when calendar opens/closes. Tapping opens a floating calendar popover.

### Common Design Tokens

| Token | Value |
|-------|-------|
| **Width** | 390px (mobile-first) |
| **Headline font** | Plus Jakarta Sans |
| **Body font** | Be Vietnam Pro |
| **Primary color** | #E65100 (warm amber/orange) |
| **Veg badge** | #2E7D32 green 🌿 |
| **Non-veg badge** | #C62828 red 🍗 |
| **Timer accent** | #D84315 (red-orange) |
| **Background** | Warm cream (#FFF8F1) |
| **Card surface** | White (#FFFFFF), rounded-xl, soft shadows |
| **Locked overlay** | Grey at 60% opacity |
| **Rating direction** | Warm, appetizing, earthy tones — food-app feel, not corporate |

---

## Screen 1: Dashboard

### Layout

The dashboard is an infinite vertical timeline. "Today" is the default anchor point.

- **Swipe finger upward** (push content up) → Tomorrow's meal cards rise from below into view. Keep swiping for further future days.
- **Swipe finger downward** (pull content down) → Yesterday's meal cards scroll back from above into view. Keep swiping for further past days.
- **Calendar dropdown (📅)** in header for quick-jump to any date — auto-scrolls the timeline to that day.

Each meal card **magnet-snaps** to the top of the screen as it crosses the snap threshold. The header date label smoothly transitions to match the snapped day.

### Active Meal Card (Today, in voting window)

Prominent full-color card. Represents ONE meal (e.g., "Tonight's Dinner").

**Card header**: Meal type label ("Tonight's Dinner") + live countdown "⏰ 3h 12m left" in timer-accent (#D84315), bold.

**Two combo choices** in side-by-side split layout:

**Combo A (left):**
- 🍚 Jeera Rice
- 🍗 Butter Chicken (red non-veg badge)
- 🫘 Dal Tadka
- 🥗 Green Salad
- Below: small green note "🌿 Veg: Paneer Butter Masala"
- [Vote A] button
- "🟢 2 votes" indicator

**Combo B (right):**
- 🫓 Wheat Roti (Phulka)
- 🌿 Palak Paneer (green veg badge)
- 🫘 Dal Makhani
- 🥒 Boondi Raita
- [Vote B] button
- "🍗 1 vote" indicator

### Locked Meals (Future, greyed out)

Below the active card, smaller muted cards. Grey overlay at 60% opacity.

| Card | Faint Preview |
|------|--------------|
| "Tomorrow Breakfast 🔒" | Masala Omelette + Bread Toast |
| "Tomorrow Lunch 🔒" | Bajra Roti + Baingan Bharta + Moong Dal + Cucumber Raita |

Both show: disabled vote buttons, padlock icon 🔒.

### Decided Meals (Past, scrolled to)

When swiped down to "Yesterday":

| Card | Shows |
|------|-------|
| "Yesterday Morning ✅" | Idli + Sambar + Coconut Chutney (result only, no voting) |
| "Yesterday Evening ✅" | Wheat Roti + Chicken Curry + Dal Tadka + Green Salad (result only) |

Muted appearance with ✅ checkmark. No vote buttons. Shows only the winning result.

### Meal Card Rules

- **Veg/Non-Veg variant note**: If a combo contains non-veg sabji, show a small green veg-alternative note below that combo. Informational only — users still vote A or B. If non-veg combo wins, cook prepares BOTH sabjis. Breakfast meals exempt.
- **Vote counts**: Shown per combo with emoji indicators.

---

## Screen 2: Inventory & Grocery List

### Toggle Bar

Two tabs at top: **[Stock]** **[Grocery List]** — active tab highlighted in warm amber.

### Stock View (Default Tab)

Categorized ingredient list grouped by category, each item shows name + quantity + unit. Tappable rows to edit.

**Vegetables:**
| Item | Quantity |
|------|----------|
| 🧅 Onion | 4 pieces |
| 🍅 Tomato | 6 pieces |
| 🥔 Potato | 8 pieces |
| 🥬 Spinach (Palak) | 200g |
| 🫑 Capsicum | 3 pieces |
| 🧄 Garlic | 10 cloves |

**Dairy:**
| Item | Quantity |
|------|----------|
| 🧀 Paneer | 400g |
| 🥛 Curd (Yogurt) | 500g |
| 🧈 Butter | 200g |

**Grains & Flours:**
| Item | Quantity |
|------|----------|
| 🌾 Wheat Flour (Atta) | 2kg |
| 🍚 Basmati Rice | 1.5kg |

**Lentils:**
| Item | Quantity |
|------|----------|
| 🫘 Toor Dal | 500g |
| 🫘 Moong Dal | 300g |

[+ Add Item] button at bottom with warm-neutral bordered input fields.

### Grocery List View

Auto-generated from decided meals. Shows what's needed for upcoming cook sessions.

**Visual indicators:**
- ⬜ Need to buy — highlighted row with soft red tint left border
- ✅ Already in stock — strikethrough, greyed out

**"For Tonight's Dinner":**
| Status | Item | Quantity |
|--------|------|----------|
| ⬜ | Chicken | 300g |
| ⬜ | Fresh Cream | 50ml |
| ✅ | Onion | 0 (in stock) |
| ✅ | Tomato | 0 (in stock) |
| ⬜ | Ginger | 15g |

**"For Tomorrow Breakfast":**
| Status | Item | Quantity |
|--------|------|----------|
| ⬜ | Eggs | 6 pieces |
| ✅ | Onion | 0 (in stock) |
| ⬜ | Bread | 1 pack |

[📤 Share via WhatsApp] button at bottom — prominent green WhatsApp-style.

---

## Screen 3: Settings & More

Clean vertical list of menu items. Each item: icon + title + subtitle, tappable row with chevron →, on rounded white card surfaces with subtle shadow.

| Icon | Title | Subtitle |
|------|-------|----------|
| 👨‍🍳 | Cook View | Today's recipes and cook instructions |
| 🔔 | Notifications | Vote reminders, food ready alerts (unread badge: 2 — small orange dot) |
| 📋 | Meal Templates | Edit breakfast, lunch, dinner components |
| 🕐 | Cook Times | Morning: 8:00 AM · Evening: 7:30 PM |
| 👤 | Profile | Housemate 1 (role badge) |

**🚪 Logout** — red text, separated below the main list with extra spacing.

Logged-in user info shown at top with profile avatar placeholder.

---

## Meal Templates (North Indian Cuisine)

Each meal is built from food components:

| Component | Examples | Required? |
|-----------|----------|-----------|
| Carb | Roti, Jeera Rice, Naan, Paratha | Always |
| Sabji/Protein | Paneer Butter Masala, Chicken Curry, Aloo Gobi, Butter Chicken, Palak Paneer, Baingan Bharta | Always |
| Dal/Pulses | Dal Tadka, Dal Makhani, Moong Dal | Optional |
| Curd/Salad/Sides | Boondi Raita, Green Salad, Papad, Pickle, Cucumber Raita | Always |

Morning = Breakfast (e.g., Masala Omelette + Bread Toast, Idli + Sambar + Coconut Chutney) + Lunch (Carb + Sabji + Dal + Salad). Evening = Dinner (1 template).

---

## User Roles

- **Housemate** — Vote on meals, view grocery list, manage inventory
- **Cook** — View decided dishes with recipes, mark as cooked (does NOT vote)

---

## Screen Flow

1. User opens app → lands on **Dashboard** (Today's view, snapped to center)
2. Active meal card at top with countdown → user votes A or B
3. Swipe finger downward (pull content down) → past days scroll in from above (decided meals with ✅)
4. Swipe finger upward (push content up) → future days rise from below (greyed out, locked meals 🔒)
5. Calendar 📅 dropdown → quick-jump to any date, timeline auto-scrolls to match
6. Tab to **Inventory** → check stock, view grocery list
7. Tab to **More** → cook view, settings, notifications

## Design Direction

- **Mobile-first** PWA, 390px wide
- **Warm, appetizing feel** — food app, not corporate. Earthy tones, warm oranges/ambers.
- **Clean and minimal** — the food is the focus, not the UI chrome
- **Clear hierarchy** — active meal is prominent, upcoming is subdued, past is muted
- **Veg/Non-veg badges** — green 🌿 (#2E7D32) for vegetarian, red 🍗 (#C62828) for non-vegetarian
- **Deadline timers** — prominent countdown on active cards (#D84315)
- **Snap effect** — smooth, satisfying magnet snap as cards lock to the top
- **Bottom nav** — 3 icons, always visible, current tab highlighted (pill-shaped)
- **Hindi + English** dish names where appropriate
