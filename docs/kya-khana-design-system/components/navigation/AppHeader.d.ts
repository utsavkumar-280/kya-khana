import React from 'react';

export interface AppHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  /** Brand node shown on the left. Defaults to the kya-khana wordmark. */
  brand?: React.ReactNode;
  /** Day label for the date quick-jump pill, e.g. 'Today'. Omit to hide the pill. */
  date?: string;
  /** Date pill handler. */
  onDate?: () => void;
  /** Notification bell handler. */
  onBell?: () => void;
  /** Show the notification bell on the right. Default false. */
  showBell?: boolean;
  /** Unread notification count (badge). Default 0. */
  notifications?: number;
  style?: React.CSSProperties;
}

/** Sticky top bar: kya-khana wordmark + optional date quick-jump pill / bell. */
export function AppHeader(props: AppHeaderProps): JSX.Element;
