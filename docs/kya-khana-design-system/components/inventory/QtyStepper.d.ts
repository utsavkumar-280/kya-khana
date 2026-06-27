import React from 'react';

export interface QtyStepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'onChange'> {
  /** Current quantity. Default 0. */
  value?: number;
  /** Increment per tap. Default 1. */
  step?: number;
  /** Minimum. Default 0. */
  min?: number;
  /** Maximum. Default Infinity. */
  max?: number;
  /** Unit suffix, e.g. 'g', 'kg', 'pcs'. */
  unit?: string;
  /** Size. Default 'md'. */
  size?: 'sm' | 'md';
  /** Change handler with the clamped next value. */
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
}

/** Compact +/- quantity control with optional unit, for inventory stock. */
export function QtyStepper(props: QtyStepperProps): JSX.Element;
