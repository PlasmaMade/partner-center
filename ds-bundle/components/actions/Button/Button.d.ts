import * as React from 'react';

/**
 * Button — from @plasmamade/ds@1.0.0.
 * @replaces button
 */
export interface ButtonProps {
  /** Visual style. `primary` is the green-gradient CTA, `ghost` a bordered secondary, `dark` the near-black action, `white` f */
  variant?: "dark" | "primary" | "ghost" | "white";
  /** Size of the button. */
  size?: "sm" | "md" | "lg";
  /** Stretch to the full width of the container. */
  block?: boolean;
  /** Optional leading icon (an inline svg or icon element). */
  icon?: React.ReactNode;
  /** Optional trailing icon. */
  iconRight?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Button: React.ComponentType<ButtonProps>;
