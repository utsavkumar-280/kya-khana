The core Dashboard unit — one card per meal, holding two combos (A / B). The `state` prop drives the entire appearance and behavior.

```jsx
<MealCard
  meal="Tonight's Dinner" hindi="रात का खाना" when="Today · Evening"
  state="active"
  deadline={Date.now() + 2*3600*1000}
  userVote="A"
  onVote={(letter) => castVote(letter)}
  snapped
  combos={[
    { letter:'A', diet:'veg', votes:2, items:[
        {role:'Carb', name:'Roti'}, {role:'Sabji', name:'Paneer Butter Masala'},
        {role:'Dal', name:'Dal Tadka'}, {role:'Sides', name:'Boondi Raita'} ] },
    { letter:'B', diet:'nonveg', votes:1, vegVariant:'Aloo Gobi instead of Chicken Curry',
      items:[ {role:'Carb', name:'Jeera Rice'}, {role:'Sabji', name:'Chicken Curry'},
        {role:'Sides', name:'Green Salad'} ] },
  ]}
/>
```

States: `active` (full color, live countdown, vote buttons), `locked` (greyed preview, "opens in" countdown, no voting), `decided` (shows only the `winner` combo with ✅). Set `snapped` to apply the magnet-snap elevation glow when the card locks to the top on scroll.
