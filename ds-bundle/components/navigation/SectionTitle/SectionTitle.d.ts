import * as React from 'react';

/**
 * SectionTitle — from @plasmamade/ds@1.0.0.
 */
export interface SectionTitleProps {
  /** Section heading text. */
  title: React.ReactNode;
  /** Optional "more" link label shown at the right. */
  moreLabel?: string;
  /** Destination for the "more" link. */
  moreHref?: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const SectionTitle: React.ComponentType<SectionTitleProps>;
