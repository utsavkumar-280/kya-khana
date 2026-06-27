import React from 'react';

/**
 * DietBadge — the vegetarian / non-vegetarian indicator.
 * Two looks:
 *   default — the familiar Indian square-and-dot mark (green veg, red non-veg)
 *             with an optional text label. Use beside combo / dish titles.
 *   pill    — a small filled text pill (VEG / NON-VEG) for inline dish tags.
 */

export function DietBadge({ type = 'veg', label, size = 16, pill = false, style = {}, ...rest }) {
  const isVeg = type === 'veg';
  const color = isVeg ? 'var(--veg-500)' : 'var(--nonveg-500)';
  const text = label ?? (isVeg ? 'Veg' : 'Non-Veg');

  if (pill) {
    return (
      <span
        role="img"
        aria-label={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
        style={{
          display: 'inline-flex', alignItems: 'center', flexShrink: 0,
          padding: '2px 7px', borderRadius: 'var(--radius-pill)',
          background: isVeg ? 'var(--veg-bg)' : 'var(--nonveg-bg)',
          color,
          fontFamily: 'var(--font-display)', fontSize: '9px', fontWeight: 800,
          letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.4,
          whiteSpace: 'nowrap',
          ...style,
        }}
        {...rest}
      >
        {text}
      </span>
    );
  }

  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...style }}
      role="img"
      aria-label={isVeg ? 'Vegetarian' : 'Non-vegetarian'}
      {...rest}
    >
      <span
        style={{
          width: size,
          height: size,
          flexShrink: 0,
          border: `1.5px solid ${color}`,
          borderRadius: 3,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <span style={{ width: size * 0.45, height: size * 0.45, borderRadius: '50%', background: color }} />
      </span>
      {label !== false && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-semibold)',
            color,
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}
