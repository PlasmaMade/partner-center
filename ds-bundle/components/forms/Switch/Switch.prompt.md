Switch from @plasmamade/ds. Use via `window.PlasmaMade.Switch` (bundle loaded from the root `_ds_bundle.js`).

Toggle switch with a green "on" track and a spring-animated knob. A styled
checkbox — use `checked`/`defaultChecked` and `onChange`.

@category Forms

## Props

```ts
interface SwitchProps {
  /** Accessible label for the toggle (visually hidden, read by screen readers). */
  label?: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
```

## Examples

### States

```jsx
() => (
  <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
    <Switch label="Uit" />
    <Switch label="Aan" defaultChecked />
  </div>
)
```

### SettingRow

```jsx
() => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, maxWidth: 360, border: '1px solid var(--line)', borderRadius: 12, padding: '14px 16px' }}>
    <div>
      <div style={{ fontSize: 14, fontWeight: 600 }}>E-mailmeldingen</div>
      <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>Ontvang een mail bij nieuwe bestellingen.</div>
    </div>
    <Switch label="E-mailmeldingen" defaultChecked />
  </div>
)
```
