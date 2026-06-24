NewsItem from @plasmamade/ds. Use via `window.PlasmaMade.NewsItem` (bundle loaded from the root `_ds_bundle.js`).

News / update list row — a green date badge beside a headline and excerpt.
Used for the partner-center news feed.

@category Catalog

## Props

```ts
interface NewsItemProps {
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
```

## Examples

### Default

```jsx
() => (
  <div style={{ maxWidth: 560 }}>
    <NewsItem
      day="12"
      month="jun"
      title="Nieuwe totaalbrochure 2026 beschikbaar"
      description="Download de bijgewerkte brochure met het volledige assortiment en de nieuwe Ultrafine-lijn."
    />
  </div>
)
```

### Feed

```jsx
() => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560 }}>
    <NewsItem day="12" month="jun" title="Nieuwe totaalbrochure 2026 beschikbaar" description="Het volledige assortiment plus de nieuwe Ultrafine-lijn." />
    <NewsItem day="03" month="jun" title="Webinar: meer verkopen met PlasmaMade" description="Schrijf je in voor de online sessie van 20 juni." />
    <NewsItem day="28" month="mei" title="Levertijden bijgewerkt" description="Actuele levertijden voor alle units staan online." />
  </div>
)
```
