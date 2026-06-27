import React from 'react';
import { IconName } from '../core/Icon';

export interface CountdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  /** Deadline as epoch ms. Ticks live toward this. Takes priority over `seconds`. */
  deadline?: number;
  /** Static starting seconds (counts down locally) when no `deadline` given. */
  seconds?: number;
  /** Caption above the timer. Pass empty string to hide. Default 'Voting closes in'. */
  label?: string;
  /** Size. Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon name. Default 'clock'. */
  icon?: IconName;
  /** Layout: 'stack' (caption over digits) or 'pill' (inline pulse pill: "3h 12m left"). Default 'stack'. */
  variant?: 'stack' | 'pill';
  style?: React.CSSProperties;
}

/** Live countdown timer; turns urgent (chili red) under 10 minutes. */
export function Countdown(props: CountdownProps): JSX.Element;
