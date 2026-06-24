KbCard from @plasmamade/ds. Use via `window.PlasmaMade.KbCard` (bundle loaded from the root `_ds_bundle.js`).

Knowledge-base topic card — an icon badge, category, title and summary.
Used in the support / knowledge grids to lead into articles.

@category Catalog

## Props

```ts
interface KbCardProps {
  /** Icon shown in the rounded green badge. */
  icon?: React.ReactNode;
  /** Uppercase green category label. */
  category?: string;
  /** Article / topic title. */
  title: string;
  /** Short summary. */
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
  <div style={{ maxWidth: 280 }}>
    <KbCard
      icon={<IconBook />}
      category="Installatie"
      title="Unit aansluiten op de afzuigkap"
      description="Stap voor stap door de montage van een recirculatie-unit."
    />
  </div>
)
```

### Grid

```jsx
() => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 16 }}>
    <KbCard icon={<IconBook />} category="Installatie" title="Unit aansluiten" description="Montage van een recirculatie-unit." />
    <KbCard icon={<IconHeadset />} category="Support" title="Veelgestelde vragen" description="Antwoorden op de meestgestelde vragen." />
    <KbCard icon={<IconShield />} category="Garantie" title="Garantievoorwaarden" description="Wat valt onder de fabrieksgarantie?" />
  </div>
)
```
