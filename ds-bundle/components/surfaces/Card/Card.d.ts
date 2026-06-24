import * as React from 'react';

/**
 * Card — from @plasmamade/ds@1.0.0.
 */
export interface CardProps {
  /** Add the lift-on-hover interaction (use for clickable cards). */
  hover?: boolean;
  /** Render children without the default padded body (for edge-to-edge media). */
  bare?: boolean;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export declare const Card: React.ComponentType<CardProps>;
