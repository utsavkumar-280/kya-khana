/* @ds-bundle: {"format":3,"namespace":"KyaKhanaDesignSystem_6941ec","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"DietBadge","sourcePath":"components/core/DietBadge.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"InventoryRow","sourcePath":"components/inventory/InventoryRow.jsx"},{"name":"QtyStepper","sourcePath":"components/inventory/QtyStepper.jsx"},{"name":"ComboOption","sourcePath":"components/meal/ComboOption.jsx"},{"name":"Countdown","sourcePath":"components/meal/Countdown.jsx"},{"name":"MealCard","sourcePath":"components/meal/MealCard.jsx"},{"name":"AppHeader","sourcePath":"components/navigation/AppHeader.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"119f42b6b0bc","components/core/Button.jsx":"13fbdd33aae3","components/core/DietBadge.jsx":"88d76cb2e6e1","components/core/Icon.jsx":"5c21bef33d90","components/inventory/InventoryRow.jsx":"9a6c10012fc0","components/inventory/QtyStepper.jsx":"b8898ecefd6b","components/meal/ComboOption.jsx":"513cfae0a970","components/meal/Countdown.jsx":"96ac4ff1bff5","components/meal/MealCard.jsx":"83892280170a","components/navigation/AppHeader.jsx":"da34c2c2d820","components/navigation/BottomNav.jsx":"a06a5ea58c08","screens/tweaks-panel.jsx":"6591467622ed","ui_kits/app/Dashboard.jsx":"3d523e94cedb","ui_kits/app/Inventory.jsx":"da518e826246","ui_kits/app/More.jsx":"c3af37a0e013","ui_kits/app/data.js":"79eb2613ede9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KyaKhanaDesignSystem_6941ec = window.KyaKhanaDesignSystem_6941ec || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small status/label pill. Used for meal states (Active / Locked /
 * Decided), counts, and inline meta. For veg/non-veg use DietBadge instead.
 */

const TONES = {
  neutral: {
    bg: 'var(--neutral-100)',
    fg: 'var(--neutral-700)'
  },
  saffron: {
    bg: 'var(--saffron-100)',
    fg: 'var(--saffron-700)'
  },
  active: {
    bg: 'var(--saffron-500)',
    fg: 'var(--neutral-0)'
  },
  locked: {
    bg: 'var(--neutral-100)',
    fg: 'var(--neutral-500)'
  },
  decided: {
    bg: 'var(--veg-50)',
    fg: 'var(--veg-700)'
  },
  success: {
    bg: 'var(--veg-50)',
    fg: 'var(--veg-700)'
  },
  warning: {
    bg: 'var(--warning-bg)',
    fg: 'var(--saffron-800)'
  },
  danger: {
    bg: 'var(--nonveg-50)',
    fg: 'var(--nonveg-700)'
  },
  info: {
    bg: 'var(--info-bg)',
    fg: 'var(--info)'
  }
};
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  uppercase = false,
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 9px',
      background: t.bg,
      color: t.fg,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: uppercase ? 'var(--tracking-caps)' : 'var(--tracking-wide)',
      textTransform: uppercase ? 'uppercase' : 'none',
      lineHeight: 1,
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/DietBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DietBadge — the vegetarian / non-vegetarian indicator.
 * Two looks:
 *   default — the familiar Indian square-and-dot mark (green veg, red non-veg)
 *             with an optional text label. Use beside combo / dish titles.
 *   pill    — a small filled text pill (VEG / NON-VEG) for inline dish tags.
 */

