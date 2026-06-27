import React from 'react';

/**
 * Badge — small status/label pill. Used for meal states (Active / Locked /
 * Decided), counts, and inline meta. For veg/non-veg use DietBadge instead.
 */

const TONES = {
  neutral: { bg: 'var(--neutral-100)', fg: 'var(--neutral-700)' },
  saffron: { bg: 'var(--saffron-100)', fg: 'var(--saffron-700)' },
  active:  { bg: 'var(--saffron-500)', fg: 'var(--neutral-0)' },
  locked:  { bg: 'var(--neutral-100)', fg: 'var(--neutral-500)' },
  decided: { bg: 'var(--veg-50)', fg: 'var(--veg-700)' },
  success: { bg: 'var(--veg-50)', fg: 'var(--veg-700)' },
  warning: { bg: 'var(--warning-bg)', fg: 'var(--saffron-800)' },
  danger:  { bg: 'var(--nonveg-50)', fg: 'var(--nonveg-700)' },
  info:    { bg: 'var(--info-bg)', fg: 'var(--info)' },
};

export function Badge({ children, tone = 'neutral', dot = false, uppercase = false, style = {}, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />}
      {children}
    </span>
  );
}
