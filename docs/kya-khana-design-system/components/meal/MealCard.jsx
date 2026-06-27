import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { Icon } from '../core/Icon.jsx';
import { Countdown } from './Countdown.jsx';
import { ComboOption } from './ComboOption.jsx';

/**
 * MealCard — the core Dashboard unit. One card = one meal (e.g. "Tonight's
 * Dinner"). Three states drive its whole look:
 *   active  — full color, inline live-countdown pill, two votable combo columns
 *   locked  — greyed, a collapsed dish preview + "voting opens soon"
 *   decided — past; a calm result strip ("What we ate") of the winning combo
 */

export function MealCard({
  meal = 'Dinner',
  hindi,
  when = 'Today · Evening',
  state = 'active',
  deadline,
  seconds,
  combos = [],            // [{ letter, diet, votes, items, vegVariant, selected, winner }]
  userVote,               // 'A' | 'B'
  onVote,                 // (letter) => void
  snapped = false,
  style = {},
  ...rest
}) {
  const isLocked = state === 'locked';
  const isDecided = state === 'decided';
  const isActive = state === 'active';

  const winner = combos.find((c) => c.winner) || combos[0];
  const previewItems = (combos[0]?.items || []);

  const eyebrowColor = isActive ? 'var(--accent)' : 'var(--text-secondary)';
  const titleColor = isDecided ? 'var(--text-secondary)' : 'var(--text-primary)';

  return (
    <article
      style={{
        background: isDecided ? 'var(--neutral-50)' : 'var(--surface-card)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid',
        borderColor: snapped ? 'var(--saffron-200)' : 'var(--border)',
        boxShadow: snapped ? 'var(--shadow-snap)' : 'var(--shadow-sm)',
        padding: isActive ? '16px 14px 14px' : '14px 16px',
        opacity: isLocked ? 0.66 : 1,
        transition: 'box-shadow var(--duration-base) var(--ease-snap), opacity var(--duration-base)',
        ...style,
      }}
      {...rest}
    >
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: isActive ? 12 : 0, padding: isActive ? '0 2px' : 0 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xs)', fontWeight: 700,
            letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: eyebrowColor,
            marginBottom: 4,
          }}>{when}</div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800,
            color: titleColor, lineHeight: 1.05, letterSpacing: 'var(--tracking-tight)',
          }}>
            {meal}
            {hindi && <span style={{ fontFamily: 'var(--font-deva)', fontWeight: 600, color: 'var(--text-muted)', fontSize: 'var(--text-md)', marginLeft: 7 }}>{hindi}</span>}
          </h3>
        </div>

        {isActive && (
          <Countdown variant="pill" deadline={deadline} seconds={seconds} />
        )}
        {isLocked && (
          <Badge tone="locked" uppercase><Icon name="lock" size={12} /> Locked</Badge>
        )}
        {isDecided && (
          <Badge tone="decided" uppercase>✅ Decided</Badge>
        )}
      </div>

      {/* ACTIVE — two combo columns side by side */}
      {isActive && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {combos.map((c) => (
            <ComboOption
              key={c.letter}
              letter={c.letter}
              diet={c.diet}
              votes={c.votes}
              items={c.items}
              vegVariant={c.vegVariant}
              state="active"
              selected={userVote === c.letter}
              onVote={() => onVote && onVote(c.letter)}
            />
          ))}
        </div>
      )}

      {/* LOCKED — collapsed preview */}
      {isLocked && (
        <div style={{ marginTop: 14 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xs)', fontWeight: 700,
            letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)',
            marginBottom: 6,
          }}>Preview</div>
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
            lineHeight: 1.45,
          }}>
            {previewItems.map((it) => it.name).join(' · ')}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12,
            padding: '10px', borderRadius: 'var(--radius-md)', background: 'var(--neutral-50)',
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-muted)',
          }}>
            <Icon name="lock" size={14} /> Voting opens soon
          </div>
        </div>
      )}

      {/* DECIDED — what the household ate */}
      {isDecided && winner && (
        <div style={{ marginTop: 14 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xs)', fontWeight: 700,
            letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)',
            marginBottom: 8,
          }}>What we ate</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {winner.items.map((it, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: 'var(--surface-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '6px 9px',
                fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)',
              }}>
                <span aria-hidden="true">{it.emoji || '•'}</span>{it.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
