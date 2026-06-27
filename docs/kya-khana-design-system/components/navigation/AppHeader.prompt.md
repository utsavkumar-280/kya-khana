Sticky Dashboard header. The calendar trigger shows the snapped date and opens the quick-jump dropdown; the bell shows unread notifications.

```jsx
<AppHeader title="Today" subtitle="Thu, 11 Jun"
  notifications={3}
  onCalendar={openCalendar} onBell={openNotifications} />
```

The `title` updates to match whichever meal card is snapped to the top as the user scrolls. Translucent blur background sits over the warm canvas.
