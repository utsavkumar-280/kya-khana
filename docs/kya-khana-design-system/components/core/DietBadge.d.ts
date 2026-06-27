import React from 'react';

export interface DietBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  /** Diet type. Default 'veg'. */
  type?: 'veg' | 'nonveg';
  /** Text label. Pass a string to override, or `false` to show the mark only. */
  label?: string | false;
  /** Mark size in px (default look only). Default 16. */
  size?: number;
  /** Render as a filled VEG / NON-VEG text pill instead of the square mark. */
  pill?: boolean;
  style?: React.CSSProperties;
}

/** Indian square-and-dot veg / non-veg indicator with optional label. */
export function DietBadge(props: DietBadgeProps): JSX.Element;
