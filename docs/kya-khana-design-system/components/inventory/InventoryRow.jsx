import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { QtyStepper } from './QtyStepper.jsx';

/**
 * InventoryRow — a single ingredient line, used in both Inventory views.
 *   variant="stock"   → name + editable QtyStepper
 *   variant="grocery" → name + required-vs-available + buy checkbox
 * Grocery rows show a "short by N" pill when stock can't cover the need.
 */

export function InventoryRow({
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

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: 'var(--space-3) var(--space-4)',
        background: 'var(--surface-card)',
        borderBottom: '1px solid var(--border)',
        ...(variant === 'grocery' && !enough && !checked ? { boxShadow: 'inset 3px 0 0 var(--nonveg-300)' } : {}),
        ...(variant === 'grocery' && (enough || checked) ? { opacity: 0.55 } : {}),
        ...style,
      }}
      {...rest}
    >
      {/* leading glyph */}
      <span style={{
        width: 40, height: 40, flexShrink: 0, display: 'grid', placeItems: 'center',
        borderRadius: 13, background: 'var(--surface-sunken)', fontSize: 20,
      }}>{emoji || '🥘'}</span>

      {/* name */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--text-primary)', textDecoration: variant === 'grocery' && (enough || checked) ? 'line-through' : 'none' }}>
          {name}
          {hindi && <span style={{ fontFamily: 'var(--font-deva)', fontWeight: 500, color: 'var(--text-muted)', marginLeft: 6, fontSize: 'var(--text-sm)' }}>{hindi}</span>}
        </div>
        {variant === 'grocery' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 3 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--text-secondary)' }}>
              {enough ? 'already have it' : `${need}${unit}`}
            </span>
            {!enough
              ? <span style={{ fontFamily: 'var(--font-display)', fontSize: '9px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--nonveg-500)', background: 'var(--nonveg-bg)', padding: '2px 7px', borderRadius: 'var(--radius-pill)' }}>Need to buy</span>
              : <span style={{ fontFamily: 'var(--font-display)', fontSize: '9px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--veg-500)', background: 'var(--veg-bg)', padding: '2px 7px', borderRadius: 'var(--radius-pill)' }}>In stock</span>}
          </div>
        )}
      </div>

      {/* trailing control */}
      {variant === 'stock' ? (
        <QtyStepper value={qty} unit={unit} size="sm" onChange={onQty} />
      ) : enough ? (
        <span aria-label="Already in stock" style={{
          width: 28, height: 28, flexShrink: 0, display: 'grid', placeItems: 'center',
          borderRadius: '50%', background: 'var(--veg-bg)', color: 'var(--veg-600)',
        }}>
          <Icon name="check" size={16} strokeWidth={2.8} />
        </span>
      ) : (
        <button
          onClick={() => onCheck && onCheck(!checked)}
          aria-label={checked ? 'Bought' : 'Mark to buy'}
          style={{
            width: 28, height: 28, flexShrink: 0, display: 'grid', placeItems: 'center',
            borderRadius: 9, cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
            border: checked ? 'none' : '1.5px solid var(--border-strong)',
            background: checked ? 'var(--veg-500)' : 'var(--surface-card)',
            color: '#fff', transition: 'background var(--duration-fast), border-color var(--duration-fast)',
          }}
        >
          {checked && <Icon name="check" size={16} strokeWidth={2.8} />}
        </button>
      )}
    </div>
  );
}
