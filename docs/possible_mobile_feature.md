# Possible Mobile Feature: Device-Aware Responsive Layer

## Goal

Add two separate responsiveness layers to the app:

1. **Viewport responsiveness**
   - Responds to browser/window size changes.
   - Uses normal CSS/Tailwind breakpoints and media queries.
   - Works when a desktop browser is resized smaller or larger.

2. **Device-detected mobile layer**
   - Activates only when the app detects a phone-like device or phone emulator.
   - Uses signals like mobile user agent, touch support, and small viewport.
   - Adds phone-specific app behavior on top of normal responsive styles.

In short:

```txt
Final UI = viewport breakpoint styles + optional device-detected phone layer
```

---

## Why this exists

Chrome DevTools device presets such as iPhone, Pixel, and Samsung
phones emulate more than just screen size. They can also change:

- User-Agent string
- Touch support
- Device pixel ratio
- Mobile client hints
- Viewport dimensions

A custom Chrome device with the same `390x844` size as an iPhone 12 Pro
may still look like desktop Chrome to the website if it does not emulate
the same mobile signals.

This feature would allow Kya Khana to behave similarly:

| Situation | Viewport CSS | Device layer | Result |
| --- | --- | --- | --- |
| Desktop Chrome resized to 390px | On | Off | Compact responsive layout only |
| iPhone preset | On | On | Compact layout + phone app behavior |
| Pixel/Samsung preset | On | On | Compact layout + phone app behavior |
| Tablet preset | Tablet styles | Usually off | Tablet layout |
| Desktop monitor | Desktop styles | Off | Centered capped app shell |

---

## Suggested viewport breakpoint ladder

Use these as reference widths based on common Chrome DevTools presets.

```ts
const breakpoints = {
  phoneXs: 320,  // very small phones / legacy devices
  phoneSm: 360,  // Galaxy S8+, Galaxy S5-ish
  phoneMd: 375,  // iPhone SE, iPhone 6/7/8
  phoneLg: 390,  // iPhone 12 Pro
  phoneXl: 412,  // Pixel, Samsung Ultra/A51
  phone2xl: 430, // iPhone Pro Max sizes
  phone3xl: 440, // iPhone 16 Pro Max

  tabletSm: 768,  // iPad Mini
  tabletMd: 820,  // iPad Air
  tabletLg: 1024, // iPad Pro / large tablet

  desktop: 1280,
  wide: 1536,
};
```

For practical CSS, keep the commonly-used breakpoints simpler:

```css
/* default: smallest phones */

@media (min-width: 360px) {}
@media (min-width: 375px) {}
@media (min-width: 390px) {}
@media (min-width: 412px) {}
@media (min-width: 430px) {}

/* tablets */
@media (min-width: 768px) {}
@media (min-width: 820px) {}
@media (min-width: 1024px) {}
```

---

## Large monitor behavior

For large desktop and wide monitor screens, keep the app capped at the
largest tablet width and center it.

Recommended behavior:

- App shell remains readable and app-like.
- Max width should not expand endlessly on wide monitors.
- Use vertical padding to center or comfortably position the app.
- The maximum shell width can be based on the largest tablet breakpoint,
  around `1024px`.

Example:

```css
@media (min-width: 1024px) {
  body {
    min-height: 100dvh;
    display: grid;
    place-items: center;
    padding-block: 32px;
  }

  .app-shell {
    width: 100%;
    max-width: 1024px;
    min-height: min(100dvh, 1366px);
  }
}
```

---

## Device-detected layer

The device-detected layer answers:

```txt
What kind of device/browser is this?
```

Viewport responsiveness answers:

```txt
How wide is the viewport?
```

The device layer should not replace normal responsive CSS. It should only
add extra phone-specific behavior when the device qualifies.

Example detection idea:

```ts
const isPhoneDevice =
  /iPhone|Android|Mobile/i.test(navigator.userAgent) &&
  navigator.maxTouchPoints > 0 &&
  window.innerWidth <= 480;
```

Then expose the result globally:

```html
<html data-device="phone">
```

or:

```html
<body class="device-phone">
```

Then styles can combine both systems:

