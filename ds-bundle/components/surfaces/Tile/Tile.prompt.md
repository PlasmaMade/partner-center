Tile from @plasmamade/ds. Use via `window.PlasmaMade.Tile` (bundle loaded from the root `_ds_bundle.js`).

Dashboard navigation tile — an icon badge, title, description and an
animated call-to-action. The building block of the partner-center home grid.

@category Surfaces

## Props

```ts
interface TileProps {
  /** Icon shown in the rounded green badge. */
  icon?: React.ReactNode;
  /** Tile title. */
  title: string;
  /** Short supporting description. */
  description?: React.ReactNode;
  /** Call-to-action label shown at the foot (e.g. "Openen"). */
  linkLabel?: string;
  /** Destination URL; when set the tile renders as a link. */
  href?: string;
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
    <Tile
      icon={<IconChart />}
      title="Marketing"
      description="Campagnes, banners en social-content klaar voor gebruik."
      linkLabel="Openen"
      href="#"
    />
  </div>
)
```

### Grid

```jsx
() => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 16 }}>
    <Tile icon={<IconChart />} title="Marketing" description="Campagnes en banners." linkLabel="Openen" href="#" />
    <Tile icon={<IconDownload />} title="Downloads" description="Brochures en sheets." linkLabel="Openen" href="#" />
    <Tile icon={<IconBook />} title="Kennisbank" description="Handleidingen en FAQ." linkLabel="Openen" href="#" />
  </div>
)
```
