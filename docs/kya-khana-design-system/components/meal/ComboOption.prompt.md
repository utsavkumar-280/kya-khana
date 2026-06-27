One of the two choices (A / B) inside a `MealCard`. Lists meal components, shows the diet mark + live vote count, and renders a vote button when active. Supply `vegVariant` on non-veg combos to show the "cooked alongside" note.

```jsx
<ComboOption
  letter="A"
  diet="veg"
  votes={2}
  selected
  items={[
    { role: 'Carb',  name: 'Roti', hindi: 'रोटी' },
    { role: 'Sabji', name: 'Paneer Butter Masala' },
    { role: 'Dal',   name: 'Dal Tadka' },
    { role: 'Sides', name: 'Boondi Raita' },
  ]}
  onVote={() => vote('A')}
/>

<ComboOption letter="B" diet="nonveg" votes={1}
  vegVariant="Aloo Gobi instead of Chicken Curry"
  items={[...]} onVote={() => vote('B')} />
```

`state` drives behavior: `active` shows the vote button, `locked`/`decided` hide it; `winner` highlights the chosen combo green.
