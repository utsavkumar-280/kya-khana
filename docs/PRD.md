# PRD: Kya Khana (क्या खाना)

> **Status**: Draft v7 — 3-tab app architecture + veg-variant recommendation + scroll mechanics added ✅
> **Last updated**: 2026-06-11

---

## 1. Problem Statement

In a shared household with 3–4 housemates and one cook, two daily decisions keep recurring with friction:

1. **What to eat** — disagreement, last-minute chaos, no structured decision process
2. **What groceries are needed** — ingredients are missing when the cook arrives, ad-hoc store runs

Kya Khana solves both by:
- Suggesting **complete meal combos** built from user-defined food components
- Letting housemates vote on which combo to have
- Auto-computing the grocery gap between all chosen dishes and current inventory
- Producing a shareable grocery list — all before the cook arrives

---

## 2. Core Workflow

### 2.1 Key Time Concepts

Every meal has three derived times, calculated from user-configured **cooking-meal times** (set during onboarding):

| Concept | Formula | Morning (default 8:00 AM) | Evening (default 7:30 PM) |
|---------|---------|---------------------------|---------------------------|
| **Cooking-meal time** | User sets | 8:00 AM | 7:30 PM |
| **Ordering deadline** | Cook time − 2 hours | 6:00 AM | 5:30 PM |
| **Suggestion time** | Cook time + 2 hours | 10:00 AM | 9:30 PM |

> **Why cook time + 2 hours?** The suggestion for future meals fires right after the current meal's cooking wraps up. This is not "planning after cooking" — it's continuously looking forward. The 8 AM meal was already decided the previous night at 9:30 PM.

### 2.2 Progressive Meal Stacking

Users are **not forced** to lock in all revealed meals at once. They decide how many to commit to, and the next suggestion window fills the gaps.

**10:00 AM suggestion** (after morning cook): Reveals **up to 3 future meals**:
- Today PM
- Tomorrow AM
- Tomorrow PM

**9:30 PM suggestion** (after evening cook): Fills the gaps. Only shows **undecided meals**:

| Decided at 10 AM | 9:30 PM behaviour |
|---|---|
| All 3 meals decided + groceries ordered | Gentle reminder: "Tomorrow's meals are set: Paneer for AM, Dal for PM" |
| 2 meals decided | Show the **1 remaining** meal to decide |
| 1 meal decided | Show the **2 remaining** meals to decide |
| 0 meals decided | Show **2 meals** (tomorrow AM + PM) |

### 2.3 Voting & Deadlines

- All revealed meals are voted on **simultaneously** — users see all visible meal slots with 2 dish suggestions each
- Each meal has its **own independent voting deadline** = that meal's ordering time
- Cook does **not** vote
- Users can change their vote anytime before the deadline
- **Default (no votes by deadline)**: Dish with the highest inventory-availability score wins automatically
- **Tie-breaker**: Inventory-aware comparison → housemates manually break

### 2.4 Full Day Timeline Example

```
9:30 PM (prev day) ──────────────────────────────────────────────┐
  ├─ Suggestion time: 2 meals revealed (Today AM, Today PM)       │
  ├─ Users vote during night / early morning                      │
  │                                                               │
6:00 AM                                                            │
  ├─ Today AM ordering deadline → voting closes                   │
  ├─ Grocery list generated for today AM                          │
  ├─ Ordering window: 6:00–8:00 AM                                │
  │                                                               │
8:00 AM ─ Cook arrives, prepares breakfast + lunch              │
  │                                                               │
10:00 AM                                                           │
  ├─ Suggestion time: 3 meals revealed                            │
  │   (Today PM, Tomorrow AM, Tomorrow PM)                        │
  ├─ Users vote throughout the day                                │
  │                                                               │
  ├─ [If no interaction by 11 AM] → 1st notification             │
  ├─ [11:30 AM] → 2nd notification                               │
  ├─ [11:45 AM] → 3rd notification                               │
  ├─ [5:25 PM] → final notification (5 min before deadline)      │
  │                                                               │
5:30 PM                                                            │
  ├─ Today PM ordering deadline → voting closes                   │
  ├─ Combined grocery list refreshed                               │
  ├─ Ordering window: 5:30–7:30 PM                                │
  │                                                               │
7:30 PM ─ Cook arrives, prepares dinner                         │
  │                                                               │
9:30 PM                                                            │
  ├─ Suggestion time: gap-fill remaining meals                    │
  │   (Tomorrow AM and/or PM — only undecided ones)               │
  ├─ If all meals already decided → gentle reminder only          │
  │                                                               │
  └─ Cycle repeats ───────────────────────────────────────────────┘
```

