The always-visible 3-tab bottom navigation (Dashboard · Inventory · More). Current tab gets a saffron pill highlight.

```jsx
const [tab, setTab] = useState('dashboard');
<BottomNav active={tab} onChange={setTab} />
```

Sits fixed at the bottom of the 390px frame. Override `tabs` to customize, otherwise uses the default three. Respects iOS safe-area inset.
