import * as React from 'react';

/**
 * Badge — from @plasmamade/ds@1.0.0.
 */
export interface BadgeProps {
  /** Colour treatment. `green` is the solid gradient, `green-soft` the tinted default, `warn`/`info` for statuses, `outline`/ */
  tone?: "green" | "green-soft" | "grey" | "outline" | "dark" | "warn" | "info";
  /** Optional leading icon. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export declare const Badge: React.ComponentType<BadgeProps>;