### 2.5 Notification Escalation

If no user interacts with the app after a suggestion time, notifications escalate in frequency:

```
Suggestion time (T)
  │
T+1:00  ── 1st push: "Time to vote! 3 meals need your pick"
T+1:30  ── 2nd push (30min gap)
T+1:45  ── 3rd push (15min gap)
  ...
T+N-5min ── Final push: "5 minutes left to order for tonight's meal!"
  │
Ordering deadline
```

- Notifications stop once a user interacts (opens app / casts vote)
- If all meals are already decided → no escalation, just a single gentle reminder at suggestion time

---

## 3. App Architecture: 3-Tab Layout

Kya Khana uses a **3-tab bottom navigation** pattern, keeping the app simple and action-focused:

| Tab | Screen | Purpose |
|-----|--------|---------|
| 🏠 **Dashboard** | Today + upcoming meals + voting + meal history | The main action screen. Everything a housemate needs daily. |
| 📦 **Inventory** | Ingredient stock + grocery list | Manage what's in the kitchen. Grocery list auto-generated from decided meals. |
| ⚙️ **More** | Settings + cook view + notifications + profile | Low-frequency actions and configuration. |

### 3.1 Dashboard: Scroll = Time Navigation

The dashboard is an infinite vertical timeline with "Today" as the default anchor point. **Swipe finger upward** (push content up) to reveal future meals rising from below. **Swipe finger downward** (pull content down) to reveal past meals scrolling back from above.

```
         SWIPE UP (push content up → future meals rise from below)
         ┌─────────────────────────────┐
         │  Tomorrow              [📅]  │  ← calendar header updates
         │  ┌─────────────────────────┐ │
         │  │ Tomorrow Breakfast 🔒    │ │  ← greyed out (future, locked)
         │  └─────────────────────────┘ │
         │  ┌─────────────────────────┐ │
         │  │ Tomorrow Lunch 🔒        │ │
         │  └─────────────────────────┘ │
    ┌────┼─────────────────────────────┼────┐  ← SNAP POINT
    │    │  Today                        │    │
    │    │  ┌─────────────────────────┐ │    │
    │    │  │ Tonight's Dinner 🟢      │ │    │  ← ACTIVE (voting open)
    │    │  │   Combo A  vs  Combo B  │ │    │
    │    │  │   ⏰ 3h 12m left         │ │    │
    │    │  └─────────────────────────┘ │    │
    │    └─────────────────────────────┘    │
    │                                       │
    │    SWIPE DOWN (pull content down → past meals scroll from above)               │
    │    ┌─────────────────────────────┐    │
    │    │  Yesterday                    │    │  ← calendar header updates
    │    │  ┌─────────────────────────┐ │    │
    │    │  │ Morning Meal ✅           │ │    │  ← decided/cooked (result only)
    │    │  └─────────────────────────┘ │    │
    │    │  ┌─────────────────────────┐ │    │
    │    │  │ Evening Meal ✅           │ │    │
    │    │  └─────────────────────────┘ │    │
         └─────────────────────────────┘
```

**Scroll Mechanics:**

| Behavior | Detail |
|----------|--------|
| **Snap** | Each meal card magnet-snaps to the top position as the user scrolls past it. The calendar header updates to match the snapped date. |
| **Calendar dropdown** | A 📅 icon in the header provides quick-jump to any past/future date. Selecting a date auto-scrolls the dashboard to that day's snap point. |
| **Active meals** | Full color, live countdown timer, vote buttons enabled, 2 combo choices visible. |
| **Locked meals (future)** | Greyed out. Preview visible but vote buttons disabled until their voting window opens. |
| **Past meals** | Show only the decided result (winning combo), not the voting options. Marked with ✅ checkmark. |

