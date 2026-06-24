Toast from @plasmamade/ds. Use via `window.PlasmaMade.Toast` (bundle loaded from the root `_ds_bundle.js`).

Dark, floating confirmation toast. Render inside a fixed corner container to
notify the user an action succeeded or failed.

@category Feedback

## Props

```ts
interface ToastProps {
  /** Accent tone of the leading icon. */
  tone?: "warn" | "success" | "danger";
  /** Optional leading icon. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}
```

## Examples

### Success

```jsx
() => <Toast icon={<IconCheck />}>Bestelling geplaatst</Toast>
```

### Tones

```jsx
() => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
    <Toast tone="success" icon={<IconCheck />}>Wijzigingen opgeslagen</Toast>
    <Toast tone="warn" icon={<IconBell />}>Voorraad bijna op</Toast>
    <Toast tone="danger" icon={<IconAlert />}>Verzending mislukt — probeer opnieuw</Toast>
  </div>
)
```
