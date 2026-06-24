StatCard from @plasmamade/ds. Use via `window.PlasmaMade.StatCard` (bundle loaded from the root `_ds_bundle.js`).

KPI stat card — a labelled metric with a large tabular value and an optional
trend sub-line. Use several in a grid for dashboard summaries.

@category Surfaces

## Props

```ts
interface StatCardProps {
  /** Metric label, e.g. "Omzet deze maand". */
  label: string;
  /** Optional icon shown beside the label. */
  icon?: React.ReactNode;
  /** The headline value, e.g. "€ 24.580". Rendered in a large tabular figure. */
  value: React.ReactNode;
  /** Optional sub-line under the value — wrap a delta in `<b>` for green emphasis. */
  sub?: React.ReactNode;
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
    <StatCard
      label="Omzet deze maand"
      icon={<IconEuro />}
      value="€ 24.580"
      sub={<><b>+12%</b> t.o.v. vorige maand</>}
    />
  </div>
)
```

### Dashboard

```jsx
() => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 16 }}>
    <StatCard label="Omzet deze maand" icon={<IconEuro />} value="€ 24.580" sub={<><b>+12%</b> t.o.v. vorige maand</>} />
    <StatCard label="Open bestellingen" icon={<IconBox />} value="38" sub="7 wachten op verzending" />
    <StatCard label="Actieve dealers" icon={<IconUsers />} value="126" sub={<><b>+4</b> nieuw dit kwartaal</>} />
  </div>
)
```
