# Kya Khana — App UI Kit

A high-fidelity, interactive recreation of the Kya Khana meal-planning PWA (390px mobile, 3-tab bottom navigation). Built entirely from the design-system component primitives.

## Run
Open `index.html`. It renders inside a phone frame and is fully click-through.

## Screens
- **Dashboard.jsx** — the main screen. Owns its header (wordmark + date pill that opens a top-right day-jump popover). Scroll = time navigation; meal cards magnet-snap to the top and the date pill updates to the snapped day. Active meal shows a live countdown pill + two votable combo columns; past meals are decided ("What we ate" chips); future meals are locked (collapsed preview + "voting opens soon").
- **Inventory.jsx** — Stock ↔ Grocery List segmented toggle (orange-filled, with a short-count pill). Stock rows have editable quantity steppers; grocery rows show a "Need to buy" / "In stock" tag with a buy checkbox and a WhatsApp share action.
- **More.jsx** — profile card + separated menu cards (Cook View, Notifications, Meal Templates, Cook Times, Profile) and a red logout card.

## Composition
Screens compose DS components via `window.KyaKhanaDesignSystem_6941ec`:
`AppHeader`, `MealCard`, `ComboOption`, `Countdown`, `BottomNav`, `InventoryRow`, `QtyStepper`, `Button`, `Badge`, `DietBadge`, `Icon`. Sample North-Indian meal/inventory data lives in `data.js`. The phone status bar lives in `index.html` (device chrome, not a DS concern).

> These are cosmetic recreations for prototyping — no real backend, voting, or persistence.
