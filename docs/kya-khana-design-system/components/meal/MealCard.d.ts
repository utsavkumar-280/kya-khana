import React from 'react';
import { ComboItem } from './ComboOption';

export interface MealCombo {
  letter: 'A' | 'B';
  diet: 'veg' | 'nonveg';
  votes: number;
  items: ComboItem[];
  /** Veg alternative note for non-veg combos (omit for breakfast). */
  vegVariant?: string;
  /** Marks the winning combo when state is 'decided'. */
  winner?: boolean;
}

/**
 * The core Dashboard meal unit — two combos with active / locked / decided states.
 *
 * @startingPoint section="Meal" subtitle="Full meal card with countdown, combos & voting" viewport="390x560"
 */
export interface MealCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  /** Meal title, e.g. "Tonight's Dinner". */
  meal?: string;
  /** Optional Devanagari label. */
  hindi?: string;
  /** Eyebrow context, e.g. "Today · Evening". */
  when?: string;
  /** Card state. Default 'active'. */
  state?: 'active' | 'locked' | 'decided';
  /** Deadline epoch ms for the countdown (close time for active, open time for locked). */
  deadline?: number;
  /** Static seconds fallback when no deadline. */
  seconds?: number;
  /** The two combos. */
  combos?: MealCombo[];
  /** The user's current vote letter. */
  userVote?: 'A' | 'B';
  /** Vote handler. */
  onVote?: (letter: 'A' | 'B') => void;
  /** Apply the snapped-to-top elevation glow. */
  snapped?: boolean;
  style?: React.CSSProperties;
}

/** The core Dashboard meal unit — two combos with active / locked / decided states. */
export function MealCard(props: MealCardProps): JSX.Element;