### 3.2 Inventory Tab

Split into two views via a toggle at the top:

- **Stock view**: Ingredient list with current quantities, add/update items
- **Grocery list view**: Auto-generated from decided meals, shows required vs available quantities, shareable via WhatsApp

### 3.3 More Tab

Consolidates low-frequency actions:

- 👨‍🍳 Cook View — today's recipes, video refs, "Mark as Cooked" button
- 🔔 Notifications — in-app notification history
- 📋 Meal Templates — edit component structure
- 🕐 Cook Times — configure morning/evening cook times
- 👤 Profile / Logout

---

## 4. Scope & Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Scale** | Single household now; multi-tenant-ready later | Tenant-id from day one, but no org/signup flow yet |
| **Platform** | Mobile-first PWA | Single Next.js codebase, installable, push-capable |
| **Grocery ordering** | Shareable link/export | No delivery API integration; user orders manually |
| **Dish database** | Pre-seeded library | User-contributed dishes planned for v2 |
| **Notifications** | Web Push API (PWA) | Works on mobile; no native app needed |

---

## 5. User Roles

| Role | Permissions |
|------|-------------|
| **Housemate** | Vote on meal suggestions, view grocery list, view inventory, break ties |
| **Cook** | View decided dish, full recipe with video references, step-by-step instructions, mark meal as cooked. Cook does **not** vote. |
| **Admin (v2)** | Manage dish library, manage users, configure meal schedule |

> **Decision**: Cook is a full app user but does not participate in voting. Cook's role is to see what to cook, how to cook it, and notify everyone when it's ready.

---

## 6. Feature Breakdown

### 6.1 Meal Templates & Components (Core Concept)

Instead of suggesting standalone dishes, the app suggests **complete meal combos** built from user-defined food components. This makes the app cuisine-agnostic — it adapts to any food culture.

**What is a Meal Template?**

A template defines what a "complete meal" looks like for a household. It consists of ordered **components** (food categories), each of which pulls from a pool of dishes.

**Example: North Indian Dinner Template**

| Order | Component | Required? | Example Dishes |
|-------|-----------|-----------|----------------|
| 1 | Carb | ✅ Yes | Roti, Jeera Rice, Naan, Paratha |
| 2 | Sabji / Protein | ✅ Yes | Paneer Butter Masala, Chicken Curry, Aloo Gobi |
| 3 | Dal / Pulses | ❌ Optional | Dal Tadka, Dal Makhani, Chana Masala |
| 4 | Curd / Salad | ✅ Yes | Boondi Raita, Plain Curd, Green Salad |

**A suggested meal combo** is one dish from each required component (and optionally optional ones):

```
Combo #1: Roti + Paneer Butter Masala + Dal Makhani + Boondi Raita
Combo #2: Jeera Rice + Chicken Curry + (skip dal) + Green Salad
```

**Morning = Two Templates**: Since morning covers both breakfast and lunch:
- **Breakfast template**: e.g., Carb + Protein + Chutney/Sambar
- **Lunch template**: e.g., Carb + Sabji + Dal + Curd/Salad

**During onboarding**, users either:
- Pick a **pre-built cuisine template** (Indian, South Indian, etc.)
- Or build their own by defining components
- For v1: pre-built templates with ability to customize

### 6.2 Dish Library (v1: pre-seeded)

- Collection of ~30–50 dishes, organized by component
- Each dish belongs to one **component** (carb, sabji, dal, curd, etc.)
- Each dish has:
  - Name (English + Hindi/regional)
  - **Component**: which food component it belongs to (e.g., `carb`, `sabji`, `dal`)
  - `mealSubType`: `breakfast`, `lunch`, `dinner`, or `any` — determines which template's meal slot it can appear in
  - List of ingredients with quantities (per dish)
  - `recipeSteps`: JSON array of brief step descriptions (2-3 lines each)
  - `videoReferences`: JSON array of YouTube/other URLs
  - Image (optional, placeholder)
  - Tags: vegetarian/non-vegetarian, spice level, prep time
- **No CRUD UI in v1** — managed via seed script / database

### 6.3 Grocery Inventory

