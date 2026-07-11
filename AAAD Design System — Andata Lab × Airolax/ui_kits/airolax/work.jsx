// AIROLAX — Selected work carousel + detail
const { useState: useStateW, useRef: useRefW } = React;

function XWork() {
  const items = window.AIROLAX.work;
  const [sel, setSel] = useStateW(0);
  const trackRef = useRefW(null);
  const active = items[sel];
  const scroll = (dir) => {
    const next = Math.max(0, Math.min(items.length - 1, sel + dir));
    setSel(next);
    const track = trackRef.current;
    if (track) {
      const card = track.children[next];
      card && track.scrollTo({ left: card.offsetLeft - 36, behavior: 'smooth' });
    }
  };
  return (
    <section style={{ padding: '110px 0 90px' }} data-screen-label="airolax-work" id="x-work">
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '0 36px', marginBottom: 28 }}>
        <h2 className="ds-label">Selected Work</h2>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button style={xArrow} onClick={() => scroll(-1)} aria-label="Previous">‹</button>
          <button style={xArrow} onClick={() => scroll(1)} aria-label="Next">›</button>
        </div>
      </div>
      <div ref={trackRef} style={xTrack}>
        {items.map((w, i) => (
          <article key={w.id} onClick={() => setSel(i)} style={{ ...xCard, outline: i === sel ? '1px solid rgba(255,255,255,.4)' : '1px solid transparent' }}>
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
              <img src={w.img} alt={w.t} style={{ width: 360, maxWidth: '74vw', height: 240, objectFit: 'cover', display: 'block', filter: i === sel ? 'none' : 'brightness(.62) saturate(.9)', transition: 'filter .3s' }} />
              {i === sel && <span style={xSpecBar} />}
            </div>
            <div style={{ padding: '14px 4px 0' }}>
              <span className="ds-label" style={{ color: 'var(--ink-2)', fontSize: 10.5 }}>{w.tag}</span>
              <h3 style={{ margin: '6px 0 0', fontSize: 18, fontWeight: 600, letterSpacing: '-.01em', color: 'var(--ink)' }}>{w.t}</h3>
            </div>
          </article>
        ))}
      </div>
      <div style={xDetail}>
        <span className="ds-label" style={{ color: 'var(--ink-2)' }}>{active.year} — {active.tag}</span>
        <h3 style={{ margin: '12px 0 0', fontSize: 'clamp(1.6rem,3.4vw,2.6rem)', fontWeight: 700, letterSpacing: '-.025em', color: 'var(--ink)' }}>{active.t}</h3>
        <p className="ds-lead" style={{ marginTop: 14, maxWidth: 560, color: 'var(--ink-2)' }}>Real-time generative systems, sensors and projected light — a site-specific immersive work staged for live audiences.</p>
      </div>
    </section>
  );
}
const xArrow = { width: 40, height: 40, borderRadius: 999, background: 'transparent', border: '1px solid var(--hair)', color: 'var(--ink)', fontSize: 18, cursor: 'pointer', lineHeight: 1 };
const xTrack = { display: 'flex', gap: 22, overflowX: 'auto', padding: '0 36px 6px', scrollbarWidth: 'none' };
const xCard = { flex: 'none', cursor: 'pointer', borderRadius: 16, padding: 6, transition: 'outline .2s' };
const xSpecBar = { position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: 'linear-gradient(90deg,#3CDCFF,#FF2E8A,#FF8A3C)' };
const xDetail = { padding: '44px 36px 0', borderTop: '1px solid var(--hair-2)', marginTop: 40 };

Object.assign(window, { XWork });
