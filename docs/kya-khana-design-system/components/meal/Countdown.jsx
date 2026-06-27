import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Countdown — live deadline timer for an active or locked meal card.
 * Ticks every second toward a deadline. Turns urgent (turmeric → chili)
 * as time runs low. Pass `deadline` (epoch ms) or `seconds` (static start).
 */

function fmt(total) {
  const t = Math.max(0, Math.floor(total));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

// Compact human label for the pill variant: "3h 12m left" / "12m left" / "45s left".
function fmtPill(total) {
  const t = Math.max(0, Math.floor(total));
  if (t <= 0) return 'Closed';
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m left`;
  if (m > 0) return `${m}m left`;
  return `${s}s left`;
}

export function Countdown({
  deadline,
  seconds = 0,
  label = 'Voting closes in',
  size = 'md',
  icon = 'clock',
  variant = 'stack',          // 'stack' (label over digits) | 'pill' (inline pulse pill)
  style = {},
  ...rest
}) {
  const compute = React.useCallback(
    () => (deadline ? (deadline - Date.now()) / 1000 : seconds),
    [deadline, seconds]
  );
  const [remaining, setRemaining] = React.useState(compute());

  React.useEffect(() => {
    setRemaining(compute());
    const id = setInterval(() => {
      setRemaining((prev) => (deadline ? (deadline - Date.now()) / 1000 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [deadline, compute]);

  const urgent = remaining <= 600;        // < 10 min
  const warn = remaining <= 1800 && !urgent; // < 30 min
  const color = remaining <= 0
    ? 'var(--text-muted)'
    : urgent ? 'var(--nonveg-600)'
    : warn ? 'var(--timer)'
    : 'var(--saffron-600)';

  // ---- pill variant: pulse dot + "Xh YYm left", warm timer pill ----
  if (variant === 'pill') {
    const live = remaining > 0;
    const pillColor = remaining <= 0 ? 'var(--text-muted)' : urgent ? 'var(--nonveg-600)' : 'var(--timer)';
    const pillBg = remaining <= 0 ? 'var(--neutral-50)' : urgent ? 'var(--nonveg-50)' : 'var(--timer-bg)';
    return (
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
          padding: '7px 11px', borderRadius: 'var(--radius-pill)',
          background: pillBg, color: pillColor,
          fontFamily: 'var(--font-display)', fontVariantNumeric: 'tabular-nums',
          fontSize: 'var(--text-xs)', fontWeight: 800, whiteSpace: 'nowrap',
          ...style,
        }}
        {...rest}
      >
        {live
          ? <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'currentColor', animation: 'kk-pulse 1.6s ease-in-out infinite' }} />
          : <Icon name={icon} size={14} color="currentColor" />}
        {fmtPill(remaining)}
      </span>
    );
  }

  const dims = {
    sm: { num: 'var(--text-lg)', lab: 'var(--text-2xs)', icon: 14 },
    md: { num: 'var(--text-2xl)', lab: 'var(--text-xs)', icon: 16 },
    lg: { num: 'var(--text-4xl)', lab: 'var(--text-sm)', icon: 20 },
  }[size] || { num: 'var(--text-2xl)', lab: 'var(--text-xs)', icon: 16 };

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 2, ...style }} {...rest}>
      {label && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontFamily: 'var(--font-sans)', fontSize: dims.lab, fontWeight: 'var(--weight-semibold)',
          letterSpacing: 'var(--tracking-wide)', color: 'var(--text-secondary)',
        }}>
          <Icon name={icon} size={dims.icon} color={color} />
          {label}
        </span>
      )}
      <span style={{
        fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums',
        fontSize: dims.num, fontWeight: 'var(--weight-extrabold)', letterSpacing: '-0.02em',
        lineHeight: 1, color,
      }}>
        {remaining <= 0 ? 'Closed' : fmt(remaining)}
      </span>
    </div>
  );
}
