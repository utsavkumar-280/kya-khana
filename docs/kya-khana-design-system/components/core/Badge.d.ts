import React from 'react';

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  /** Color tone. Meal states use active/locked/decided. Default 'neutral'. */
  tone?: 'neutral' | 'saffron' | 'active' | 'locked' | 'decided' | 'success' | 'warning' | 'danger' | 'info';
  /** Show a leading status dot. Default false. */
  dot?: boolean;
  /** Uppercase + wide tracking (eyebrow style). Default false. */
  uppercase?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** Small status/label pill — meal states, counts, meta. Diet uses DietBadge. */
export function Badge(props: BadgeProps): JSX.Element;
