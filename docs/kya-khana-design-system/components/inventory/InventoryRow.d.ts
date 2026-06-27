import React from 'react';

export interface InventoryRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  /** Ingredient name (English). */
  name: string;
  /** Optional Devanagari name. */
  hindi?: string;
  /** Leading emoji glyph. Default 🥘. */
  emoji?: string;
  /** Which view this row is in. Default 'stock'. */
  variant?: 'stock' | 'grocery';
  /** Measurement unit, e.g. 'g', 'kg', 'pcs'. */
  unit?: string;

  /** stock: current quantity. */
  qty?: number;
  /** stock: quantity change handler. */
  onQty?: (value: number) => void;

  /** grocery: quantity required by decided meals. */
  need?: number;
  /** grocery: quantity currently in stock. */
  have?: number;
  /** grocery: buy checkbox state. */
  checked?: boolean;
  /** grocery: buy checkbox handler. */
  onCheck?: (checked: boolean) => void;

  style?: React.CSSProperties;
}

/** Ingredient row for both Inventory views: editable stock, or grocery need-vs-have with buy checkbox. */
export function InventoryRow(props: InventoryRowProps): JSX.Element;