- Manual inventory of available ingredients
- Each inventory item:
  - Ingredient name
  - Quantity on hand
  - Unit (kg, g, L, mL, pieces, etc.)
  - Category (vegetables, dairy, spices, grains, etc.)
  - Last updated timestamp
- **Update triggers**:
  - Manual: user marks item as depleted or adjusts quantity
  - Auto-deduction proposal: when a meal is marked "cooked", the app proposes deductions → user reviews, adjusts, and confirms

### 6.4 Meal Suggestions & Progressive Stacking

- **10:00 AM** (after morning cook): Reveals **up to 3 future meals** — today PM, tomorrow AM, tomorrow PM
- **9:30 PM** (after evening cook): Fills gaps — only shows **undecided meals**
- Each meal slot gets **2 complete combos** suggested (not 2 standalone dishes)
- **Suggestion algorithm** ✅:
  1. Get the relevant meal template(s) for the meal slot
  2. For each component in the template: filter dishes by `mealSubType` + rotation + inventory score
  3. Build 2 combos using weighted random picks from each component
  4. Combos should be distinct — prefer different dishes across combos where possible
- Users choose **how many meals to lock in**
- Evening suggestion respects prior decisions, fills only gaps

#### 6.4.1 Veg/Non-Veg Variant Recommendation

When a meal combo contains a non-vegetarian sabji/protein component:

- The app **automatically generates a veg-variant note** displayed below that combo
- The veg variant replaces ONLY the non-veg sabji with a vegetarian alternative — all other components (carb, dal, salad) remain identical
- The veg variant is **informational only** — users vote on Combo A or Combo B, not on the variant
- If the non-veg combo wins the vote, the cook prepares **both** the non-veg sabji AND the veg sabji
- This ensures vegetarian housemates always have a sabji to eat regardless of which combo wins
- **Breakfast combos are exempt** from this rule (breakfast dishes are predominantly vegetarian)
- The veg variant note is visible to **all users**, not just those with veg preferences

Example card structure:

```
┌────────────────────────────────────────────────────┐
│  Tonight's Dinner                        ⏰ 3h 12m  │
│                                                    │
│  Combo A                            Combo B        │
│  ┌────────────────────────┐  ┌──────────────────┐  │
│  │ 🍚 Jeera Rice           │  │ 🫓 Wheat Roti     │  │
│  │ 🍗 Butter Chicken      │  │ 🌿 Palak Paneer   │  │
│  │ 🫘 Dal Tadka            │  │ 🫘 Dal Makhani    │  │
│  │ 🥗 Green Salad          │  │ 🥒 Boondi Raita   │  │
│  │                         │  └──────────────────┘  │
│  │ 🌿 Veg option:          │                        │
│  │   Paneer Butter Masala  │                        │
│  └────────────────────────┘                        │
│  [ Vote A ]                            [ Vote B ]  │
│  🟢 2 votes                             🍗 1 vote  │
└────────────────────────────────────────────────────┘
```

### 6.5 Voting

- Users vote on **complete meal combos**, not individual dishes
- 2 combos per meal slot → user picks their preferred combo
- Cook does **not** vote
- Each meal's voting closes at its **own ordering deadline**:
  - Morning meal: **6:00 AM**
  - Evening meal: **5:30 PM**
- Users can change their vote anytime before that meal's deadline
- **Default (no votes)**: Combo with the highest combined inventory-availability score wins
- **Tie-breaker** ✅: Inventory comparison across both combos → housemates manually break

### 6.6 Notification Escalation

Triggered when no user interacts with the app after a suggestion time. Escalating frequency:

```
Suggestion time (T)
  → T+1:00   : 1st notification
  → T+1:30   : 2nd (30 min gap)
  → T+1:45   : 3rd (15 min gap)
  → T+...    : continues shortening gaps
  → Deadline−5min : final notification
```

- Notifications stop on first user interaction (app open / vote cast)
- If all meals are already decided at suggestion time → single gentle reminder, no escalation

### 6.7 Combined Grocery List

- Sums ingredients from **all dishes in the winning combo**
- Generated/refreshed at each meal's ordering deadline (6 AM, 5:30 PM)
- For meals still in voting: uses current leading suggestion as placeholder
- Calculation: sum(decided dish ingredients) − current inventory = shopping list
- **Auto-deduction with manual override** ✅:
  - When meal is marked "cooked", app proposes deduction list
  - User reviews, adjusts, confirms → inventory updated
