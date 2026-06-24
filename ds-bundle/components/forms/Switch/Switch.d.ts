import * as React from 'react';

/**
 * Switch — from @plasmamade/ds@1.0.0.
 */
export interface SwitchProps {
  /** Accessible label for the toggle (visually hidden, read by screen readers). */
  label?: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Switch: React.ComponentType<SwitchProps>;
