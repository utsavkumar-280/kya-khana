import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * BottomNav — the always-visible 3-tab bottom navigation.
 * Inventory · Dashboard · More (Dashboard centered). The current tab is
 * orange-highlighted with a soft pill behind its icon.
 */

const DEFAULT_TABS = [
  { id: 'inventory', label: 'Inventory', icon: 'package' },
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'more', label: 'More', icon: 'more' },
];

export function BottomNav({ active = 'dashboard', onChange, tabs = DEFAULT_TABS, style = {}, ...rest }) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'stretch',
        height: 'var(--bottom-nav-height)',
        background: 'var(--surface-card)',
        borderTop: '1px solid var(--border)',
        boxShadow: 'var(--shadow-nav)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        ...style,
      }}
      {...rest}
    >
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button
            key={t.id}
            onClick={() => onChange && onChange(t.id)}
            style={{
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
              transition: 'color var(--duration-fast)',
            }}
          >
            <span style={{
              display: 'grid', placeItems: 'center', width: 54, height: 32,
              borderRadius: 'var(--radius-pill)',
              background: on ? 'var(--primary-soft)' : 'transparent',
              transition: 'background var(--duration-fast)',
            }}>
              <Icon name={t.icon} size={21} strokeWidth={on ? 2.4 : 2} />
            </span>
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
