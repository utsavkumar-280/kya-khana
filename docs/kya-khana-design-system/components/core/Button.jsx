import React from 'react';
import { Icon } from './Icon.jsx';

/**
 * Button — primary action control for Kya Khana.
 * Warm saffron primary, soft secondary, quiet ghost. Pill or rounded.
 */

const SIZES = {
  sm: { padding: '8px 14px', fontSize: 'var(--text-sm)', height: 36, gap: 6, icon: 16 },
  md: { padding: '11px 18px', fontSize: 'var(--text-md)', height: 44, gap: 8, icon: 18 },
  lg: { padding: '14px 22px', fontSize: 'var(--text-lg)', height: 52, gap: 9, icon: 20 },
};

function variantStyle(variant) {
  switch (variant) {
    case 'secondary':
      return { background: 'var(--saffron-50)', color: 'var(--saffron-700)', border: '1.5px solid var(--saffron-200)' };
    case 'ghost':
      return { background: 'transparent', color: 'var(--text-secondary)', border: '1.5px solid transparent' };
    case 'outline':
      return { background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1.5px solid var(--border-strong)' };
    case 'danger':
      return { background: 'var(--nonveg-500)', color: 'var(--neutral-0)', border: '1.5px solid transparent' };
    case 'primary':
    default:
      return { background: 'var(--primary)', color: 'var(--on-primary)', border: '1.5px solid transparent' };
  }
}

export function Button({
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
    ...style,
  };
  return (
    <button
      type={type}
      disabled={disabled}
      style={base}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.97)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size={s.icon} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.icon} />}
    </button>
  );
}
