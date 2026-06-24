import * as React from 'react';

/**
 * Avatar — from @plasmamade/ds@1.0.0.
 */
export interface AvatarProps {
  /** Initials shown when no image is provided (e.g. "BJ"). */
  initials?: string;
  /** Image URL — when set, shown instead of initials. */
  src?: string;
  /** Image alt text. */
  alt?: string;
  /** Size of the avatar. */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Avatar: React.ComponentType<AvatarProps>;
