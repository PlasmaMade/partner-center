Avatar from @plasmamade/ds. Use via `window.PlasmaMade.Avatar` (bundle loaded from the root `_ds_bundle.js`).

User avatar — a circular green-gradient badge showing initials, or an image
when `src` is provided. Four sizes (sm/md/lg/xl).

@category Media

## Props

```ts
interface AvatarProps {
  /** Initials shown when no image is provided (e.g. "BJ"). */
  initials?: string;
  /** Image URL — when set, shown instead of initials. */
  src?: string;
  /** Image alt text. */
  alt?: string;
  /** Size of the avatar. */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
```

## Examples

### Sizes

```jsx
() => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Avatar initials="BJ" size="sm" />
    <Avatar initials="BJ" size="md" />
    <Avatar initials="PM" size="lg" />
    <Avatar initials="PM" size="xl" />
  </div>
)
```

### UserRow

```jsx
() => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Avatar initials="BJ" size="md" />
    <div>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)' }}>Bart Jonkeren</div>
      <div style={{ fontSize: 12, color: 'var(--muted)' }}>PlasmaMade B.V.</div>
    </div>
  </div>
)
```
