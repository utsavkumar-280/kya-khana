// Dashboard — scroll = time navigation; meal cards magnet-snap to the top.
// Owns its own header (wordmark + date pill) and a top-right date popover.
const { useState, useRef, useEffect, useLayoutEffect, useCallback } = React;
const { AppHeader, MealCard, Icon } = window.KyaKhanaDesignSystem_6941ec;

const DATE_META = { Tomorrow: 'Fri, 12 Jun', Today: 'Thu, 11 Jun', Yesterday: 'Wed, 10 Jun' };

function Dashboard() {
  const data = window.KK_DATA;
  // future at top, past at bottom (scroll up = future)
  const feed = [...data.meals].reverse();
  const [votes, setVotes] = useState({ 't-dinner': 'A' });
  const [snappedDay, setSnappedDay] = useState('Today');
  const [popOpen, setPopOpen] = useState(false);
  const scrollRef = useRef(null);
  const activeRef = useRef(null);
  const cardRefs = useRef({});

  // open scrolled to the active meal (before first paint)
  useLayoutEffect(() => {
    const scrollToActive = () => {
      const root = scrollRef.current;
      const el = activeRef.current;
      if (root && el) {
        const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 6;
        root.style.scrollBehavior = 'auto';
        root.scrollTop = top;
        root.style.scrollBehavior = '';
      }
    };
    scrollToActive();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scrollToActive);
  }, []);

  // update header date from the card snapped near the top
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const day = e.target.getAttribute('data-day');
            if (day) setSnappedDay(day);
          }
        });
      },
      { root, rootMargin: '0px 0px -78% 0px', threshold: 0 }
    );
    Object.values(cardRefs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const jumpTo = useCallback((targetDay) => {
    const target = feed.find((m) => m.day === targetDay);
    const el = target && cardRefs.current[target.id];
    const root = scrollRef.current;
    if (el && root) {
      const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 6;
      root.scrollTo({ top, behavior: 'smooth' });
    }
    setPopOpen(false);
  }, [feed]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <AppHeader date={snappedDay} onDate={() => setPopOpen((o) => !o)} />

      <div
        ref={scrollRef}
        style={{
          flex: 1, overflowY: 'auto', padding: '6px 16px 22px',
          scrollSnapType: 'y proximity', scrollBehavior: 'smooth',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}
      >
        <p style={hintStyle}>↑ swipe up for upcoming days</p>
        {feed.map((m) => {
          const isActive = m.state === 'active';
          return (
            <div
              key={m.id}
              data-day={m.day}
              ref={(el) => { cardRefs.current[m.id] = el; if (isActive) activeRef.current = el; }}
              style={{ scrollSnapAlign: 'start', scrollMarginTop: 6 }}
            >
              <MealCard
                meal={m.meal}
                hindi={m.hindi}
                when={m.when}
                state={m.state}
                snapped={isActive}
                seconds={m.closesInSec || m.opensInSec}
                combos={m.combos}
                userVote={votes[m.id]}
                onVote={(letter) => setVotes((v) => ({ ...v, [m.id]: letter }))}
              />
            </div>
          );
        })}
        <p style={hintStyle}>that's the start of your history ✦</p>
      </div>

      {/* date popover */}
      <div
        onClick={() => setPopOpen(false)}
        style={{
          position: 'absolute', inset: 0, zIndex: 25, background: 'var(--overlay-scrim)',
          opacity: popOpen ? 1 : 0, pointerEvents: popOpen ? 'auto' : 'none',
          transition: 'opacity var(--duration-base)',
        }}
      />
      <div style={{
        position: 'absolute', top: 60, right: 18, zIndex: 31, width: 210,
        background: 'var(--surface-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 8,
        transformOrigin: 'top right',
        opacity: popOpen ? 1 : 0,
        transform: popOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
        pointerEvents: popOpen ? 'auto' : 'none',
        transition: 'opacity var(--duration-base), transform var(--duration-base) var(--ease-out)',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-2xs)',
          letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
          color: 'var(--text-muted)', padding: '6px 8px 8px',
        }}>Jump to a day</div>
        {['Tomorrow', 'Today', 'Yesterday'].map((d) => {
          const cur = d === snappedDay;
          return (
            <button key={d} onClick={() => jumpTo(d)} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%', border: 'none',
              background: cur ? 'var(--primary)' : 'transparent', cursor: 'pointer',
              padding: '11px 10px', borderRadius: 'var(--radius-md)', textAlign: 'left',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)',
              color: cur ? 'var(--on-primary)' : 'var(--text-primary)',
              WebkitTapHighlightColor: 'transparent',
            }}>
              <Icon name="calendar" size={16} color={cur ? 'var(--on-primary)' : 'var(--accent)'} />
              {d}
              <span style={{
                marginLeft: 'auto', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-2xs)', fontWeight: 600,
                color: cur ? 'rgba(255,255,255,0.82)' : 'var(--text-muted)',
              }}>{DATE_META[d]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const hintStyle = {
  textAlign: 'center', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)',
  fontWeight: 500, color: 'var(--text-muted)', margin: 0, padding: '2px 0 4px',
};

window.Dashboard = Dashboard;
