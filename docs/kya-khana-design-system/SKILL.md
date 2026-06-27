---
name: kya-khana-design
description: Use this skill to generate well-branded interfaces and assets for Kya Khana (क्या खाना), a meal-planning PWA for shared Indian households — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Where things live
- `readme.md` — full design guide: product context, content voice, visual foundations, iconography, manifest.
- `styles.css` — single CSS entry point (link this); `@import`s `tokens/*.css` (colors, type, spacing, fonts, base).
- `components/` — React primitives (Button, Badge, DietBadge, Icon, Countdown, ComboOption, MealCard, AppHeader, BottomNav, QtyStepper, InventoryRow). Each has a `.prompt.md` with usage.
- `ui_kits/app/` — interactive 3-tab PWA recreation (Dashboard, Inventory, More) + sample data.
- `assets/` — `logo-mark.svg`.
- `guidelines/*.card.html` — foundation specimens.

## Brand in one breath
Warm Indian-kitchen palette (turmeric-orange `#E65100` primary, masala brick secondary, herb green / chili red on cream `#FBF5EC`). Plus Jakarta Sans display + numerics, Be Vietnam Pro UI, Noto Sans Devanagari for Hindi. Generous rounding (22px cards), soft warm-tinted shadows, the signature magnet-snap motion. Bilingual Hindi+English copy; emoji only for diet/food semantics. Mobile-first, 390px.
