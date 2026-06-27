import React from 'react';
import { DietBadge } from '../core/DietBadge.jsx';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';

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

export function ComboOption({
  letter = 'A',
  items = [],
  diet = 'veg',
  votes = 0,
  vegVariant,
  state = 'active',          // 'active' | 'locked' | 'decided'
  selected = false,          // user voted for this combo
  winner = false,            // decided + won
  onVote,
  style = {},
  ...rest
}) {
  const isActive = state === 'active';
  const voteGlyph = diet === 'veg' ? '🟢' : '🍗';

  const accent = winner ? 'var(--veg-500)'
    : selected ? 'var(--saffron-500)'
    : 'var(--border)';
  const tagColor = winner ? 'var(--veg-700)'
    : selected ? 'var(--accent)'
    : 'var(--text-secondary)';

  return (
    <div
      style={{
        position: 'relative',
        border: `1.5px solid ${accent}`,
        background: winner ? 'var(--veg-50)' : selected ? 'var(--accent-soft)' : 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-3) var(--space-3) var(--space-4)',
        transition: 'border-color var(--duration-base), background var(--duration-base)',
        ...style,
      }}
      {...rest}
    >
      {/* header — combo tag + live vote count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xs)', fontWeight: 800,
          letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: tagColor,
        }}>Combo {letter}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {winner && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--veg-700)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
              <Icon name="check-circle" size={14} /> Chosen
            </span>
          )}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums',
            fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-secondary)',
          }}>
            <span style={{ fontFamily: 'var(--font-sans)' }}>{voteGlyph}</span>
            {votes}
          </span>
        </span>
      </div>

      {/* component list — emoji + dish name + optional diet pill */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 18, flexShrink: 0, textAlign: 'center', fontSize: 15 }} aria-hidden="true">{it.emoji || '•'}</span>
            <span style={{ flex: 1, minWidth: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {it.name}
              {it.hindi && <span style={{ fontFamily: 'var(--font-deva)', fontWeight: 500, color: 'var(--text-muted)', marginLeft: 6, fontSize: 'var(--text-xs)' }}>{it.hindi}</span>}
            </span>
            {it.diet && <DietBadge type={it.diet} pill />}
          </div>
        ))}
      </div>

      {/* veg variant note */}
      {vegVariant && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 7, marginTop: 12,
          padding: '8px 10px', borderRadius: 'var(--radius-md)',
          background: 'var(--veg-50)', border: '1px dashed var(--veg-300)',
        }}>
          <span style={{ fontSize: 13, lineHeight: 1.3 }}>🌿</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--veg-700)', lineHeight: 'var(--leading-snug)' }}>
            <strong style={{ fontWeight: 700 }}>Veg option:</strong> {vegVariant} <span style={{ color: 'var(--veg-600)' }}>— cooked alongside if this combo wins.</span>
          </span>
        </div>
      )}

      {/* action */}
      {isActive && (
        <Button
          variant={selected ? 'primary' : 'secondary'}
          fullWidth
          size="md"
          iconLeft={selected ? 'check' : undefined}
          onClick={onVote}
          style={{ marginTop: 14 }}
        >
          {selected ? 'Your vote' : `Vote Combo ${letter}`}
        </Button>
      )}
    </div>
  );
}
