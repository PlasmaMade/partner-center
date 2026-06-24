import * as React from 'react';

/**
 * Chip — from @plasmamade/ds@1.0.0.
 */
export interface ChipProps {
  /** Whether the chip is selected. Selected chips use the green-gradient fill. */
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export declare const Chip: React.ComponentType<ChipProps>;
