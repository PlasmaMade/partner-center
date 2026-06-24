import * as React from 'react';

/**
 * CampaignCard — from @plasmamade/ds@1.0.0.
 */
export interface CampaignCardProps {
  /** Background image URL (covers the card; text overlays a dark gradient). */
  image: string;
  /** Image alt text. */
  imageAlt?: string;
  /** Optional badge above the title (e.g. a <Badge>). */
  badge?: React.ReactNode;
  /** Campaign title (white, over the image). */
  title: React.ReactNode;
  /** Short supporting line. */
  description?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const CampaignCard: React.ComponentType<CampaignCardProps>;
