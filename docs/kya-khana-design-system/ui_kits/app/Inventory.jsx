// Inventory — Stock vs Grocery List toggle.
// Stock is grouped by ingredient category; Grocery is grouped by the meal
// that needs each item (auto-generated from decided meals).
const { useState: useStateInv } = React;
const { InventoryRow, Button: BtnInv, Icon: IconInv, AppHeader: AppHeaderInv } = window.KyaKhanaDesignSystem_6941ec;

function SegToggle({ value, onChange, options }) {
  return (
    <div style={{
      display: 'flex', gap: 4, padding: 4, background: 'var(--neutral-50)',
      borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)',
    }}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button key={o.id} onClick={() => onChange(o.id)} style={{
            flex: 1, border: 'none', cursor: 'pointer', padding: '10px 12px',
            borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-sm)', fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            background: on ? 'var(--primary)' : 'transparent',
            color: on ? 'var(--on-primary)' : 'var(--text-secondary)',
            boxShadow: on ? '0 4px 12px color-mix(in oklab, var(--primary) 30%, transparent)' : 'none',
            transition: 'all var(--duration-fast)',
          }}>
            {o.label}
            {o.count != null && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums',
                fontSize: '11px', fontWeight: 800, lineHeight: 1.5, padding: '1px 7px',
                borderRadius: 'var(--radius-pill)',
                background: on ? 'rgba(255,255,255,0.25)' : 'var(--nonveg-500)', color: '#fff',
              }}>{o.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

const invSectionLabel = {
  fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)', fontWeight: 800,
  letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
  color: 'var(--text-secondary)', margin: '16px 2px 8px',
};

const invCard = {
  background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
  overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
};

function Inventory() {
  const data = window.KK_DATA;
  const [view, setView] = useStateInv('stock');
  const [stock, setStock] = useStateInv(data.stock);
  const [bought, setBought] = useStateInv({});

  const shortCount = data.grocery.filter((g) => g.need > g.have).length;
  const categories = [...new Set(stock.map((s) => s.category))];
  const mealGroups = [...new Set(data.grocery.map((g) => g.forMeal))];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppHeaderInv />
      <div style={{ padding: '4px 16px 12px' }}>
        <SegToggle value={view} onChange={setView} options={[
          { id: 'stock', label: 'Stock' },
          { id: 'grocery', label: 'Grocery List', count: shortCount || null },
        ]} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px' }}>
        {view === 'stock' ? (
          <div>
            {categories.map((cat) => {
              const rows = stock.filter((s) => s.category === cat);
              return (
                <div key={cat}>
                  <h2 style={invSectionLabel}>{cat}</h2>
                  <div style={invCard}>
                    {rows.map(({ category, ...s }, i) => (
                      <InventoryRow key={s.name} variant="stock" {...s}
                        onQty={(q) => setStock((prev) => prev.map((x) => (x.name === s.name ? { ...x, qty: q } : x)))}
                        style={i === rows.length - 1 ? { borderBottom: 'none' } : undefined}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 16 }}>
              <BtnInv variant="secondary" fullWidth pill iconLeft="plus">Add Item</BtnInv>
            </div>
          </div>
        ) : (
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, margin: '12px 2px 0',
              fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)',
            }}>
              <IconInv name="refresh" size={14} color="var(--accent)" />
              Auto-generated from decided meals
            </div>
            {mealGroups.map((meal) => {
              const rows = data.grocery.filter((g) => g.forMeal === meal);
              return (
                <div key={meal}>
                  <h2 style={invSectionLabel}>For {meal}</h2>
                  <div style={invCard}>
                    {rows.map(({ forMeal, ...g }, i) => (
                      <InventoryRow key={g.name} variant="grocery" {...g}
                        checked={!!bought[meal + g.name]}
                        onCheck={(c) => setBought((b) => ({ ...b, [meal + g.name]: c }))}
                        style={i === rows.length - 1 ? { borderBottom: 'none' } : undefined}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 20 }}>
              <BtnInv variant="primary" fullWidth pill iconLeft="share"
                style={{ background: 'var(--whatsapp)', boxShadow: '0 10px 26px rgba(31,175,84,0.32)' }}>
                Share via WhatsApp
              </BtnInv>
              <p style={{ textAlign: 'center', marginTop: 9, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                Sends only the items still left to buy
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.Inventory = Inventory;
