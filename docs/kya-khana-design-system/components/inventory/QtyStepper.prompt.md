Compact +/- quantity control with an optional unit, for editing inventory stock levels.

```jsx
<QtyStepper value={qty} unit="g" step={50} onChange={setQty} />
<QtyStepper value={2} unit="pcs" min={0} max={12} size="sm" onChange={setQty} />
```

Mono tabular figure; saffron +/- buttons disable at min/max.
