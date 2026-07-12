# Kya Khana — Design System

### क्या खाना · "What to eat?"

A warm, appetizing design system for **Kya Khana**, a meal-planning PWA for shared Indian households (3–4 housemates and one cook). The app decides *what to eat* and *what groceries to buy* before the cook arrives — through timed voting windows on North-Indian meal combos.

> **Sources:** This system was authored from the product brief only — no codebase, Figma, or existing brand assets were provided. The logo, palette, type pairing, and components are original to this system. If a real codebase or Figma exists, re-attach it and this can be reconciled against it.

---

## Product context

- **Device-flexible PWA.** Canonical phone design is `390px`; phones scale up to `440px`, while tablet/desktop shells cap at `1024px`. Three-tab bottom navigation: **Dashboard · Inventory · More**.
- **Dashboard** is the heart: a vertical feed of *meal cards* where **scroll = time navigation** (up = future, down = past). Cards magnet-snap to the top and the calendar header tracks the snapped day.
- Each meal card holds **two combos (A / B)**, each a list of components: Carb · Sabji/Protein · Dal (optional) · Curd/Salad/Sides. Households **vote A or B** inside a live window.
- Three card states: **Active** (full color, countdown, voting), **Locked** (greyed preview, opens-in countdown), **Decided** (past, shows only the winning combo with ✅).
- **Veg/Non-veg** matters: non-veg combos (except breakfast) show a veg-variant note; if a non-veg combo wins the cook makes both.
- **Inventory**: Stock (editable quantities) and an auto-generated Grocery List (need-vs-have, WhatsApp-shareable).
- **More**: Cook View (recipes + steps, Mark as Cooked), notifications, meal templates, cook times, profile.

---

## Content fundamentals

**Voice — a warm, practical housemate.** Short, friendly, second-person, never corporate. The app is a helpful flatmate, not a brand.

- **Casing:** Sentence case everywhere except the wordmark and short eyebrow labels (`TODAY · EVENING`). Buttons are Title-ish but conversational: "Vote Combo A", "Mark as Cooked", "Share on WhatsApp".
- **Person:** Address the household as **you / we** ("Choose tonight's dinner", "what we're eating"). Decisions are collective.
- **Hindi + English bilingual.** English leads for UI; Devanagari rides alongside dish and screen names as a warm, muted accent — `Breakfast नाश्ता`, `Paneer Butter Masala`, `Inventory भंडार`. Never force-translate UI chrome; Hindi is flavor, not a second column.
- **Time & urgency are concrete.** "Voting closes in 02:14:09", "Arrives 5:30 PM", "3 items short". Countdowns over vague words.
- **Emoji are semantic, not decoration.** Diet & votes use a small fixed set: 🌿 veg note, 🍗 non-veg, 🟢 veg vote, ✅ decided. Food rows may carry a single ingredient emoji (🧅 🍅 🧀). Never sprinkle emoji into body copy.
- **Tone examples:** "↑ Scroll up for upcoming meals · down for history ↓" · "Preview only — voting hasn't opened yet." · "The household chose Combo A."

---

## Visual foundations

**Mood:** an Indian kitchen at golden hour — turmeric, saffron, brick, fresh herbs, on warm cream. Appetizing and tactile; the food is the hero and the UI chrome stays quiet.

