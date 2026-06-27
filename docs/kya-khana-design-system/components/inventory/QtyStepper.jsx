import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * QtyStepper — compact +/- quantity control for inventory stock.
 * Shows the current amount with an optional unit (g, kg, pcs, ...).
 */

export function QtyStepper({
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
  const dims = size === 'sm'
    ? { btnW: 32, btnH: 30, font: 'var(--text-sm)', icon: 15, w: 58 }
    : { btnW: 38, btnH: 34, font: 'var(--text-md)', icon: 17, w: 70 };

  const set = (next) => {
    const clamped = Math.min(max, Math.max(min, next));
    onChange && onChange(clamped);
  };

  const btnStyle = (disabled) => ({
    width: dims.btnW, height: dims.btnH, flexShrink: 0,
    display: 'grid', placeItems: 'center',
    border: 'none', background: disabled ? 'var(--neutral-50)' : 'var(--accent-soft)',
    color: disabled ? 'var(--neutral-300)' : 'var(--primary)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    WebkitTapHighlightColor: 'transparent',
    transition: 'background var(--duration-fast), color var(--duration-fast)',
  });

  // press-fill: darken to the solid primary on active press
  const press = (e, on) => {
    if (e.currentTarget.getAttribute('aria-disabled') === 'true') return;
    e.currentTarget.style.background = on ? 'var(--primary)' : 'var(--accent-soft)';
    e.currentTarget.style.color = on ? 'var(--on-primary)' : 'var(--primary)';
  };

  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center',
        border: '1.5px solid var(--primary)', borderRadius: 'var(--radius-pill)',
        overflow: 'hidden', ...style,
      }}
      {...rest}
    >
      <button
        style={btnStyle(value <= min)} disabled={value <= min}
        aria-disabled={value <= min}
        onMouseDown={(e) => press(e, true)} onMouseUp={(e) => press(e, false)} onMouseLeave={(e) => press(e, false)}
        onClick={() => set(value - step)} aria-label="Decrease"
      >
        <Icon name="minus" size={dims.icon} strokeWidth={2.6} />
      </button>
      <span style={{
        minWidth: dims.w, textAlign: 'center', padding: '0 4px',
        fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums',
        fontSize: dims.font, fontWeight: 'var(--weight-extrabold)', color: 'var(--text-primary)',
      }}>
        {value}{unit && <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-secondary)', marginLeft: 2, fontSize: 'var(--text-xs)' }}>{unit}</span>}
      </span>
      <button
        style={btnStyle(value >= max)} disabled={value >= max}
        aria-disabled={value >= max}
        onMouseDown={(e) => press(e, true)} onMouseUp={(e) => press(e, false)} onMouseLeave={(e) => press(e, false)}
        onClick={() => set(value + step)} aria-label="Increase"
      >
        <Icon name="plus" size={dims.icon} strokeWidth={2.6} />
      </button>
    </div>
  );
}
