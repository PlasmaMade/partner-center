CampaignCard from @plasmamade/ds. Use via `window.PlasmaMade.CampaignCard` (bundle loaded from the root `_ds_bundle.js`).

Campaign card — a full-bleed image with a dark bottom gradient and white
title/description overlay. Used for seasonal campaigns and promotions.

@category Catalog

## Props

```ts
interface CampaignCardProps {
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
```

## Examples

### Default

```jsx
() => (
  <div style={{ maxWidth: 360 }}>
    <CampaignCard
      image={campaignImg}
      badge={<Badge tone="green">Zomeractie</Badge>}
      title="Frisse lucht, hele zomer"
      description="Kant-en-klare social posts en banners voor de zomercampagne."
    />
  </div>
)
```

### Pair

```jsx
() => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 16, maxWidth: 560 }}>
    <CampaignCard image={campaignImg} badge={<Badge tone="green">Zomeractie</Badge>} title="Frisse lucht, hele zomer" description="Social posts en banners." />
    <CampaignCard image={campaignImg} badge={<Badge tone="dark">Nieuw</Badge>} title="Ultrafine lancering" description="Introduceer de nieuwe lijn." />
  </div>
)
```