- Shareable via: WhatsApp link, copy-to-clipboard, plain text export

### 6.8 Push Notifications (All Types)

- **"Time to vote!"** — at suggestion time (10 AM, 9:30 PM). Shows revealed meals.
- **Escalation cascade** — if no interaction: 1h → 30min → 15min → ... → 5min before deadline (see 5.5)
- **"Meal decided"** — when a voting deadline passes. Shows winning dish.
- **"Grocery list ready"** — combined list generated/updated. Shareable.
- **"Food is ready!"** — cook marks meal as cooked → all housemates notified.
- **"Gentle reminder"** — at 9:30 PM if all meals already decided. Just a summary.
- **"Low inventory"** — staple ingredient below threshold.
- In-app notification history

### 6.9 Meal History

- Log of all past meals: date, meal type, chosen dish, who voted for what
- Used by suggestion algorithm to avoid repetition

### 6.10 Cook's Dashboard

- Cook logs in → sees the **current meal board**:
  - Which dish is decided for the upcoming cook time
  - Full recipe: brief step-by-step instructions + video reference URLs
  - Grocery status: all ingredients available?
- **"Mark as Cooked"** button:
  - Confirms meal prepared → triggers auto-deduction review flow (see 5.6)
  - Sends "Food is ready!" push to all housemates
- Cook can also view past meals and their recipes for reference

### 6.11 Onboarding Flow (v1)

- New user signs up → sets:
  - Name, email, password
  - Role: housemate or cook
  - **Morning cooking-meal time** (default: 8:00 AM)
  - **Evening cooking-meal time** (default: 7:30 PM)
  - **Meal templates** — pick from pre-built or customize:
    - Select cuisine style (e.g., "North Indian")
    - System pre-fills breakfast, lunch, and dinner templates
    - User can add/remove/reorder components
    - Each component: name, required/optional, example dishes
- System derives all times automatically

---

## 7. Data Model (Draft v7)

```mermaid
erDiagram
    User {
        id string PK
        name string
        email string
        role enum "housemate | cook | admin"
        householdId string FK
    }

    Household {
        id string PK
        name string
        cuisinePreference string
    }

    MealTemplate {
        id string PK
        householdId string FK
        name string
        mealSubType enum "breakfast | lunch | dinner"
        isActive boolean
    }

    MealComponent {
        id string PK
        mealTemplateId string FK
        name string
        isRequired boolean
        displayOrder int
        minSelections int
        maxSelections int
    }

    Dish {
        id string PK
        name string
        componentId string FK
        mealSubType enum "breakfast | lunch | dinner | any"
        isVegetarian boolean
        prepTimeMin int
        recipeSteps json
        videoReferences json
        imageUrl string nullable
    }

    Ingredient {
        id string PK
        name string
        defaultUnit string
        category string
    }

    DishIngredient {
        id string PK
        dishId string FK
        ingredientId string FK
        quantity float
        unit string
    }

    InventoryItem {
        id string PK
        householdId string FK
        ingredientId string FK
        quantity float
        unit string
        updatedAt datetime
    }

    MealCycle {
        id string PK
        householdId string FK
        date date
        mealType enum "morning | evening"
        mealSubType enum "breakfast | lunch | dinner"
        mealTemplateId string FK
        cookTime time
        orderingDeadline time
        suggestionTime time
        revealedAt datetime nullable
        status enum "pending | voting | decided | cooked"
        winningComboId string FK nullable
        decidedBy enum "votes | tie_break | default" nullable
    }

    MealWindow {
        id string PK
        householdId string FK
        revealedAt datetime
        suggestionType enum "morning_10am | evening_930pm"
        status enum "active | closed"
    }

    MealWindowItem {
        id string PK
        mealWindowId string FK
        mealCycleId string FK
        displayOrder int
    }

    MealCombo {
        id string PK
        mealCycleId string FK
        displayOrder int
    }

    MealComboItem {
        id string PK
        mealComboId string FK
        mealComponentId string FK
        dishId string FK
    }

    Vote {
        id string PK
        mealCycleId string FK
        userId string FK
        mealComboId string FK
        createdAt datetime
    }

    GroceryList {
        id string PK
        mealWindowId string FK
        householdId string FK
        status enum "pending | shared | ordered | fulfilled"
        createdAt datetime
    }

    GroceryListItem {
        id string PK
        groceryListId string FK
        ingredientId string FK
        requiredQuantity float
        availableQuantity float
        shortfall float
        unit string
    }

    User ||--o{ Household : "belongs to"
    Household ||--o{ MealTemplate : "defines"
    Household ||--o{ InventoryItem : "has"
    Household ||--o{ MealCycle : "has"
    Household ||--o{ MealWindow : "has"
    MealTemplate ||--o{ MealComponent : "contains"
    MealComponent ||--o{ Dish : "categorizes"
    Dish ||--o{ DishIngredient : "requires"
    Ingredient ||--o{ DishIngredient : "used in"
    Ingredient ||--o{ InventoryItem : "tracked by"
    MealCycle ||--o{ MealCombo : "has"
    MealCombo ||--o{ MealComboItem : "contains"
    MealComponent ||--o{ MealComboItem : "fulfilled by"
    MealCycle ||--o{ Vote : "receives"
    User ||--o{ Vote : "casts"
    MealCombo ||--o{ Vote : "voted on"
    MealWindow ||--o{ MealWindowItem : "contains"
    MealCycle ||--o{ MealWindowItem : "appears in"
    MealWindow ||--o{ GroceryList : "has"
    GroceryList ||--o{ GroceryListItem : "contains"
```

