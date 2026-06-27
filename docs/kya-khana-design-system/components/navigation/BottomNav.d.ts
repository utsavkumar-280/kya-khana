import React from 'react';
import { IconName } from '../core/Icon';

export interface NavTab {
  id: string;
  label: string;
  icon: IconName;
}

export interface BottomNavProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'onChange'> {
  /** Active tab id. Default 'dashboard'. */
  active?: string;
  /** Tab change handler. */
  onChange?: (id: string) => void;
  /** Override the default Dashboard/Inventory/More tabs. */
  tabs?: NavTab[];
  style?: React.CSSProperties;
}

/** Always-visible 3-tab bottom navigation; current tab saffron-highlighted. */
export function BottomNav(props: BottomNavProps): JSX.Element;
