import * as React from 'react';

/**
 * Toast — from @plasmamade/ds@1.0.0.
 */
export interface ToastProps {
  /** Accent tone of the leading icon. */
  tone?: "warn" | "success" | "danger";
  /** Optional leading icon. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export declare const Toast: React.ComponentType<ToastProps>;
