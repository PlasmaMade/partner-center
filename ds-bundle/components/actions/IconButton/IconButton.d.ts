import * as React from 'react';

/**
 * IconButton — from @plasmamade/ds@1.0.0.
 */
export interface IconButtonProps {
  /** The icon to render (inline svg or icon element). */
  icon: React.ReactNode;
  /** Accessible label describing the action — required, the button has no visible text. */
  label: string;
  /** Show a small green notification dot in the corner. */
  dot?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const IconButton: React.ComponentType<IconButtonProps>;
