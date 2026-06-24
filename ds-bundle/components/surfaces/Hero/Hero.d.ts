import * as React from 'react';

/**
 * Hero — from @plasmamade/ds@1.0.0.
 */
export interface HeroProps {
  /** Small uppercase eyebrow above the title. */
  eyebrow?: string;
  /** Main heading. */
  title: React.ReactNode;
  /** Supporting paragraph. */
  description?: React.ReactNode;
  /** Action buttons — use Button with variant="white". */
  actions?: React.ReactNode;
  /** Optional media on the right (e.g. a product image). */
  media?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Hero: React.ComponentType<HeroProps>;
