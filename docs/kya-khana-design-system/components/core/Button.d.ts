import React from 'react';
import { IconName } from './Icon';

/**
 * Primary action control. Saffron primary with soft/ghost/outline/danger variants.
 *
 * @startingPoint section="Core" subtitle="Saffron action button, 5 variants × 3 sizes" viewport="700x150"
 */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  /** Visual style. Default 'primary'. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  /** Control size. Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Optional leading line icon. */
  iconLeft?: IconName;
  /** Optional trailing line icon. */
  iconRight?: IconName;
  /** Fully rounded pill shape. Default false. */
  pill?: boolean;
  /** Stretch to container width. Default false. */
  fullWidth?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Primary action control. Saffron primary with soft/ghost/outline/danger variants.
 */
export function Button(props: ButtonProps): JSX.Element;
