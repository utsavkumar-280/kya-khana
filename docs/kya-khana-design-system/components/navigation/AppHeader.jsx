import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * AppHeader — the app's sticky top bar.
 * Left: the kya-khana wordmark (brand). Right: an optional date quick-jump
 * pill (calendar + day + chevron) and/or a notification bell. Sits on a soft
 * cream-to-transparent gradient so content scrolls cleanly beneath it.
 */

export function AppHeader({
  brand,
  date,
  onDate,
  onBell,
  notifications = 0,
  showBell = false,
  style = {},
  ...rest
}) {
  const wordmark = brand ?? (
    <span style={{
      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-xl)',
      letterSpacing: 'var(--tracking-tight)', color: 'var(--text-brand)',
    }}>
      kya<span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>-</span>khana
    </span>
  );

  return (
    <header
      style={{
        position: 'relative', zIndex: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        height: 'var(--header-height)', padding: '0 18px',
        background: 'linear-gradient(to bottom, var(--bg-app) 72%, color-mix(in srgb, var(--bg-app) 0%, transparent))',
        ...style,
      }}
      {...rest}
    >
      {wordmark}

      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {/* Date quick-jump pill */}
        {date && (
          <button
            onClick={onDate}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'var(--surface-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)', padding: '8px 12px 8px 11px',
              boxShadow: 'var(--shadow-sm)', cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)',
              color: 'var(--text-primary)', WebkitTapHighlightColor: 'transparent',
            }}
          >
            <Icon name="calendar" size={17} color="var(--accent)" />
            {date}
            <Icon name="chevron-down" size={16} color="var(--text-muted)" />
          </button>
        )}

        {/* Notification bell */}
        {showBell && (
          <button
            onClick={onBell}
            aria-label="Notifications"
            style={{
              position: 'relative',
              width: 40, height: 40, display: 'grid', placeItems: 'center',
              border: '1px solid var(--border)', background: 'var(--surface-card)',
              borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--text-secondary)',
              boxShadow: 'var(--shadow-sm)', WebkitTapHighlightColor: 'transparent',
            }}
          >
            <Icon name="bell" size={20} />
            {notifications > 0 && (
              <span style={{
                position: 'absolute', top: -5, right: -5, minWidth: 18, height: 18, padding: '0 4px',
                display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-pill)',
                background: 'var(--nonveg-500)', color: '#fff',
                fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', fontSize: 10, fontWeight: 800,
                border: '2px solid var(--bg-app)',
              }}>{notifications > 9 ? '9+' : notifications}</span>
            )}
          </button>
        )}
      </span>
    </header>
  );
}
