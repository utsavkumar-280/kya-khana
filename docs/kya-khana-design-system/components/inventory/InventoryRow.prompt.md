A single ingredient line shared by both Inventory views.

```jsx
{/* Stock view — editable quantity */}
<InventoryRow variant="stock" name="Paneer" hindi="पनीर" emoji="🧀"
  qty={200} unit="g" onQty={setQty} />

{/* Grocery view — need vs have + buy checkbox */}
<InventoryRow variant="grocery" name="Tomatoes" hindi="टमाटर" emoji="🍅"
  need={6} have={2} unit=" pcs" checked={bought} onCheck={setBought} />
```

Grocery rows auto-show a "Short N" (chili) or "In stock" (green) pill from `need` − `have`.