- **Color.** A deep turmeric-orange `#E65100` is the primary action — it also carries eyebrows, section heads and the active tab (one warm orange throughout). **Masala brick** `#B23A2E` is a secondary brand accent (themes, alt voting). **Herb green** `#2E7D32` and **chili red** `#C62828` carry veg/non-veg and success/danger. Neutrals are **warm and taupe-grey tinted** (cream `#FBF5EC` canvas, brown-black `#2A211B` ink) — never cool grey. State semantics: active = orange, locked = muted neutral + desaturation, decided = green. A dedicated `--timer` `#D84315` drives the live countdown.
- **Type.** Two families plus a Hindi face: **Plus Jakarta Sans** (geometric display — wordmark, card titles, hero numbers, *and* tabular numerics via `font-variant-numeric`), **Be Vietnam Pro** (warm, legible UI/body), and **Noto Sans Devanagari** for the क्या खाना wordmark and Hindi dish names. The system no longer ships a monospace; numbers use Plus Jakarta Sans with tabular figures.
- **Backgrounds.** Flat warm cream — *no* gradients, no photographic hero washes, no busy patterns. Depth comes from soft elevation, not color noise. Imagery (when present) reads warm and appetizing.
- **Corners & cards.** Generously rounded — controls `14px`, inner cards / combos `16px`, meal cards & sheets `22px`, pills fully round. Cards are white surfaces with a hairline `--border` and a **soft warm-tinted shadow** (brown, never grey). The active/snapped meal card gets an orange-tinted glow (`--shadow-snap`).
- **Borders.** Hairline `1px` warm neutral by default; `1.5px` for selected/emphasis. Selected combos shift border + fill to saffron; winners to green.
- **Elevation system.** `xs → sm → md → lg` warm shadows; `--shadow-snap` for the magnet-snapped card; `--shadow-nav` lifts the bottom bar. The header uses translucent cream + `blur(12px)` (the only place blur is used).
- **Motion.** Purposeful and physical. The signature is the **magnet snap** (`--ease-snap`, a slight overshoot) as cards lock to the top. Buttons **press-scale to 0.97**. Sheets fade + rise. Countdowns tick and **shift color** saffron → chili as deadlines approach. No infinite/decorative loops; respect reduced-motion.
- **Hover/press.** Touch-first, so press states dominate: scale-down on buttons, fill/tint change on toggles & checkboxes. Hover (where present) darkens the saffron one step.
- **Layout.** Mobile-first app shell with `390px` as the canonical phone reference. The shell supports phone breakpoints through `440px`, tablet breakpoints at `768px`, `820px`, and `1024px`, and desktop/wide centering capped at `1024px`. Sticky translucent header (56px) at top, fixed 3-tab nav (64px) at bottom, scrolling content between. Default gutter 16px. 4px spacing grid throughout.
- **Device-detected phone layer.** On reload, UA/client hints + touch + phone viewport may add `data-device="phone"` for safe-area, fixed-nav, keyboard, and PWA standalone polish. This layer is additive to normal viewport responsiveness.

---

## Iconography

- **UI chrome:** a single line-icon set — **Lucide** geometry (24×24, 2px stroke, round caps/joins), embedded as path data in the `Icon` component so the bundle is self-contained (no CDN dependency). Names: home, package, more, calendar, clock, check, check-circle, plus, minus, chevrons, bell, share, chef-hat, lock, leaf, search, user, x, arrow-up, refresh, utensils. *Substitution flagged: no brand icon set existed, so Lucide is the chosen stand-in — swap if a house set arrives.*
- **Diet & food semantics:** **emoji**, used deliberately. The Indian square-and-dot veg/non-veg mark is drawn by `DietBadge`; votes and notes use 🌿 🍗 🟢 ✅; ingredient rows carry one food emoji each.
- **No hand-drawn illustration.** The only bespoke vector is the **logo mark** (`assets/logo-mark.svg`) — a thali (plate) holding three katoris (bowls) in green/red/turmeric, echoing the combo choices.
- Unicode arrows (↑ ↓) appear inline in helper copy for the scroll-direction hint.

---

## Index / manifest

**Foundations**

- `styles.css` — root entry; `@import`s everything below (consumers link this one file).
- `tokens/fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `base.css`
- Specimen cards in `guidelines/*.card.html` (Colors, Type, Spacing, Brand).
- `assets/logo-mark.svg` — the thali mark.

**Components** (`components/<group>/`) — namespace `window.KyaKhanaDesignSystem_6941ec`

- `core/` — **Button**, **Badge**, **DietBadge**, **Icon**
- `meal/` — **Countdown**, **ComboOption**, **MealCard**
- `navigation/` — **AppHeader**, **BottomNav**
- `inventory/` — **QtyStepper**, **InventoryRow**

**UI Kit**

- `ui_kits/app/` — interactive 3-tab PWA recreation (Dashboard, Inventory, More). See its `README.md`.

**Other**

- `SKILL.md` — portable Agent-Skill wrapper.
- Generated (do not edit): `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`.

---

## Fonts — substitution note

Plus Jakarta Sans, Be Vietnam Pro, and Noto Sans Devanagari are loaded from **Google Fonts** (`tokens/fonts.css`). These are the intended typefaces, not stand-ins — but they load over the network rather than as bundled `@font-face` binaries. If you need fully-offline/self-hosted fonts, drop the `.woff2` files in `assets/fonts/` and swap the `@import` for local `@font-face` rules.
