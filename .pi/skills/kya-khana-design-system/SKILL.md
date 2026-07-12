---
name: kya-khana-design-system
description: Enforces the Kya Khana design system for all .tsx/.css/.ts edits under apps/web/src/. Device-flexible PWA with a 390px canonical phone design, phone/tablet breakpoints, and a 1024px desktop shell cap. Colors, spacing, shadows, fonts, touch targets, safe areas, and component specs must match the DS exactly. Never invent new values.
---

# Kya Khana — Design System Adherence Skill

> **TRIGGER**: Any edit to a `.tsx`/`.css`/`.ts` file under `apps/web/src/` MUST follow this skill.
> The design system is the SINGLE SOURCE OF TRUTH for all visual decisions.
> Every component, color, spacing, and shadow value comes from this document.
> **THIS IS A DEVICE-FLEXIBLE PWA.** Design mobile-first from the 390px canonical phone screen, then layer phone, tablet, and desktop-shell behavior using the DS breakpoints below.
> NEVER invent new values. COPY from the DS screens and guidelines.

---

## 1. Design Tokens (verbatim from DS — no deviations)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#FBF5EC` | **Background canvas** (NOT #FFF8F1) |
| `--card` | `#FFFFFF` | Card surface |
| `--accent` | `#E65100` | Primary action, eyebrows, section heads, active tab |
| `--accent-soft` | `#FFF1E3` | Selected pill bg, avatar bg, combo-selected bg |
| `--timer` | `#D84315` | Countdown text + pill bg (#FDEAE0) |
| `--veg` | `#2E7D32` | Vegetarian badge color |
| `--veg-bg` | `#E9F4EA` | Vegetarian badge background |
| `--nonveg` | `#C62828` | Non-vegetarian badge color |
| `--nonveg-bg` | `#FCEBEB` | Non-vegetarian badge background |
| `--ink` | `#2A211B` | Primary text (warm brown-black, never #000) |
| `--muted` | `#8C8076` | Secondary/muted text |
| `--faint` | `#B6ABA0` | Tertiary/placeholder text |
| `--line` | `#EDE3D6` | Borders, dividers (warm, never grey) |
| `--radius-card` | `22px` | Outer card radius |
| `--radius-inner` | `16px` | Inner card radius (combos, list items) |
| `--whatsapp` | `#1FAF54` | WhatsApp share button green |

### Shadows (always warm brown tint, NEVER grey)

| Shadow | Value |
|--------|-------|
| Card (`shadow-card`) | `0 4px 14px rgba(53,40,28,0.06)` |
| Active meal (`shadow-snap`) | `0 14px 34px rgba(230,81,0,0.16)` |
| Bottom nav (`shadow-nav`) | `0 -3px 18px rgba(53,40,28,0.07)` |
| Date button | `0 2px 7px rgba(53,40,28,0.06)` |

### Fonts

- **Plus Jakarta Sans** — display: wordmark, card titles, headings, tabular numbers (weight 700-800)
- **Be Vietnam Pro** — body: copy, labels, inputs (weight 400-700)
- **Noto Sans Devanagari** — Hindi text alongside English

---

## 2. Layout Constants (verbatim)

| Element | Value |
|---------|-------|
| Canonical phone design width | `390px` |
| Largest phone width | `440px` |
| Tablet / desktop shell max width | `1024px` |
| Status bar height | `46px` |
| Header height | `62px` (NOT 56px) |
| Bottom nav height | `78px` (with padding) |
| Default gutter | `16px` |
| Spacing grid | `4px` |
| Card gap in feed | `16px` |
| Header background | `linear-gradient(to bottom, var(--bg) 72%, rgba(251,245,236,0))` — NO backdrop-blur |
| Active card border | `#F6D9BE` |
| Decided card background | `#FAF4EB` |

---

## 2a. Device-Flexible Layout Constraints (HARD RULES — no exceptions)

Kya Khana is a **device-flexible PWA**. The canonical DS screen remains
**390×844px**, but the app must now support:

1. viewport responsiveness as the browser resizes;
2. a device-detected phone layer for real/emulated phones; and
3. tablet/desktop shells capped at the largest tablet width.

### Breakpoint Ladder

Use these viewport widths. Do not invent new breakpoints.

| Name | Width | Purpose |
| ---- | ----: | ------- |
| `phone-xs` | `320px` | Very small phones / legacy devices |
| `phone-sm` | `360px` | Galaxy S8+, Galaxy S5-ish |
| `phone-md` | `375px` | iPhone SE, iPhone 6/7/8 |
| `phone-lg` | `390px` | Canonical DS phone width |
| `phone-xl` | `412px` | Pixel and Samsung large phones |
| `phone-2xl` | `430px` | iPhone Pro Max sizes |
| `phone-3xl` | `440px` | Largest current phone preset |
| `tablet-sm` | `768px` | iPad Mini / small tablet |
| `tablet-md` | `820px` | iPad Air / medium tablet |
| `tablet-lg` | `1024px` | iPad Pro / desktop shell cap |

### Root App Shell

Every page/layout MUST be wrapped in the app shell. The shell starts
mobile-first and is capped at `1024px` on tablet, desktop, and wide monitors.

```css
.app-shell {
  width: 100%;
  max-width: 1024px;
  min-height: 100dvh;
  margin-inline: auto;
}

@media (min-width: 1024px) {
  body {
    min-height: 100dvh;
    display: grid;
    place-items: center;
    padding-block: 32px;
  }
}
```

- Use **`100dvh` / `min-h-dvh`** for full-height containers — never `100vh`.
- Desktop and wide monitors MUST NOT expand content beyond `1024px`.
- Desktop and wide monitors SHOULD center the shell with vertical breathing room.
- Tablet layouts may use the `768px`, `820px`, and `1024px` breakpoints.
- Phone layouts must still be designed and QA'd first at `390px`.

### Device-Detected Phone Layer

Viewport CSS answers: **how wide is the viewport?**

The device layer answers: **is this a phone-like browser/device?**

On reload, the app may add global markers such as:

```html
<html data-device="phone" data-os="ios" data-display-mode="browser">
```

The phone layer MUST be based on UA/client hints + touch capability + phone
viewport. Recommended baseline:

```ts
const isPhoneDevice =
  /iPhone|Android|Mobile/i.test(navigator.userAgent) &&
  navigator.maxTouchPoints > 0 &&
  window.innerWidth <= 480;
```

Use this layer only for phone-specific polish such as safe areas, fixed bottom
navigation, keyboard-aware forms, and PWA standalone adjustments. Do not use it
as a replacement for viewport breakpoints.

### Touch Targets (minimum 44×44px)

- Every tappable element (buttons, links, icons, toggle items, chips) MUST have
  a **minimum touch area of 44×44px**.
- If a visual element is smaller, add invisible padding or wrap it in a larger
  tap area.
- This requirement applies on all breakpoints because touch laptops and tablets
  exist.

### Active, Hover, and Pointer States

- `:active` / `active:` press feedback is required for tappable controls.
- Hover may be added only as a desktop/tablet enhancement and must never be the
  only visible affordance.
- Phone-specific UI must not rely on hover.
- `cursor: pointer` is allowed only for desktop/tablet affordance, not as a
  substitute for clear touch states.

### Safe Area Insets (Notch / Island / Home Indicator)

- Bottom-pinned phone elements MUST account for the home indicator:

  ```css
  padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  ```

- Top-pinned phone elements MUST account for the notch/island:

  ```css
  padding-top: calc(0px + env(safe-area-inset-top, 0px));
  ```

- Use `env(safe-area-inset-*, 0px)` with a `0px` fallback.
- Safe-area rules should be scoped to `[data-device="phone"]` when they would
  add unwanted desktop/tablet spacing.

### No Horizontal Scroll

- Main content must not create page-level horizontal scroll at any breakpoint.
- Phone layouts are single-column by default.
- Tablet layouts may introduce two-column sections only when every column keeps
  the DS spacing, touch target, and card rules.
- Desktop/wide layouts must remain inside the `1024px` shell.

### Text Size Floor

- **No body text below 11px.** Labels, captions, and badges can go to 10px
  minimum.
- The existing diet pills at 8.5px are the ONLY permitted exception
  (DS-defined).
- All new text must be readable at the `390px` canonical phone width.

### Scroll Containers

- Scrollable areas MUST use:

  ```css
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  ```

- Hide scrollbars on scrollable feeds: `scrollbar-width: none` / `.no-scrollbar`.
- Scroll snap on the dashboard feed: `scroll-snap-type: y proximity`.

---

## 3. Component Specifications (match these EXACTLY)

### AppHeader

```
height: 62px
display: flex; align-items: center; justify-content: space-between
padding: 0 18px
background: linear-gradient(to bottom, #FBF5EC 72%, rgba(251,245,236,0))
z-index: 30

Wordmark: font(Plus Jakarta Sans, 800, 21px, letter-spacing: -0.03em, color: #E65100)
  dash inside wordmark: color #B6ABA0, weight 600

Date button: display inline-flex, bg white, border 1px solid #EDE3D6, rounded-full
  padding 8px 12px 8px 11px, shadow 0 2px 7px rgba(53,40,28,0.06)
  font(Plus Jakarta Sans, 700, 14px), gap 7px
  contains: 📅 Calendar icon (Lucide) + "Today" label + ▼ chevron
```

### BottomNav

```
height: 78px, display: flex, padding: 8px 14px 16px
background: #fff, border-top: 1px solid #EDE3D6
box-shadow: 0 -3px 18px rgba(53,40,28,0.07)

Nav items: flex:1, column, center, gap 3px
  Icons: Lucide 24x24, 2px stroke, round caps
  Labels: font(Plus Jakarta Sans, 700, 11px)
  Inactive: color #B6ABA0
  Active: color #E65100
  Active icon container: width 56px, height 34px, rounded-full, bg #FFF1E3
```

### MealCard — Active

```
Wrapper: class="card active"
  Card: bg white, border 1px solid #EDE3D6, rounded 22px
  Active: box-shadow 0 14px 34px rgba(230,81,0,0.16), border-color #F6D9BE

Top section (padding 16px 16px 12px):
  Eyebrow: font(Plus Jakarta Sans, 10.5px, 700, letter-spacing: 0.1em, uppercase, color #E65100)
  Title: font(Plus Jakarta Sans, 21px, 800, letter-spacing: -0.02em, line-height 1.05)
  Hindi subtitle: font(Plus Jakarta Sans, 600, 15px, color #B6ABA0, margin-left 6px)
  Timer pill (right): bg #FDEAE0, color #D84315, rounded-full, padding 7px 11px
    font(Plus Jakarta Sans, 800, 13px), gap 5px
    Contains: pulse dot (7px, rounded, bg #D84315, animation pulse 1.6s ease-in-out infinite)

Combos section:
  Grid: 1fr 1fr, gap 10px, padding 0 14px 14px
  Combo column: bg #FFFDFB, border 1.5px solid #EDE3D6, rounded 16px, padding 11px 11px 12px
    Selected: border-color #E65100, bg #FFF1E3
  Combo head: between, margin-bottom 9px
    Tag: font(Plus Jakarta Sans, 10px, 800, letter-spacing 0.08em, color #8C8076)
    Selected tag: color #E65100
    Votes: gap 4px, font(Plus Jakarta Sans, 700, 11px, color #8C8076)
  Dishes: column, gap 7px, flex:1
    Dish row: flex, gap 7px, font-size 13px, font-weight 500, line-height 1.2
    Emoji: 14px, width 17px, center, flex-shrink 0
  Diet pills:
    Veg: bg #E9F4EA, color #2E7D32, font(Plus Jakarta Sans, 8.5px, 800, uppercase)
    NonVeg: bg #FCEBEB, color #C62828
  Veg note: margin-top 9px, padding 7px 8px, bg #E9F4EA, border 1px dashed #A6CFA8, rounded 11px
    font-size 11px, color #2E7D32
  Vote button: margin-top 11px, full width, rounded 12px, padding 11px 0
    font(Plus Jakarta Sans, 700, 14px), gap 6px, center
    Default: bg #FBEFE3, color #E65100
    Selected: bg #E65100, color white
    Active: transform scale(0.96)
```

### MealCard — Locked

```
Wrapper: opacity 0.62
  Eyebrow: color #8C8076 (muted, not accent)
  Lock badge: bg #EFE7DB, color #8C8076, rounded-full, padding 5px 9px
    font(Plus Jakarta Sans, 700, 11px), gap 5px, contains: 🔒 icon + "Locked"
  Preview: padding 0 16px 12px
    Label: font(Plus Jakarta Sans, 10.5px, 700, uppercase, color #B6ABA0)
    Dishes: font-size 13px, color #8C8076
  Locked btn: margin 0 16px 14px, bg #F0E8DC, color #B6ABA0
    font(Plus Jakarta Sans, 700, 13px), rounded 12px, padding 10px
```

### MealCard — Decided (Past)

```
Wrapper: bg #FAF4EB
  Top: padding 14px 16px 8px, between
    Title: color #8C8076 (muted)
  Done badge: bg #E9F4EA, color #2E7D32, rounded-full, padding 5px 9px
    font(Plus Jakarta Sans, 800, 11px), gap 5px, contains: ✅ + "Done"
  Result: padding 0 16px 16px
    Label: font(Plus Jakarta Sans, 10.5px, 700, uppercase, color #B6ABA0)
    Chips: flex wrap, gap 6px
      Chip: bg white, border 1px solid #EDE3D6, rounded 10px, padding 6px 9px
        font-size 12.5px, font-weight 500, color #2A211B
```

### Inventory — Toggle Bar

```
Wrapper: padding 4px 16px 12px
Toggle: flex, gap 4px, padding 4px, bg #F2E9DB, border 1px solid #EDE3D6, rounded-full
Button: flex:1, rounded-full, padding 10px 12px, gap 6px
  font(Plus Jakarta Sans, 700, 14px)
  Inactive: color #8C8076, bg transparent
  Active: bg #E65100, color white, shadow 0 4px 12px color-mix(in oklab, #E65100 30%, transparent)
  Count badge (grocery): font-size 11px, weight 800, bg #C62828, color white, rounded-full, padding 1px 7px
```

### More Screen

```
Profile card: bg white, border 1px solid, rounded 22px, shadow 0 4px 14px rgba(53,40,28,0.06)
  padding 16px. flex, gap 13px
  Avatar: 54px, rounded-full, bg #FFF1E3, color #E65100
    font(Plus Jakarta Sans, 800, 19px), border 1.5px dashed color-mix(in oklab, #E65100 45%, white)
  Name: font(Plus Jakarta Sans, 800, 17px, letter-spacing -0.01em)
  Meta: font-size 12px, color #8C8076, margin-top 3px
  Role badge: font(Plus Jakarta Sans, 10px, 800, uppercase), bg #FFF1E3, color #E65100, rounded-full, padding 5px 10px

Menu items: bg white, border, rounded 22px, shadow 0 3px 10px rgba(53,40,28,0.05)
  padding 14px 16px, gap 13px, flex, cursor pointer
  Icon: Lucide 22x22, color #8C8076
  Title: font-size 15px, font-weight 600
  Subtitle: font-size 12px, color #8C8076
  Chevron: color #B6ABA0, margin-left auto

Logout: color #C62828, margin-top 12px, font-weight 600
```

---

## 4. Missing Screens Fallback

When a page has **no corresponding DS screen HTML** (e.g., welcome, login, signup, forgot-password):

1. Read the **closest existing DS screen** and derive layout rhythm, surface styling, and spacing patterns from it:
   - **Dashboard.html** → card layouts, feed spacing, eyebrow/title patterns
   - **More.html** → form inputs, profile cards, menu items, centered auth patterns
   - **Inventory.html** → toggle bars, list rows, bottom-aligned actions
2. Apply the exact **token table values** for colors, fonts, shadows, borders.
3. **STOP and ask the user a specific question** if anything is unclear: layout structure, spacing between elements, illustration/container size, form field arrangement, or any component shape not covered by existing screens.
4. **Never default to** generic white backgrounds, system fonts, grey shadows, or untailored spacing.

## 5. Pre-Editing Checklist

Before editing ANY UI file, confirm:

- [ ] Read the relevant DS screen HTML file (Dashboard.html, Inventory.html, More.html)
- [ ] If no screen exists, read the **closest existing screen** and state which patterns will be derived from it
- [ ] Colors come from the token table above (no ad-hoc hex values)
- [ ] Shadows are warm brown, never grey/black
- [ ] Font weights match DS (Plus Jakarta Sans 700-800 for headings, Be Vietnam Pro 400-600 for body)
- [ ] Border is always warm `#EDE3D6`
- [ ] Spacing uses 4px grid
- [ ] No cool-grey anywhere — warm taupe only
- [ ] **LAYOUT: app shell uses `w-full max-w-[1024px] mx-auto min-h-dvh`**
- [ ] **LAYOUT: desktop/wide screens center the shell and never exceed `1024px`**
- [ ] **BREAKPOINTS: use only the DS phone/tablet ladder above**
- [ ] **PHONE: canonical layout works at `390px` and largest phone at `440px`**
- [ ] **PHONE: device-specific polish is scoped to `[data-device="phone"]`**
- [ ] **TOUCH: every tappable element has ≥ 44×44px touch area**
- [ ] **TOUCH: interactive feedback includes `active:` / press states**
- [ ] **SAFE AREA: phone bottom-fixed elements include `safe-area-inset-bottom`**
- [ ] **SAFE AREA: phone top-fixed elements include `safe-area-inset-top`**
- [ ] **SCROLL: no page-level horizontal scroll at any breakpoint**
- [ ] **TYPE: body text ≥ 11px (diet pills at 8.5px are the only exception)**
- [ ] If uncertain about layout or spacing for a missing screen — **ask the user before writing code**

---

## 6. Post-Editing Validation

After editing UI, verify:

- `pnpm turbo run typecheck` passes
- `pnpm turbo run build --filter=@kya-khana/web` passes
- Visual matches the DS screen HTML files
- For missing screens: every value traces back to either (a) an existing screen's pattern or (b) the token table
- **LAYOUT: no content expands beyond the `1024px` shell on desktop/wide screens**
- **BREAKPOINTS: responsive classes/media queries match the DS breakpoint ladder**
- **PHONE: `[data-device="phone"]` behavior is additive to viewport responsiveness**
- **PHONE: safe-area behavior works for iOS-style phone presets**
- **TOUCH: no tappable target is below 44×44px**
- **VIEWPORT: no `100vh` used — must be `100dvh` or `min-h-dvh`**