---

## 8. Tech Stack (Finalized)

| Layer | Choice | Why |
|-------|--------|-----|
| **Backend Runtime** | Node.js 24 LTS + Fastify | Battle-tested, every library works, 114K req/s, massive ecosystem |
| **Frontend** | Next.js 15 (App Router) | PWA support, SSR where needed, React ecosystem |
| **Language** | TypeScript (strict) | End-to-end type safety |
| **Database** | PostgreSQL + Prisma ORM | Relational, mature, great DX |
| **Auth** | Better Auth | TypeScript-native, self-hosted, works across PWA + iOS + Android, free |
| **Push Notifications** | Web Push API + `web-push` lib | Free, browser-native, no third party. FCM/APNs added later for native apps |
| **PWA** | Serwist (SW) + manual manifest | Modern Workbox 7 wrapper, full cache control |
| **Styling** | Tailwind CSS + shadcn/ui | Fast, responsive, mobile-first |
| **State Mgmt** | TanStack Query (React Query) | Server state caching, optimistic updates |
| **Scheduling** | BullMQ + Redis (or `node-cron` for v1) | Reliable job queues for suggestions & notifications |
| **Monorepo** | Turborepo | Shared packages, parallel builds, type sharing |
| **Hosting** | Vercel (web) + Railway/Render (API) | Zero-config frontend, simple Node hosting for backend |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Turborepo Monorepo                │
│                                                      │
│  ┌──────────────────┐    ┌─────────────────────────┐│
│  │   apps/web/       │    │   apps/api/              ││
│  │   Next.js PWA     │───▶│   Fastify + Better Auth  ││
│  │   (port 3000)     │    │   (port 4000)            ││
│  │   - Pages/UI      │    │   - REST endpoints       ││
│  │   - SW + Push     │    │   - Cron jobs            ││
│  │   - TanStack Query│    │   - web-push             ││
│  └──────────────────┘    └───────────┬─────────────┘│
│                                      │                │
│  ┌──────────────────────────────────┼────────────────│
│  │  packages/                        │                │
│  │  ┌──────────┐  ┌──────────────┐  │                │
│  │  │ core/     │  │ db/          │◀─┘                │
│  │  │ - meals   │  │ - Prisma     │                   │
│  │  │ - voting  │  │ - Migrations │                   │
│  │  │ - grocery │  │ - Seed       │                   │
│  │  │ - push    │  └──────────────┘                   │
│  │  └──────────┘                                      │
│  │  ┌──────────┐                                      │
│  │  │ types/    │  Shared TS interfaces               │
│  │  └──────────┘                                      │
│  └────────────────────────────────────────────────────│
└─────────────────────────────────────────────────────┘

  Future: apps/ios/  ──▶  apps/api/  ◀──  apps/android/
  (Swift)                  (Fastify)       (Kotlin)