function DietBadge({
  type = 'veg',
  label,
  size = 16,
  pill = false,
  style = {},
  ...rest
}) {
  const isVeg = type === 'veg';
  const color = isVeg ? 'var(--veg-500)' : 'var(--nonveg-500)';
  const text = label ?? (isVeg ? 'Veg' : 'Non-Veg');
  if (pill) {
    return /*#__PURE__*/React.createElement("span", _extends({
      role: "img",
      "aria-label": isVeg ? 'Vegetarian' : 'Non-vegetarian',
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        padding: '2px 7px',
        borderRadius: 'var(--radius-pill)',
        background: isVeg ? 'var(--veg-bg)' : 'var(--nonveg-bg)',
        color,
        fontFamily: 'var(--font-display)',
        fontSize: '9px',
        fontWeight: 800,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        ...style
      }
    }, rest), text);
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      ...style
    },
    role: "img",
    "aria-label": isVeg ? 'Vegetarian' : 'Non-vegetarian'
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      flexShrink: 0,
      border: `1.5px solid ${color}`,
      borderRadius: 3,
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size * 0.45,
      height: size * 0.45,
      borderRadius: '50%',
      background: color
    }
  })), label !== false && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      color
    }
  }, text));
}
Object.assign(__ds_scope, { DietBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DietBadge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon — Kya Khana's UI icon set.
 * Line icons (Lucide path data, 24×24, 2px stroke, round caps) used for
 * interface chrome: navigation, headers, steppers, actions. Food / diet
 * semantics use emoji (🌿 🍗 ✅) elsewhere — not this component.
 */

const PATHS = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  package: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="m7.5 4.27 9 5.15"/>',
  more: '<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-up': '<path d="m18 15-6-6-6 6"/>',
  bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/>',
  'chef-hat': '<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'arrow-up': '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>',
  utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  clipboard: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>'
};
function Icon({
  name,
  size = 22,
  strokeWidth = 2,
  color = 'currentColor',
  className = '',
  style = {},
  ...rest
}) {
  const d = PATHS[name];
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": rest['aria-label'] ? undefined : 'true',
    style: style
  }, rest, {
    dangerouslySetInnerHTML: {
      __html: d || ''
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary action control for Kya Khana.
 * Warm saffron primary, soft secondary, quiet ghost. Pill or rounded.
 */

const SIZES = {
  sm: {
    padding: '8px 14px',
    fontSize: 'var(--text-sm)',
    height: 36,
    gap: 6,
    icon: 16
  },
  md: {
    padding: '11px 18px',
    fontSize: 'var(--text-md)',
    height: 44,
    gap: 8,
    icon: 18
  },
  lg: {
    padding: '14px 22px',
    fontSize: 'var(--text-lg)',
    height: 52,
    gap: 9,
    icon: 20
  }
};
function variantStyle(variant) {
  switch (variant) {
    case 'secondary':
      return {
        background: 'var(--saffron-50)',
        color: 'var(--saffron-700)',
        border: '1.5px solid var(--saffron-200)'
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--text-secondary)',
        border: '1.5px solid transparent'
      };
    case 'outline':
      return {
        background: 'var(--surface-card)',
        color: 'var(--text-primary)',
        border: '1.5px solid var(--border-strong)'
      };
    case 'danger':
      return {
        background: 'var(--nonveg-500)',
        color: 'var(--neutral-0)',
        border: '1.5px solid transparent'
      };
    case 'primary':
    default:
      return {
        background: 'var(--primary)',
        color: 'var(--on-primary)',
        border: '1.5px solid transparent'
      };
  }
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  pill = false,
  fullWidth = false,
  disabled = false,
  type = 'button',
  style = {},
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    fontFamily: 'var(--font-sans)',
    fontSize: s.fontSize,
    fontWeight: 'var(--weight-semibold)',
    lineHeight: 1,
    borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-md)',
    width: fullWidth ? '100%' : undefined,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'transform var(--duration-fast) var(--ease-out), filter var(--duration-fast) var(--ease-out), background var(--duration-fast)',
    WebkitTapHighlightColor: 'transparent',
    ...variantStyle(variant),
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: base,
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.97)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: s.icon
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.icon
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/inventory/QtyStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * QtyStepper — compact +/- quantity control for inventory stock.
 * Shows the current amount with an optional unit (g, kg, pcs, ...).
 */

function QtyStepper({
  value = 0,
  step = 1,
  min = 0,
  max = Infinity,
  unit = '',
  size = 'md',
  onChange,
  style = {},
  ...rest
}) {
  const dims = size === 'sm' ? {
    btnW: 32,
    btnH: 30,
    font: 'var(--text-sm)',
    icon: 15,
    w: 58
  } : {
    btnW: 38,
    btnH: 34,
    font: 'var(--text-md)',
    icon: 17,
    w: 70
  };
  const set = next => {
    const clamped = Math.min(max, Math.max(min, next));
    onChange && onChange(clamped);
  };
  const btnStyle = disabled => ({
    width: dims.btnW,
    height: dims.btnH,
    flexShrink: 0,
    display: 'grid',
    placeItems: 'center',
    border: 'none',
    background: disabled ? 'var(--neutral-50)' : 'var(--accent-soft)',
    color: disabled ? 'var(--neutral-300)' : 'var(--primary)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    WebkitTapHighlightColor: 'transparent',
    transition: 'background var(--duration-fast), color var(--duration-fast)'
  });

  // press-fill: darken to the solid primary on active press
  const press = (e, on) => {
    if (e.currentTarget.getAttribute('aria-disabled') === 'true') return;
    e.currentTarget.style.background = on ? 'var(--primary)' : 'var(--accent-soft)';
    e.currentTarget.style.color = on ? 'var(--on-primary)' : 'var(--primary)';
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      border: '1.5px solid var(--primary)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    style: btnStyle(value <= min),
    disabled: value <= min,
    "aria-disabled": value <= min,
    onMouseDown: e => press(e, true),
    onMouseUp: e => press(e, false),
    onMouseLeave: e => press(e, false),
    onClick: () => set(value - step),
    "aria-label": "Decrease"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: dims.icon,
    strokeWidth: 2.6
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: dims.w,
      textAlign: 'center',
      padding: '0 4px',
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: dims.font,
      fontWeight: 'var(--weight-extrabold)',
      color: 'var(--text-primary)'
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      marginLeft: 2,
      fontSize: 'var(--text-xs)'
    }
  }, unit)), /*#__PURE__*/React.createElement("button", {
    style: btnStyle(value >= max),
    disabled: value >= max,
    "aria-disabled": value >= max,
    onMouseDown: e => press(e, true),
    onMouseUp: e => press(e, false),
    onMouseLeave: e => press(e, false),
    onClick: () => set(value + step),
    "aria-label": "Increase"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: dims.icon,
    strokeWidth: 2.6
  })));
}
Object.assign(__ds_scope, { QtyStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/inventory/QtyStepper.jsx", error: String((e && e.message) || e) }); }

// components/inventory/InventoryRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * InventoryRow — a single ingredient line, used in both Inventory views.
 *   variant="stock"   → name + editable QtyStepper
 *   variant="grocery" → name + required-vs-available + buy checkbox
 * Grocery rows show a "short by N" pill when stock can't cover the need.
 */

function InventoryRow({
  name,
  hindi,
  emoji,
  variant = 'stock',
  // stock
  qty = 0,
  unit = '',
  onQty,
  // grocery
  need = 0,
  have = 0,
  checked = false,
  onCheck,
  style = {},
  ...rest
}) {
  const short = Math.max(0, need - have);
  const enough = short === 0;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 'var(--space-3) var(--space-4)',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border)',
      ...(variant === 'grocery' && !enough && !checked ? {
        boxShadow: 'inset 3px 0 0 var(--nonveg-300)'
      } : {}),
      ...(variant === 'grocery' && (enough || checked) ? {
        opacity: 0.55
      } : {}),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 13,
      background: 'var(--surface-sunken)',
      fontSize: 20
    }
  }, emoji || '🥘'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      color: 'var(--text-primary)',
      textDecoration: variant === 'grocery' && (enough || checked) ? 'line-through' : 'none'
    }
  }, name, hindi && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-deva)',
      fontWeight: 500,
      color: 'var(--text-muted)',
      marginLeft: 6,
      fontSize: 'var(--text-sm)'
    }
  }, hindi)), variant === 'grocery' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, enough ? 'already have it' : `${need}${unit}`), !enough ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '9px',
      fontWeight: 800,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: 'var(--nonveg-500)',
      background: 'var(--nonveg-bg)',
      padding: '2px 7px',
      borderRadius: 'var(--radius-pill)'
    }
  }, "Need to buy") : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '9px',
      fontWeight: 800,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: 'var(--veg-500)',
      background: 'var(--veg-bg)',
      padding: '2px 7px',
      borderRadius: 'var(--radius-pill)'
    }
  }, "In stock"))), variant === 'stock' ? /*#__PURE__*/React.createElement(__ds_scope.QtyStepper, {
    value: qty,
    unit: unit,
    size: "sm",
    onChange: onQty
  }) : enough ? /*#__PURE__*/React.createElement("span", {
    "aria-label": "Already in stock",
    style: {
      width: 28,
      height: 28,
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      borderRadius: '50%',
      background: 'var(--veg-bg)',
      color: 'var(--veg-600)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16,
    strokeWidth: 2.8
  })) : /*#__PURE__*/React.createElement("button", {
    onClick: () => onCheck && onCheck(!checked),
    "aria-label": checked ? 'Bought' : 'Mark to buy',
    style: {
      width: 28,
      height: 28,
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 9,
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
      border: checked ? 'none' : '1.5px solid var(--border-strong)',
      background: checked ? 'var(--veg-500)' : 'var(--surface-card)',
      color: '#fff',
      transition: 'background var(--duration-fast), border-color var(--duration-fast)'
    }
  }, checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16,
    strokeWidth: 2.8
  })));
}
Object.assign(__ds_scope, { InventoryRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/inventory/InventoryRow.jsx", error: String((e && e.message) || e) }); }

// components/meal/ComboOption.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ComboOption — one of the two choices (A / B) inside a MealCard.
 * Lists the meal's components as emoji + dish-name rows (with an optional
 * VEG / NON-VEG pill on the protein), shows the combo tag and live vote
 * count, and exposes a vote action when active. If the combo is non-veg and
 * a veg variant is supplied, an informational note appears (the cook prepares
 * both if this combo wins).
 *
 * Each item: { name, hindi?, emoji?, role?, diet? }
 */

function ComboOption({
  letter = 'A',
  items = [],
  diet = 'veg',
  votes = 0,
  vegVariant,
  state = 'active',
  // 'active' | 'locked' | 'decided'
  selected = false,
  // user voted for this combo
  winner = false,
  // decided + won
  onVote,
  style = {},
  ...rest
}) {
  const isActive = state === 'active';
  const voteGlyph = diet === 'veg' ? '🟢' : '🍗';
  const accent = winner ? 'var(--veg-500)' : selected ? 'var(--saffron-500)' : 'var(--border)';
  const tagColor = winner ? 'var(--veg-700)' : selected ? 'var(--accent)' : 'var(--text-secondary)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      border: `1.5px solid ${accent}`,
      background: winner ? 'var(--veg-50)' : selected ? 'var(--accent-soft)' : 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-3) var(--space-3) var(--space-4)',
      transition: 'border-color var(--duration-base), background var(--duration-base)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 800,
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: tagColor
    }
  }, "Combo ", letter), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, winner && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      color: 'var(--veg-700)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check-circle",
    size: 14
  }), " Chosen"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 'var(--text-xs)',
      fontWeight: 700,
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, voteGlyph), votes))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      flexShrink: 0,
      textAlign: 'center',
      fontSize: 15
    },
    "aria-hidden": "true"
  }, it.emoji || '•'), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      color: 'var(--text-primary)',
      lineHeight: 1.2
    }
  }, it.name, it.hindi && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-deva)',
      fontWeight: 500,
      color: 'var(--text-muted)',
      marginLeft: 6,
      fontSize: 'var(--text-xs)'
    }
  }, it.hindi)), it.diet && /*#__PURE__*/React.createElement(__ds_scope.DietBadge, {
    type: it.diet,
    pill: true
  })))), vegVariant && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 7,
      marginTop: 12,
      padding: '8px 10px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--veg-50)',
      border: '1px dashed var(--veg-300)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      lineHeight: 1.3
    }
  }, "\uD83C\uDF3F"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: 'var(--veg-700)',
      lineHeight: 'var(--leading-snug)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 700
    }
  }, "Veg option:"), " ", vegVariant, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--veg-600)'
    }
  }, "\u2014 cooked alongside if this combo wins."))), isActive && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: selected ? 'primary' : 'secondary',
    fullWidth: true,
    size: "md",
    iconLeft: selected ? 'check' : undefined,
    onClick: onVote,
    style: {
      marginTop: 14
    }
  }, selected ? 'Your vote' : `Vote Combo ${letter}`));
}
Object.assign(__ds_scope, { ComboOption });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/meal/ComboOption.jsx", error: String((e && e.message) || e) }); }

