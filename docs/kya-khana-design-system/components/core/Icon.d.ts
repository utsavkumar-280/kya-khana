import React from 'react';

export type IconName =
  | 'home' | 'package' | 'more' | 'calendar' | 'clock' | 'check' | 'check-circle'
  | 'plus' | 'minus' | 'chevron-down' | 'chevron-right' | 'chevron-up' | 'bell'
  | 'share' | 'chef-hat' | 'lock' | 'leaf' | 'search' | 'user' | 'x'
  | 'arrow-up' | 'refresh' | 'utensils' | 'clipboard' | 'log-out';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Icon name from the Kya Khana line set (Lucide-derived). */
  name: IconName;
  /** Pixel size (width = height). Default 22. */
  size?: number;
  /** Stroke weight. Default 2. */
  strokeWidth?: number;
  /** Stroke color. Default currentColor. */
  color?: string;
}

/** Line-icon set for interface chrome. Diet/food semantics use emoji, not this. */
export function Icon(props: IconProps): JSX.Element;