```css
/* viewport responsiveness */
@media (max-width: 440px) {
  .app-shell {
    padding: 16px;
  }
}

/* phone-device-only layer */
[data-device="phone"] .app-shell {
  min-height: 100dvh;
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## Possible phone-specific app behaviors

### 1. App shell mode

Make the whole site feel like a native mobile app.

Behavior:

- Full-height screen using `100dvh`.
- App content fills the phone viewport.
- Avoid desktop-like wide layout on phones.
- On large monitors, still center and cap the shell.

Example:

```css
[data-device="phone"] .app-shell {
  min-height: 100dvh;
}
```

---

### 2. Safe-area padding

Support phones with notches and home indicators.

Behavior:

- Add top padding for notch/status bar where needed.
- Add bottom padding for iPhone home indicator.
- Prevent bottom nav/buttons from sitting too close to screen edges.

Example:

```css
[data-device="phone"] .app-shell {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

### 3. Fixed bottom navigation

Use app-style bottom navigation only on phones.

Behavior:

- Bottom nav sticks to the bottom of the viewport.
- Main content gets extra bottom padding so content is not hidden.
- Desktop/tablet can use a different nav pattern if needed.

Example:

```css
[data-device="phone"] .bottom-nav {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
}
```

---

### 4. Touch-optimized spacing

Make interactions finger-friendly.

Behavior:

- Buttons should be at least `44px` to `48px` tall.
- Icon buttons should have comfortable hit areas.
- Increase spacing between nearby clickable elements.
- Avoid tiny text links or hover-only controls.

---

### 5. Mobile-only sticky header

Use a compact app header on phones.

Behavior:

- Header can stay at the top.
- Shows page title, back button, profile/menu action, etc.
- Hides desktop-style nav/header patterns.
- Can include safe-area top padding.

Useful for:

- Dashboard
- Detail screens
- Auth/onboarding flows
- Settings/more screens

---

### 6. Hide desktop UI chrome

Remove interface elements that feel desktop-oriented.

Behavior:

- Hide sidebars.
- Hide desktop nav bars.
- Hide wide hero sections where inappropriate.
- Hide hover-only controls.
- Replace desktop controls with drawers, sheets, or bottom navigation.

Example:

```css
[data-device="phone"] .desktop-sidebar {
  display: none;
}
```

---

### 7. Mobile gestures and bottom sheets

Use phone-native interaction patterns.

Behavior:

- Filters open as bottom sheets.
- Menus open as drawers/sheets.
- Contextual actions appear in floating panels.
- Avoid large desktop modals on phones.

Possible Kya Khana examples:

- Inventory filters as a bottom sheet.
- Meal detail actions as a bottom sheet.
- More/settings menu as a sheet.

---

### 8. PWA standalone behavior

Adjust UI when the app is installed as a PWA.

Detection:

```ts
const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
```

Behavior:

- Remove browser-like spacing.
- Avoid duplicated app/browser chrome.
- Use app-like header spacing.
- Combine with `data-device="phone"` for phone PWA polish.

---

### 9. Keyboard-aware forms

Improve login, signup, onboarding, and other forms on phones.

Behavior:

- Forms scroll correctly when the virtual keyboard opens.
- Submit buttons remain reachable.
- Inputs do not get hidden behind fixed nav/buttons.
- Prefer `100dvh` over old `100vh` for dynamic mobile viewport behavior.
- Keep input font size at least `16px` to avoid iOS zoom.

---

### 10. Phone-only performance choices

Use lighter UI behavior for phones when needed.

Behavior:

- Reduce heavy animations.
- Avoid excessive blur effects.
- Use lighter shadows.
- Defer non-critical sections.
- Avoid loading desktop-only visuals.

---

### 11. Orientation handling

Support phone portrait and landscape modes.

Behavior:

- Portrait gets the normal app layout.
- Landscape can become denser or show a compact layout.
- Some screens can adjust max width in landscape.

Example:

```css
@media (orientation: landscape) {
  [data-device="phone"] .app-shell {
    max-width: 844px;
  }
}
```

---

### 12. Device-specific polish

Expose basic OS-specific markers if useful.

Example:

```html
<html data-device="phone" data-os="ios">
```

or:

```html
<html data-device="phone" data-os="android">
```

Possible iOS-specific behavior:

- Strong safe-area support.
- Avoid input zoom by keeping input text at `16px+`.
- Handle home indicator spacing.
- Use smooth momentum scrolling where appropriate.

Possible Android-specific behavior:

- Account for Android PWA install prompts.
- Consider system back-button expectations.
- Tune viewport behavior for Android browser chrome.

---

## Recommended first version for Kya Khana

Start with a small, global implementation:

1. Add a `data-device="phone"` global marker.
2. Detect phone device using UA + touch + viewport width.
3. Keep viewport breakpoints independent.
4. Add safe-area padding.
5. Keep app shell capped around phone/tablet widths.
6. Ensure bottom navigation works well in phone mode.
7. Normalize touch target sizes.
8. Improve keyboard behavior for auth/onboarding forms.
9. Center and cap the app shell on desktop/wide monitors.

This gives the app a Zepto-like device-aware layer without making
responsiveness depend only on screen width.
