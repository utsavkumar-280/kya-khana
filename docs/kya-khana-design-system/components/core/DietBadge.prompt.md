The vegetarian / non-vegetarian indicator — the familiar Indian square-and-dot mark (green for veg, red for non-veg) with an optional label.

```jsx
<DietBadge type="veg" />
<DietBadge type="nonveg" label="Chicken" />
<DietBadge type="veg" label={false} size={14} />   {/* mark only */}
```

Props: `type` ('veg' | 'nonveg'), `label` (string override or `false` for mark-only), `size`.
