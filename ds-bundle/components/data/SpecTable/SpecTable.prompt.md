SpecTable from @plasmamade/ds. Use via `window.PlasmaMade.SpecTable` (bundle loaded from the root `_ds_bundle.js`).

Two-column specification table (label / value), zebra-striped. For product
technical specs and key/value detail blocks.

@category Data

## Props

```ts
interface SpecTableProps {
  /** Label/value rows. Zebra-striped; labels muted, values bold. */
  rows: { label: string; value: ReactNode; }[];
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
  <div style={{ maxWidth: 460 }}>
    <SpecTable
      rows={[
        { label: 'Capaciteit', value: '1.000 m³/u' },
        { label: 'Aansluiting', value: 'Ø150 mm' },
        { label: 'Geluidsniveau', value: '< 52 dB' },
        { label: 'Filterlevensduur', value: '12 maanden' },
        { label: 'Afmetingen (h×b×d)', value: '320 × 200 × 180 mm' },
        { label: 'Gewicht', value: '3,4 kg' },
      ]}
    />
  </div>
)
```
