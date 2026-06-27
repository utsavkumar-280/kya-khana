Live deadline timer for meal cards. Ticks every second and shifts color from saffron → chili-red as the window closes (urgent under 10 min, shows "Closed" at zero).

```jsx
<Countdown deadline={Date.now() + 2*3600*1000} label="Voting closes in" />
<Countdown seconds={5400} size="lg" />
<Countdown deadline={lockTime} label="Activates in" icon="lock" size="sm" />
```

Pass `deadline` (epoch ms) for real time, or `seconds` for a static demo. Sizes `sm | md | lg`. Mono tabular figures.
