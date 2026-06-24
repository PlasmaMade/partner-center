IconButton from @plasmamade/ds. Use via `window.PlasmaMade.IconButton` (bundle loaded from the root `_ds_bundle.js`).

Square, bordered icon-only button for top bars and toolbars (notifications,
settings, overflow). Always pass an accessible `label`.

@category Actions

## Props

```ts
interface IconButtonProps {
  /** The icon to render (inline svg or icon element). */
  icon: React.ReactNode;
  /** Accessible label describing the action — required, the button has no visible text. */
  label: string;
  /** Show a small green notification dot in the corner. */
  dot?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
```

## Examples

### Toolbar

```jsx
() => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
    <IconButton icon={<IconSearch />} label="Zoeken" />
    <IconButton icon={<IconBell />} label="Meldingen" dot />
    <IconButton icon={<IconSettings />} label="Instellingen" />
    <IconButton icon={<IconDownload />} label="Downloaden" />
  </div>
)
```

### WithDot

```jsx
() => <IconButton icon={<IconBell />} label="Meldingen" dot />
```
