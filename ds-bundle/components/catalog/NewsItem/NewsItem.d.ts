import * as React from 'react';

/**
 * NewsItem — from @plasmamade/ds@1.0.0.
 */
export interface NewsItemProps {
  /** Day number shown in the date badge. */
  day: string | number;
  /** Short month label shown under the day, e.g. "JUN". */
  month: string;
  /** Headline. */
  title: React.ReactNode;
  /** Short excerpt. */
  description?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const NewsItem: React.ComponentType<NewsItemProps>;