```

---

## 9. Resolved Questions ✅

### Q1: Suggestion Algorithm — **Hybrid Rotation + Inventory-Aware**
Rotate through dishes avoiding recent repeats, score by ingredient availability, add randomness.

### Q2: Tie-Breaker — **Inventory-Aware Comparison + Manual Break**
App shows which tied dish is easier to make with current inventory; housemates decide.

### Q3: Inventory Auto-Deduction — **Semi-Automated with Manual Override**
App proposes deductions when meal is cooked; user reviews and adjusts before confirming.

### Q4: Meal Types — **Morning = Breakfast+Lunch, Evening = Dinner**
8 AM cook prepares light breakfast + lunch. 7:30 PM cook prepares dinner. Dish pool tagged by `mealType`.

### Q5: Recipe Content — **Brief Steps + Video References**
`recipeSteps`: JSON array of 2-3 line steps. `videoReferences`: JSON array of YouTube/URLs.

### Q6: Cook as App User — **Yes, Full User, No Voting**
Cook logs in to see recipes, video refs, and mark meals as cooked. Cook does not vote.

### Q7: Meal Stacking — **Progressive Gap-Filling**
10 AM reveals 3 meals; 9:30 PM fills only undecided gaps. Users choose how many to lock in. Evening suggestion respects prior decisions.

### Q8: Voting Deadlines — **Per-Meal at Ordering Time**
Each meal closes at its own deadline (6 AM for morning, 5:30 PM for evening). Default = highest inventory score.

### Q9: Notifications — **Escalating Cascade**
1h after suggestion → 30min → 15min → shortening gaps → 5min before ordering deadline. Stops on first user interaction.

### Q10: Cooking-Meal Times — **User-Configured at Onboarding**
Defaults: 8 AM & 7:30 PM. Suggestion time = cook + 2h. Ordering deadline = cook − 2h. All derived automatically.

### Q16: Veg/Non-Veg Recommendation — Informational Veg Variant Note
When a combo has a non-veg sabji, show a veg-variant note below that combo. Users vote A or B only — the variant is informational. If non-veg combo wins, cook makes both veg and non-veg sabji. Breakfast exempt.

### Q11: Meal Composition — **Composable Templates with Components**
Meals are built from user-defined components (Carb, Sabji, Dal, Curd, etc.). Each component maps to a pool of dishes. Suggestions are complete combos. Voting is on the full combo. Cuisine-agnostic.

### Q12: Backend Architecture — **Standalone Fastify Server from Day One**
Separate backend required because v2 adds iOS + Android apps consuming the same API. Monorepo with shared packages. API is the single source of truth, not the PWA.

### Q13: Auth Solution — **Better Auth (Self-Hosted)**
TypeScript-native, multi-tenant ready, works across PWA + native apps via standard REST endpoints. Free, open source. No vendor lock-in.

### Q14: Push Notifications — **Web Push API Directly**
`web-push` npm library for v1 (PWA only). Self-hosted, free. Will add APNs (iOS) + FCM (Android) later when native apps launch.

### Q15: Backend Runtime — **Node.js 24 LTS + Fastify**
Most mature ecosystem, best library compatibility, 114K+ req/s with Fastify. Bun considered for future dev tooling (faster CI).

---

## 10. Out of Scope (v1)

- User-contributed dishes (add/edit/delete UI)
- Delivery service integration
- Multi-household signup flow
- Nutritional/calorie tracking
- Budget/cost tracking for groceries
- Cook assignment (multiple cooks)
- Dish ratings / feedback
- Image uploads for dishes
- i18n / multi-language (Hindi UI)
- Admin dashboard
- Recipe video upload (video references are URLs only in v1)

---

## 11. Success Metrics (v1)

- [ ] 100% of meal cycles have a decided dish before the cook arrives
- [ ] Grocery list generated within 5 minutes of vote conclusion
- [ ] All housemates can vote within the 30-minute window
- [ ] Push notifications reliably delivered to all devices