// components/meal/Countdown.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Countdown — live deadline timer for an active or locked meal card.
 * Ticks every second toward a deadline. Turns urgent (turmeric → chili)
 * as time runs low. Pass `deadline` (epoch ms) or `seconds` (static start).
 */

function fmt(total) {
  const t = Math.max(0, Math.floor(total));
  const h = Math.floor(t / 3600);
  const m = Math.floor(t % 3600 / 60);
  const s = t % 60;
  const pad = n => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

// Compact human label for the pill variant: "3h 12m left" / "12m left" / "45s left".
function fmtPill(total) {
  const t = Math.max(0, Math.floor(total));
  if (t <= 0) return 'Closed';
  const h = Math.floor(t / 3600);
  const m = Math.floor(t % 3600 / 60);
  const s = t % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m left`;
  if (m > 0) return `${m}m left`;
  return `${s}s left`;
}
function Countdown({
  deadline,
  seconds = 0,
  label = 'Voting closes in',
  size = 'md',
  icon = 'clock',
  variant = 'stack',
  // 'stack' (label over digits) | 'pill' (inline pulse pill)
  style = {},
  ...rest
}) {
  const compute = React.useCallback(() => deadline ? (deadline - Date.now()) / 1000 : seconds, [deadline, seconds]);
  const [remaining, setRemaining] = React.useState(compute());
  React.useEffect(() => {
    setRemaining(compute());
    const id = setInterval(() => {
      setRemaining(prev => deadline ? (deadline - Date.now()) / 1000 : prev - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [deadline, compute]);
  const urgent = remaining <= 600; // < 10 min
  const warn = remaining <= 1800 && !urgent; // < 30 min
  const color = remaining <= 0 ? 'var(--text-muted)' : urgent ? 'var(--nonveg-600)' : warn ? 'var(--timer)' : 'var(--saffron-600)';

  // ---- pill variant: pulse dot + "Xh YYm left", warm timer pill ----
  if (variant === 'pill') {
    const live = remaining > 0;
    const pillColor = remaining <= 0 ? 'var(--text-muted)' : urgent ? 'var(--nonveg-600)' : 'var(--timer)';
    const pillBg = remaining <= 0 ? 'var(--neutral-50)' : urgent ? 'var(--nonveg-50)' : 'var(--timer-bg)';
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        flexShrink: 0,
        padding: '7px 11px',
        borderRadius: 'var(--radius-pill)',
        background: pillBg,
        color: pillColor,
        fontFamily: 'var(--font-display)',
        fontVariantNumeric: 'tabular-nums',
        fontSize: 'var(--text-xs)',
        fontWeight: 800,
        whiteSpace: 'nowrap',
        ...style
      }
    }, rest), live ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'currentColor',
        animation: 'kk-pulse 1.6s ease-in-out infinite'
      }
    }) : /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: icon,
      size: 14,
      color: "currentColor"
    }), fmtPill(remaining));
  }
  const dims = {
    sm: {
      num: 'var(--text-lg)',
      lab: 'var(--text-2xs)',
      icon: 14
    },
    md: {
      num: 'var(--text-2xl)',
      lab: 'var(--text-xs)',
      icon: 16
    },
    lg: {
      num: 'var(--text-4xl)',
      lab: 'var(--text-sm)',
      icon: 20
    }
  }[size] || {
    num: 'var(--text-2xl)',
    lab: 'var(--text-xs)',
    icon: 16
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 2,
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--font-sans)',
      fontSize: dims.lab,
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: dims.icon,
    color: color
  }), label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: dims.num,
      fontWeight: 'var(--weight-extrabold)',
      letterSpacing: '-0.02em',
      lineHeight: 1,
      color
    }
  }, remaining <= 0 ? 'Closed' : fmt(remaining)));
}
Object.assign(__ds_scope, { Countdown });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/meal/Countdown.jsx", error: String((e && e.message) || e) }); }

// components/meal/MealCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MealCard — the core Dashboard unit. One card = one meal (e.g. "Tonight's
 * Dinner"). Three states drive its whole look:
 *   active  — full color, inline live-countdown pill, two votable combo columns
 *   locked  — greyed, a collapsed dish preview + "voting opens soon"
 *   decided — past; a calm result strip ("What we ate") of the winning combo
 */

function MealCard({
  meal = 'Dinner',
  hindi,
  when = 'Today · Evening',
  state = 'active',
  deadline,
  seconds,
  combos = [],
  // [{ letter, diet, votes, items, vegVariant, selected, winner }]
  userVote,
  // 'A' | 'B'
  onVote,
  // (letter) => void
  snapped = false,
  style = {},
  ...rest
}) {
  const isLocked = state === 'locked';
  const isDecided = state === 'decided';
  const isActive = state === 'active';
  const winner = combos.find(c => c.winner) || combos[0];
  const previewItems = combos[0]?.items || [];
  const eyebrowColor = isActive ? 'var(--accent)' : 'var(--text-secondary)';
  const titleColor = isDecided ? 'var(--text-secondary)' : 'var(--text-primary)';
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      background: isDecided ? 'var(--neutral-50)' : 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid',
      borderColor: snapped ? 'var(--saffron-200)' : 'var(--border)',
      boxShadow: snapped ? 'var(--shadow-snap)' : 'var(--shadow-sm)',
      padding: isActive ? '16px 14px 14px' : '14px 16px',
      opacity: isLocked ? 0.66 : 1,
      transition: 'box-shadow var(--duration-base) var(--ease-snap), opacity var(--duration-base)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      marginBottom: isActive ? 12 : 0,
      padding: isActive ? '0 2px' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 700,
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: eyebrowColor,
      marginBottom: 4
    }
  }, when), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-xl)',
      fontWeight: 800,
      color: titleColor,
      lineHeight: 1.05,
      letterSpacing: 'var(--tracking-tight)'
    }
  }, meal, hindi && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-deva)',
      fontWeight: 600,
      color: 'var(--text-muted)',
      fontSize: 'var(--text-md)',
      marginLeft: 7
    }
  }, hindi))), isActive && /*#__PURE__*/React.createElement(__ds_scope.Countdown, {
    variant: "pill",
    deadline: deadline,
    seconds: seconds
  }), isLocked && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "locked",
    uppercase: true
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "lock",
    size: 12
  }), " Locked"), isDecided && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "decided",
    uppercase: true
  }, "\u2705 Decided")), isActive && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, combos.map(c => /*#__PURE__*/React.createElement(__ds_scope.ComboOption, {
    key: c.letter,
    letter: c.letter,
    diet: c.diet,
    votes: c.votes,
    items: c.items,
    vegVariant: c.vegVariant,
    state: "active",
    selected: userVote === c.letter,
    onVote: () => onVote && onVote(c.letter)
  }))), isLocked && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 700,
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 6
    }
  }, "Preview"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      lineHeight: 1.45
    }
  }, previewItems.map(it => it.name).join(' · ')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      marginTop: 12,
      padding: '10px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--neutral-50)',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "lock",
    size: 14
  }), " Voting opens soon")), isDecided && winner && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 700,
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: 8
    }
  }, "What we ate"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, winner.items.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      padding: '6px 9px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, it.emoji || '•'), it.name)))));
}
Object.assign(__ds_scope, { MealCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/meal/MealCard.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * AppHeader — the app's sticky top bar.
 * Left: the kya-khana wordmark (brand). Right: an optional date quick-jump
 * pill (calendar + day + chevron) and/or a notification bell. Sits on a soft
 * cream-to-transparent gradient so content scrolls cleanly beneath it.
 */

function AppHeader({
  brand,
  date,
  onDate,
  onBell,
  notifications = 0,
  showBell = false,
  style = {},
  ...rest
}) {
  const wordmark = brand ?? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-xl)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-brand)'
    }
  }, "kya", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, "-"), "khana");
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      position: 'relative',
      zIndex: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      height: 'var(--header-height)',
      padding: '0 18px',
      background: 'linear-gradient(to bottom, var(--bg-app) 72%, color-mix(in srgb, var(--bg-app) 0%, transparent))',
      ...style
    }
  }, rest), wordmark, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, date && /*#__PURE__*/React.createElement("button", {
    onClick: onDate,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-pill)',
      padding: '8px 12px 8px 11px',
      boxShadow: 'var(--shadow-sm)',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      WebkitTapHighlightColor: 'transparent'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "calendar",
    size: 17,
    color: "var(--accent)"
  }), date, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    color: "var(--text-muted)"
  })), showBell && /*#__PURE__*/React.createElement("button", {
    onClick: onBell,
    "aria-label": "Notifications",
    style: {
      position: 'relative',
      width: 40,
      height: 40,
      display: 'grid',
      placeItems: 'center',
      border: '1px solid var(--border)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      color: 'var(--text-secondary)',
      boxShadow: 'var(--shadow-sm)',
      WebkitTapHighlightColor: 'transparent'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bell",
    size: 20
  }), notifications > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -5,
      right: -5,
      minWidth: 18,
      height: 18,
      padding: '0 4px',
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--nonveg-500)',
      color: '#fff',
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 10,
      fontWeight: 800,
      border: '2px solid var(--bg-app)'
    }
  }, notifications > 9 ? '9+' : notifications))));
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BottomNav — the always-visible 3-tab bottom navigation.
 * Inventory · Dashboard · More (Dashboard centered). The current tab is
 * orange-highlighted with a soft pill behind its icon.
 */

const DEFAULT_TABS = [{
  id: 'inventory',
  label: 'Inventory',
  icon: 'package'
}, {
  id: 'dashboard',
  label: 'Dashboard',
  icon: 'home'
}, {
  id: 'more',
  label: 'More',
  icon: 'more'
}];
function BottomNav({
  active = 'dashboard',
  onChange,
  tabs = DEFAULT_TABS,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: 'flex',
      alignItems: 'stretch',
      height: 'var(--bottom-nav-height)',
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--border)',
      boxShadow: 'var(--shadow-nav)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      ...style
    }
  }, rest), tabs.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onChange && onChange(t.id),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        border: 'none',
        background: 'transparent',
        color: on ? 'var(--primary)' : 'var(--text-muted)',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-2xs)',
        fontWeight: on ? 700 : 600,
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        transition: 'color var(--duration-fast)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'grid',
        placeItems: 'center',
        width: 54,
        height: 32,
        borderRadius: 'var(--radius-pill)',
        background: on ? 'var(--primary-soft)' : 'transparent',
        transition: 'background var(--duration-fast)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: t.icon,
      size: 21,
      strokeWidth: on ? 2.4 : 2
    })), t.label);
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// screens/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "screens/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Dashboard.jsx
try { (() => {
// Dashboard — scroll = time navigation; meal cards magnet-snap to the top.
// Owns its own header (wordmark + date pill) and a top-right date popover.
const {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback
} = React;
const {
  AppHeader,
  MealCard,
  Icon
} = window.KyaKhanaDesignSystem_6941ec;
const DATE_META = {
  Tomorrow: 'Fri, 12 Jun',
  Today: 'Thu, 11 Jun',
  Yesterday: 'Wed, 10 Jun'
};
function Dashboard() {
  const data = window.KK_DATA;
  // future at top, past at bottom (scroll up = future)
  const feed = [...data.meals].reverse();
  const [votes, setVotes] = useState({
    't-dinner': 'A'
  });
  const [snappedDay, setSnappedDay] = useState('Today');
  const [popOpen, setPopOpen] = useState(false);
  const scrollRef = useRef(null);
  const activeRef = useRef(null);
  const cardRefs = useRef({});

  // open scrolled to the active meal (before first paint)
  useLayoutEffect(() => {
    const scrollToActive = () => {
      const root = scrollRef.current;
      const el = activeRef.current;
      if (root && el) {
        const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 6;
        root.style.scrollBehavior = 'auto';
        root.scrollTop = top;
        root.style.scrollBehavior = '';
      }
    };
    scrollToActive();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scrollToActive);
  }, []);

  // update header date from the card snapped near the top
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const day = e.target.getAttribute('data-day');
          if (day) setSnappedDay(day);
        }
      });
    }, {
      root,
      rootMargin: '0px 0px -78% 0px',
      threshold: 0
    });
    Object.values(cardRefs.current).forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const jumpTo = useCallback(targetDay => {
    const target = feed.find(m => m.day === targetDay);
    const el = target && cardRefs.current[target.id];
    const root = scrollRef.current;
    if (el && root) {
      const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 6;
      root.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
    setPopOpen(false);
  }, [feed]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(AppHeader, {
    date: snappedDay,
    onDate: () => setPopOpen(o => !o)
  }), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '6px 16px 22px',
      scrollSnapType: 'y proximity',
      scrollBehavior: 'smooth',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: hintStyle
  }, "\u2191 swipe up for upcoming days"), feed.map(m => {
    const isActive = m.state === 'active';
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      "data-day": m.day,
      ref: el => {
        cardRefs.current[m.id] = el;
        if (isActive) activeRef.current = el;
      },
      style: {
        scrollSnapAlign: 'start',
        scrollMarginTop: 6
      }
    }, /*#__PURE__*/React.createElement(MealCard, {
      meal: m.meal,
      hindi: m.hindi,
      when: m.when,
      state: m.state,
      snapped: isActive,
      seconds: m.closesInSec || m.opensInSec,
      combos: m.combos,
      userVote: votes[m.id],
      onVote: letter => setVotes(v => ({
        ...v,
        [m.id]: letter
      }))
    }));
  }), /*#__PURE__*/React.createElement("p", {
    style: hintStyle
  }, "that's the start of your history \u2726")), /*#__PURE__*/React.createElement("div", {
    onClick: () => setPopOpen(false),
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 25,
      background: 'var(--overlay-scrim)',
      opacity: popOpen ? 1 : 0,
      pointerEvents: popOpen ? 'auto' : 'none',
      transition: 'opacity var(--duration-base)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 60,
      right: 18,
      zIndex: 31,
      width: 210,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      padding: 8,
      transformOrigin: 'top right',
      opacity: popOpen ? 1 : 0,
      transform: popOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
      pointerEvents: popOpen ? 'auto' : 'none',
      transition: 'opacity var(--duration-base), transform var(--duration-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      padding: '6px 8px 8px'
    }
  }, "Jump to a day"), ['Tomorrow', 'Today', 'Yesterday'].map(d => {
    const cur = d === snappedDay;
    return /*#__PURE__*/React.createElement("button", {
      key: d,
      onClick: () => jumpTo(d),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        border: 'none',
        background: cur ? 'var(--primary)' : 'transparent',
        cursor: 'pointer',
        padding: '11px 10px',
        borderRadius: 'var(--radius-md)',
        textAlign: 'left',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-sm)',
        color: cur ? 'var(--on-primary)' : 'var(--text-primary)',
        WebkitTapHighlightColor: 'transparent'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 16,
      color: cur ? 'var(--on-primary)' : 'var(--accent)'
    }), d, /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 600,
        color: cur ? 'rgba(255,255,255,0.82)' : 'var(--text-muted)'
      }
    }, DATE_META[d]));
  })));
}
const hintStyle = {
  textAlign: 'center',
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-xs)',
  fontWeight: 500,
  color: 'var(--text-muted)',
  margin: 0,
  padding: '2px 0 4px'
};
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Inventory.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Inventory — Stock vs Grocery List toggle.
// Stock is grouped by ingredient category; Grocery is grouped by the meal
// that needs each item (auto-generated from decided meals).
const {
  useState: useStateInv
} = React;
const {
  InventoryRow,
  Button: BtnInv,
  Icon: IconInv,
  AppHeader: AppHeaderInv
} = window.KyaKhanaDesignSystem_6941ec;
function SegToggle({
  value,
  onChange,
  options
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      padding: 4,
      background: 'var(--neutral-50)',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--border)'
    }
  }, options.map(o => {
    const on = o.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.id,
      onClick: () => onChange(o.id),
      style: {
        flex: 1,
        border: 'none',
        cursor: 'pointer',
        padding: '10px 12px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-sm)',
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        background: on ? 'var(--primary)' : 'transparent',
        color: on ? 'var(--on-primary)' : 'var(--text-secondary)',
        boxShadow: on ? '0 4px 12px color-mix(in oklab, var(--primary) 30%, transparent)' : 'none',
        transition: 'all var(--duration-fast)'
      }
    }, o.label, o.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontVariantNumeric: 'tabular-nums',
        fontSize: '11px',
        fontWeight: 800,
        lineHeight: 1.5,
        padding: '1px 7px',
        borderRadius: 'var(--radius-pill)',
        background: on ? 'rgba(255,255,255,0.25)' : 'var(--nonveg-500)',
        color: '#fff'
      }
    }, o.count));
  }));
}
const invSectionLabel = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-xs)',
  fontWeight: 800,
  letterSpacing: 'var(--tracking-caps)',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  margin: '16px 2px 8px'
};
const invCard = {
  background: 'var(--surface-card)',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-sm)'
};
function Inventory() {
  const data = window.KK_DATA;
  const [view, setView] = useStateInv('stock');
  const [stock, setStock] = useStateInv(data.stock);
  const [bought, setBought] = useStateInv({});
  const shortCount = data.grocery.filter(g => g.need > g.have).length;
  const categories = [...new Set(stock.map(s => s.category))];
  const mealGroups = [...new Set(data.grocery.map(g => g.forMeal))];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(AppHeaderInv, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 12px'
    }
  }, /*#__PURE__*/React.createElement(SegToggle, {
    value: view,
    onChange: setView,
    options: [{
      id: 'stock',
      label: 'Stock'
    }, {
      id: 'grocery',
      label: 'Grocery List',
      count: shortCount || null
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 16px 24px'
    }
  }, view === 'stock' ? /*#__PURE__*/React.createElement("div", null, categories.map(cat => {
    const rows = stock.filter(s => s.category === cat);
    return /*#__PURE__*/React.createElement("div", {
      key: cat
    }, /*#__PURE__*/React.createElement("h2", {
      style: invSectionLabel
    }, cat), /*#__PURE__*/React.createElement("div", {
      style: invCard
    }, rows.map(({
      category,
      ...s
    }, i) => /*#__PURE__*/React.createElement(InventoryRow, _extends({
      key: s.name,
      variant: "stock"
    }, s, {
      onQty: q => setStock(prev => prev.map(x => x.name === s.name ? {
        ...x,
        qty: q
      } : x)),
      style: i === rows.length - 1 ? {
        borderBottom: 'none'
      } : undefined
    })))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(BtnInv, {
    variant: "secondary",
    fullWidth: true,
    pill: true,
    iconLeft: "plus"
  }, "Add Item"))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      margin: '12px 2px 0',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(IconInv, {
    name: "refresh",
    size: 14,
    color: "var(--accent)"
  }), "Auto-generated from decided meals"), mealGroups.map(meal => {
    const rows = data.grocery.filter(g => g.forMeal === meal);
    return /*#__PURE__*/React.createElement("div", {
      key: meal
    }, /*#__PURE__*/React.createElement("h2", {
      style: invSectionLabel
    }, "For ", meal), /*#__PURE__*/React.createElement("div", {
      style: invCard
    }, rows.map(({
      forMeal,
      ...g
    }, i) => /*#__PURE__*/React.createElement(InventoryRow, _extends({
      key: g.name,
      variant: "grocery"
    }, g, {
      checked: !!bought[meal + g.name],
      onCheck: c => setBought(b => ({
        ...b,
        [meal + g.name]: c
      })),
      style: i === rows.length - 1 ? {
        borderBottom: 'none'
      } : undefined
    })))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(BtnInv, {
    variant: "primary",
    fullWidth: true,
    pill: true,
    iconLeft: "share",
    style: {
      background: 'var(--whatsapp)',
      boxShadow: '0 10px 26px rgba(31,175,84,0.32)'
    }
  }, "Share via WhatsApp"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      marginTop: 9,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, "Sends only the items still left to buy")))));
}
window.Inventory = Inventory;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Inventory.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/More.jsx
try { (() => {
// More — profile, separated menu cards (Cook View, Notifications, Templates,
// Cook Times, Profile) and a red logout card. Mirrors screens/More.html.
const {
  Icon: IconMore,
  AppHeader: AppHeaderMore
} = window.KyaKhanaDesignSystem_6941ec;
const MENU = [{
  id: 'cook',
  icon: 'chef-hat',
  title: 'Cook View',
  subtitle: "Today's recipes and cook instructions"
}, {
  id: 'notif',
  icon: 'bell',
  title: 'Notifications',
  subtitle: 'Vote reminders, food ready alerts',
  badge: 2
}, {
  id: 'templates',
  icon: 'clipboard',
  title: 'Meal Templates',
  subtitle: 'Edit breakfast, lunch, dinner components'
}, {
  id: 'times',
  icon: 'clock',
  title: 'Cook Times',
  subtitle: 'Morning: 8:00 AM  ·  Evening: 7:30 PM'
}, {
  id: 'profile',
  icon: 'user',
  title: 'Profile',
  subtitle: 'Housemate 1',
  role: 'Housemate'
}];
const menuCard = {
  display: 'flex',
  alignItems: 'center',
  gap: 13,
  width: '100%',
  textAlign: 'left',
  background: 'var(--surface-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-xl)',
  boxShadow: 'var(--shadow-sm)',
  padding: '14px 16px',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  transition: 'background var(--duration-fast)'
};
function MenuItem({
  item,
  danger = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    style: menuCard
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 42,
      height: 42,
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      borderRadius: 14,
      background: danger ? 'var(--nonveg-bg)' : 'var(--accent-soft)',
      color: danger ? 'var(--nonveg-500)' : 'var(--accent)'
    }
  }, /*#__PURE__*/React.createElement(IconMore, {
    name: item.icon,
    size: 21
  }), item.badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -3,
      right: -3,
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--accent)',
      color: '#fff',
      border: '2px solid var(--surface-card)',
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 10.5,
      fontWeight: 800
    }
  }, item.badge) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-md)',
      color: danger ? 'var(--nonveg-500)' : 'var(--text-primary)'
    }
  }, item.title, item.role && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      background: 'var(--accent-soft)',
      color: 'var(--accent)',
      borderRadius: 'var(--radius-pill)',
      padding: '5px 10px',
      whiteSpace: 'nowrap'
    }
  }, item.role)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: 3,
      lineHeight: 1.35
    }
  }, item.subtitle)), /*#__PURE__*/React.createElement(IconMore, {
    name: "chevron-right",
    size: 19,
    color: "var(--text-muted)"
  }));
}
function More() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(AppHeaderMore, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '4px 16px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 13,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-sm)',
      padding: '16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 54,
      height: 54,
      flexShrink: 0,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--accent-soft)',
      color: 'var(--accent)',
      border: '1.5px dashed color-mix(in oklab, var(--accent) 45%, white)',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 19
    }
  }, "H1"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-lg)',
      letterSpacing: '-0.01em',
      color: 'var(--text-primary)'
    }
  }, "Housemate 1"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: 3
    }
  }, "Flat 302 \xB7 4 members \xB7 1 cook")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      background: 'var(--accent-soft)',
      color: 'var(--accent)',
      borderRadius: 'var(--radius-pill)',
      padding: '5px 10px',
      whiteSpace: 'nowrap'
    }
  }, "Housemate")), MENU.map(item => /*#__PURE__*/React.createElement(MenuItem, {
    key: item.id,
    item: item
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(MenuItem, {
    item: {
      icon: 'log-out',
      title: 'Logout',
      subtitle: 'Sign out of this household'
    },
    danger: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)',
      padding: '8px 0 2px'
    }
  }, "Kya Khana \xB7 \u0915\u094D\u092F\u093E \u0916\u093E\u0928\u093E \xB7 v1.0")));
}
window.More = More;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/More.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
// Kya Khana — sample data for the app UI kit (North Indian meals)
// Plain global module: window.KK_DATA

window.KK_DATA = {
  // Dashboard feed, ordered past → future (rendered bottom = past, top = future)
  meals: [{
    id: 'y-dinner',
    meal: 'Yesterday Dinner',
    hindi: 'रात का खाना',
    when: 'Yesterday · Evening',
    day: 'Yesterday',
    state: 'decided',
    combos: [{
      letter: 'A',
      diet: 'veg',
      votes: 3,
      winner: true,
      items: [{
        emoji: '🫓',
        name: 'Roti',
        hindi: 'रोटी'
      }, {
        emoji: '🧀',
        name: 'Paneer Butter Masala',
        diet: 'veg'
      }, {
        emoji: '🫘',
        name: 'Dal Makhani'
      }, {
        emoji: '🥗',
        name: 'Boondi Raita'
      }]
    }, {
      letter: 'B',
      diet: 'nonveg',
      votes: 1,
      vegVariant: 'Aloo Gobi instead of Egg Curry',
      items: [{
        emoji: '🍚',
        name: 'Jeera Rice'
      }, {
        emoji: '🍳',
        name: 'Egg Curry',
        diet: 'nonveg'
      }, {
        emoji: '🥗',
        name: 'Green Salad'
      }]
    }]
  }, {
    id: 't-breakfast',
    meal: 'Breakfast',
    hindi: 'नाश्ता',
    when: 'Today · Morning',
    day: 'Today',
    state: 'decided',
    combos: [{
      letter: 'A',
      diet: 'veg',
      votes: 2,
      winner: true,
      items: [{
        emoji: '🥔',
        name: 'Aloo Paratha',
        hindi: 'आलू पराठा'
      }, {
        emoji: '🥭',
        name: 'Curd & Mango Pickle'
      }]
    }, {
      letter: 'B',
      diet: 'veg',
      votes: 1,
      items: [{
        emoji: '🍚',
        name: 'Poha',
        hindi: 'पोहा'
      }, {
        emoji: '🍋',
        name: 'Sev & Lemon'
      }]
    }]
  }, {
    id: 't-lunch',
    meal: "Today's Lunch",
    hindi: 'दोपहर का खाना',
    when: 'Today · Afternoon',
    day: 'Today',
    state: 'decided',
    combos: [{
      letter: 'A',
      diet: 'veg',
      votes: 1,
      items: [{
        emoji: '🍚',
        name: 'Jeera Rice'
      }, {
        emoji: '🫘',
        name: 'Rajma',
        diet: 'veg'
      }, {
        emoji: '🧅',
        name: 'Onion Salad'
      }]
    }, {
      letter: 'B',
      diet: 'veg',
      votes: 3,
      winner: true,
      items: [{
        emoji: '🫓',
        name: 'Roti'
      }, {
        emoji: '🥬',
        name: 'Bhindi Masala',
        diet: 'veg'
      }, {
        emoji: '🫘',
        name: 'Dal Tadka'
      }, {
        emoji: '🥛',
        name: 'Papad & Curd'
      }]
    }]
  }, {
    id: 't-dinner',
    meal: "Tonight's Dinner",
    hindi: 'रात का खाना',
    when: 'Today · Evening',
    day: 'Today',
    state: 'active',
    closesInSec: 8049,
    // ~2h14m
    combos: [{
      letter: 'A',
      diet: 'veg',
      votes: 2,
      items: [{
        emoji: '🫓',
        name: 'Roti',
        hindi: 'रोटी'
      }, {
        emoji: '🧀',
        name: 'Paneer Butter Masala',
        diet: 'veg'
      }, {
        emoji: '🫘',
        name: 'Dal Tadka'
      }, {
        emoji: '🥗',
        name: 'Boondi Raita'
      }]
    }, {
      letter: 'B',
      diet: 'nonveg',
      votes: 1,
      vegVariant: 'Aloo Gobi instead of Chicken Curry',
      items: [{
        emoji: '🍚',
        name: 'Jeera Rice'
      }, {
        emoji: '🍗',
        name: 'Chicken Curry',
        diet: 'nonveg'
      }, {
        emoji: '🥗',
        name: 'Green Salad'
      }]
    }]
  }, {
    id: 'tm-breakfast',
    meal: 'Tomorrow Breakfast',
    hindi: 'नाश्ता',
    when: 'Tomorrow · Morning',
    day: 'Tomorrow',
    state: 'locked',
    opensInSec: 36120,
    combos: [{
      letter: 'A',
      diet: 'veg',
      votes: 0,
      items: [{
        emoji: '🥔',
        name: 'Stuffed Paratha'
      }, {
        emoji: '🥛',
        name: 'Curd & Pickle'
      }]
    }, {
      letter: 'B',
      diet: 'veg',
      votes: 0,
      items: [{
        emoji: '🍲',
        name: 'Upma',
        hindi: 'उपमा'
      }, {
        emoji: '🥥',
        name: 'Coconut Chutney'
      }]
    }]
  }, {
    id: 'tm-lunch',
    meal: 'Tomorrow Lunch',
    hindi: 'दोपहर का खाना',
    when: 'Tomorrow · Afternoon',
    day: 'Tomorrow',
    state: 'locked',
    opensInSec: 64800,
    combos: [{
      letter: 'A',
      diet: 'veg',
      votes: 0,
      items: [{
        emoji: '🍚',
        name: 'Rice'
      }, {
        emoji: '🥘',
        name: 'Kadhi Pakora',
        diet: 'veg'
      }, {
        emoji: '🥗',
        name: 'Salad'
      }]
    }, {
      letter: 'B',
      diet: 'nonveg',
      votes: 0,
      vegVariant: 'Chana Masala instead of Fish Curry',
      items: [{
        emoji: '🍚',
        name: 'Steamed Rice'
      }, {
        emoji: '🐟',
        name: 'Fish Curry',
        diet: 'nonveg'
      }, {
        emoji: '🥗',
        name: 'Kachumber'
      }]
    }]
  }],
  stock: [
  // Vegetables
  {
    category: 'Vegetables',
    name: 'Onion',
    hindi: 'प्याज़',
    emoji: '🧅',
    qty: 4,
    unit: ' pcs'
  }, {
    category: 'Vegetables',
    name: 'Tomato',
    hindi: 'टमाटर',
    emoji: '🍅',
    qty: 6,
    unit: ' pcs'
  }, {
    category: 'Vegetables',
    name: 'Potato',
    hindi: 'आलू',
    emoji: '🥔',
    qty: 8,
    unit: ' pcs'
  }, {
    category: 'Vegetables',
    name: 'Spinach (Palak)',
    hindi: 'पालक',
    emoji: '🥬',
    qty: 200,
    unit: 'g'
  }, {
    category: 'Vegetables',
    name: 'Capsicum',
    hindi: 'शिमला मिर्च',
    emoji: '🫑',
    qty: 3,
    unit: ' pcs'
  }, {
    category: 'Vegetables',
    name: 'Garlic',
    hindi: 'लहसुन',
    emoji: '🧄',
    qty: 10,
    unit: ' cloves'
  },
  // Dairy
  {
    category: 'Dairy',
    name: 'Paneer',
    hindi: 'पनीर',
    emoji: '🧀',
    qty: 400,
    unit: 'g'
  }, {
    category: 'Dairy',
    name: 'Curd (Yogurt)',
    hindi: 'दही',
    emoji: '🥛',
    qty: 500,
    unit: 'g'
  }, {
    category: 'Dairy',
    name: 'Butter',
    hindi: 'मक्खन',
    emoji: '🧈',
    qty: 200,
    unit: 'g'
  },
  // Grains & Flours
  {
    category: 'Grains & Flours',
    name: 'Wheat Flour (Atta)',
    hindi: 'आटा',
    emoji: '🌾',
    qty: 2,
    unit: 'kg'
  }, {
    category: 'Grains & Flours',
    name: 'Basmati Rice',
    hindi: 'चावल',
    emoji: '🍚',
    qty: 1.5,
    unit: 'kg'
  },
  // Lentils
  {
    category: 'Lentils',
    name: 'Toor Dal',
    hindi: 'तूर दाल',
    emoji: '🫘',
    qty: 500,
    unit: 'g'
  }, {
    category: 'Lentils',
    name: 'Moong Dal',
    hindi: 'मूंग दाल',
    emoji: '🫘',
    qty: 300,
    unit: 'g'
  }],
  // Auto-generated from decided meals; grouped by the meal that needs them.
  grocery: [{
    forMeal: "Tonight's Dinner",
    name: 'Chicken',
    hindi: 'चिकन',
    emoji: '🍗',
    need: 300,
    have: 0,
    unit: 'g'
  }, {
    forMeal: "Tonight's Dinner",
    name: 'Fresh Cream',
    hindi: 'क्रीम',
    emoji: '🥛',
    need: 50,
    have: 0,
    unit: 'ml'
  }, {
    forMeal: "Tonight's Dinner",
    name: 'Ginger',
    hindi: 'अदरक',
    emoji: '🫚',
    need: 15,
    have: 0,
    unit: 'g'
  }, {
    forMeal: "Tonight's Dinner",
    name: 'Onion',
    hindi: 'प्याज़',
    emoji: '🧅',
    need: 2,
    have: 4,
    unit: ' pcs'
  }, {
    forMeal: "Tonight's Dinner",
    name: 'Tomato',
    hindi: 'टमाटर',
    emoji: '🍅',
    need: 4,
    have: 6,
    unit: ' pcs'
  }, {
    forMeal: 'Tomorrow Breakfast',
    name: 'Eggs',
    hindi: 'अंडे',
    emoji: '🥚',
    need: 6,
    have: 0,
    unit: ' pcs'
  }, {
    forMeal: 'Tomorrow Breakfast',
    name: 'Bread',
    hindi: 'ब्रेड',
    emoji: '🍞',
    need: 1,
    have: 0,
    unit: ' pack'
  }, {
    forMeal: 'Tomorrow Breakfast',
    name: 'Onion',
    hindi: 'प्याज़',
    emoji: '🧅',
    need: 1,
    have: 4,
    unit: ' pcs'
  }],
  recipes: [{
    name: 'Paneer Butter Masala',
    hindi: 'पनीर बटर मसाला',
    mins: 35,
    serves: 4,
    steps: ['Sauté onion–tomato masala until oil separates', 'Add cream, butter & kasuri methi', 'Fold in paneer cubes, simmer 5 min']
  }, {
    name: 'Dal Tadka',
    hindi: 'दाल तड़का',
    mins: 25,
    serves: 4,
    steps: ['Pressure-cook toor dal with turmeric', 'Prepare ghee tadka: cumin, garlic, red chili', 'Pour over dal, garnish coriander']
  }],
  notifications: [{
    icon: '🔔',
    title: 'Voting opens for Tonight\u2019s Dinner',
    time: '10:00 AM',
    unread: true
  }, {
    icon: '🛒',
    title: 'Grocery list updated — 3 items short',
    time: '6:02 AM',
    unread: true
  }, {
    icon: '✅',
    title: 'Lunch decided: Roti + Bhindi Masala',
    time: 'Yesterday',
    unread: false
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.DietBadge = __ds_scope.DietBadge;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.InventoryRow = __ds_scope.InventoryRow;

__ds_ns.QtyStepper = __ds_scope.QtyStepper;

__ds_ns.ComboOption = __ds_scope.ComboOption;

__ds_ns.Countdown = __ds_scope.Countdown;

__ds_ns.MealCard = __ds_scope.MealCard;

__ds_ns.AppHeader = __ds_scope.AppHeader;

__ds_ns.BottomNav = __ds_scope.BottomNav;

})();
