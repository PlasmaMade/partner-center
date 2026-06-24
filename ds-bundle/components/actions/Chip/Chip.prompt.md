Chip from @plasmamade/ds. Use via `window.PlasmaMade.Chip` (bundle loaded from the root `_ds_bundle.js`).

Pill-shaped, toggleable filter chip. Use a row of chips to filter a
catalogue or list, marking the applied one `active`.

@category Actions

## Props

```ts
interface ChipProps {
  /** Whether the chip is selected. Selected chips use the green-gradient fill. */
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}
```

## Examples

### FilterRow

```jsx
() => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Chip active>Alle producten</Chip>
    <Chip>Recirculatie-units</Chip>
    <Chip>Compacte units</Chip>
    <Chip>Filters</Chip>
    <Chip>Onderdelen</Chip>
  </div>
)
```

### States

```jsx
() => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Chip>Niet geselecteerd</Chip>
    <Chip active>Geselecteerd</Chip>
  </div>
)
```
