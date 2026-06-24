Card from @plasmamade/ds. Use via `window.PlasmaMade.Card` (bundle loaded from the root `_ds_bundle.js`).

The base surface — white, rounded, subtly elevated. The building block for
most panels. Children sit in a padded body by default; use `bare` for
edge-to-edge content.

@category Surfaces

## Props

```ts
interface CardProps {
  /** Add the lift-on-hover interaction (use for clickable cards). */
  hover?: boolean;
  /** Render children without the default padded body (for edge-to-edge media). */
  bare?: boolean;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}
```

## Examples

### Default

```jsx
() => (
  <div style={{ maxWidth: 360 }}>
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <h3 style={{ fontSize: 17 }}>Maandoverzicht</h3>
        <Badge tone="green-soft">Bijgewerkt</Badge>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 16 }}>
        Je verkochte units en openstaande bestellingen van deze maand in één oogopslag.
      </p>
      <Button size="sm">Bekijk rapport</Button>
    </Card>
  </div>
)
```

### Clickable

```jsx
() => (
  <div style={{ maxWidth: 360 }}>
    <Card hover>
      <h3 style={{ fontSize: 17, marginBottom: 6 }}>Verkooptools</h3>
      <p style={{ color: 'var(--muted)', fontSize: 14 }}>
        Presentaties, productsheets en argumentatie om sneller te verkopen.
      </p>
    </Card>
  </div>
)
```
