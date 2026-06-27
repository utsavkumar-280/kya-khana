import React from 'react';

export interface ComboItem {
  /** Dish name in English. */
  name: string;
  /** Optional Devanagari name shown muted alongside. */
  hindi?: string;
  /** Leading food emoji (falls back to a neutral dot if omitted). */
  emoji?: string;
  /** Optional per-dish VEG / NON-VEG pill (e.g. the protein). */
  diet?: 'veg' | 'nonveg';
  /** Component role: 'Carb' | 'Sabji' | 'Dal' | 'Sides' (optional, free text). */
  role?: string;
}

export interface ComboOptionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  /** Combo letter. Default 'A'. */
  letter?: 'A' | 'B';
  /** Ordered component rows. */
  items?: ComboItem[];
  /** Overall diet of the combo. Default 'veg'. */
  diet?: 'veg' | 'nonveg';
  /** Current vote count. Default 0. */
  votes?: number;
  /** Veg alternative note (non-veg combos only, never breakfast). */
  vegVariant?: string;
  /** Parent meal-card state. Default 'active'. */
  state?: 'active' | 'locked' | 'decided';
  /** This combo is the user's current vote. */
  selected?: boolean;
  /** Decided + won — highlights green with “Chosen”. */
  winner?: boolean;
  /** Vote handler (active only). */
  onVote?: () => void;
  style?: React.CSSProperties;
}

/** One A/B choice in a MealCard: component list, diet, votes, veg-variant note, vote action. */
export function ComboOption(props: ComboOptionProps): JSX.Element;
