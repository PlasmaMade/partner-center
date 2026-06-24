Badge from @plasmamade/ds. Use via `window.PlasmaMade.Badge` (bundle loaded from the root `_ds_bundle.js`).

Small status/label pill. The compact way to flag state ("Nieuw", "Actief"),
counts, or category labels.

@category Feedback

## Props

```ts
interface BadgeProps {
  /** Colour treatment. `green` is the solid gradient, `green-soft` the tinted default, `warn`/`info` for statuses, `outline`/ */
  tone?: "green" | "green-soft" | "grey" | "outline" | "dark" | "warn" | "info";
  /** Optional leading icon. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}
```

## Examples

### Tones

```jsx
() => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
    <Badge tone="green">Bestseller</Badge>
    <Badge tone="green-soft">Nieuw</Badge>
    <Badge tone="warn">Beperkte voorraad</Badge>
    <Badge tone="info">Pre-order</Badge>
    <Badge tone="dark">Pro</Badge>
    <Badge tone="outline">Actie</Badge>
    <Badge tone="grey">Concept</Badge>
  </div>
)
```

### WithIcon

```jsx
() => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Badge tone="green" icon={<IconCheck />}>Op voorraad</Badge>
    <Badge tone="green-soft" icon={<IconCheck />}>Geverifieerd</Badge>
  </div>
)
```
