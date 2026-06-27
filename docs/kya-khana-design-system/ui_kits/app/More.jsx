// More — profile, separated menu cards (Cook View, Notifications, Templates,
// Cook Times, Profile) and a red logout card. Mirrors screens/More.html.
const { Icon: IconMore, AppHeader: AppHeaderMore } = window.KyaKhanaDesignSystem_6941ec;

const MENU = [
  { id: 'cook', icon: 'chef-hat', title: 'Cook View', subtitle: "Today's recipes and cook instructions" },
  { id: 'notif', icon: 'bell', title: 'Notifications', subtitle: 'Vote reminders, food ready alerts', badge: 2 },
  { id: 'templates', icon: 'clipboard', title: 'Meal Templates', subtitle: 'Edit breakfast, lunch, dinner components' },
  { id: 'times', icon: 'clock', title: 'Cook Times', subtitle: 'Morning: 8:00 AM  ·  Evening: 7:30 PM' },
  { id: 'profile', icon: 'user', title: 'Profile', subtitle: 'Housemate 1', role: 'Housemate' },
];

const menuCard = {
  display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left',
  background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)',
  boxShadow: 'var(--shadow-sm)', padding: '14px 16px', cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent', transition: 'background var(--duration-fast)',
};

function MenuItem({ item, danger = false }) {
  return (
    <button style={menuCard}>
      <span style={{
        position: 'relative', width: 42, height: 42, flexShrink: 0, display: 'grid', placeItems: 'center',
        borderRadius: 14, background: danger ? 'var(--nonveg-bg)' : 'var(--accent-soft)',
        color: danger ? 'var(--nonveg-500)' : 'var(--accent)',
      }}>
        <IconMore name={item.icon} size={21} />
        {item.badge ? (
          <span style={{
            position: 'absolute', top: -3, right: -3, minWidth: 18, height: 18, padding: '0 5px',
            display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-pill)',
            background: 'var(--accent)', color: '#fff', border: '2px solid var(--surface-card)',
            fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', fontSize: 10.5, fontWeight: 800,
          }}>{item.badge}</span>
        ) : null}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 7,
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-md)',
          color: danger ? 'var(--nonveg-500)' : 'var(--text-primary)',
        }}>
          {item.title}
          {item.role && (
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 800, letterSpacing: '0.06em',
              textTransform: 'uppercase', background: 'var(--accent-soft)', color: 'var(--accent)',
              borderRadius: 'var(--radius-pill)', padding: '5px 10px', whiteSpace: 'nowrap',
            }}>{item.role}</span>
          )}
        </span>
        <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.35 }}>
          {item.subtitle}
        </span>
      </span>
      <IconMore name="chevron-right" size={19} color="var(--text-muted)" />
    </button>
  );
}

function More() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* header — wordmark */}
      <AppHeaderMore />

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* profile */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 13,
          background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-sm)', padding: '16px',
        }}>
          <span style={{
            width: 54, height: 54, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center',
            background: 'var(--accent-soft)', color: 'var(--accent)',
            border: '1.5px dashed color-mix(in oklab, var(--accent) 45%, white)',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19,
          }}>H1</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-lg)', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>Housemate 1</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 3 }}>Flat 302 · 4 members · 1 cook</div>
          </span>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 800, letterSpacing: '0.06em',
            textTransform: 'uppercase', background: 'var(--accent-soft)', color: 'var(--accent)',
            borderRadius: 'var(--radius-pill)', padding: '5px 10px', whiteSpace: 'nowrap',
          }}>Housemate</span>
        </div>

        {MENU.map((item) => <MenuItem key={item.id} item={item} />)}

        <div style={{ marginTop: 4 }}>
          <MenuItem item={{ icon: 'log-out', title: 'Logout', subtitle: 'Sign out of this household' }} danger />
        </div>

        <div style={{ textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', padding: '8px 0 2px' }}>
          Kya Khana · क्या खाना · v1.0
        </div>
      </div>
    </div>
  );
}

window.More = More;
