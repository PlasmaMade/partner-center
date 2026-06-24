CompareTable from @plasmamade/ds. Use via `window.PlasmaMade.CompareTable` (bundle loaded from the root `_ds_bundle.js`).

Feature comparison table with a dark header (one column can be green-
highlighted). Boolean cells become a green check or a muted dash; string
cells render as text. For comparing PlasmaMade against alternatives.

@category Data

## Props

```ts
interface CompareTableProps {
  /** Column headers. Mark the PlasmaMade column `highlight` to give it the green header. */
  columns: { label: string; highlight?: boolean; }[];
  /** Rows — a feature label plus one cell per column. A boolean renders a check/dash; a string renders as text. */
  rows: { feature: string; cells: Array<boolean | string>; }[];
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
  <div style={{ maxWidth: 620 }}>
    <CompareTable
      columns={[
        { label: 'PlasmaMade', highlight: true },
        { label: 'Koolstoffilter' },
        { label: 'Geen filter' },
      ]}
      rows={[
        { feature: 'Verwijdert geur', cells: [true, 'Deels', false] },
        { feature: 'Verwijdert fijnstof', cells: [true, false, false] },
        { feature: 'Recirculatie (geen afvoer)', cells: [true, true, false] },
        { feature: 'Vervangingsinterval', cells: ['12 maanden', '3 maanden', '—'] },
        { feature: 'Onderhoudsvrij', cells: [true, false, true] },
      ]}
    />
  </div>
)
```
