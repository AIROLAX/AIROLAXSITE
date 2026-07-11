// ANDATA LAB — Services + Work
const { useState: useStateSW } = React;

/* ---------------- Services (hover-reveal list) ---------------- */
function AServices() {
  const [hover, setHover] = useStateSW(null);
  return (
    <section style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }} data-screen-label="andata-services" id="a-services">
      <h2 className="ds-label" style={{ marginBottom: 36 }}>Services</h2>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--hair)' }}>
        {window.ANDATA.services.map((s, i) => (
          <li key={s.n} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            style={{ borderBottom: '1px solid var(--hair)', padding: '26px 0', display: 'grid', gridTemplateColumns: '64px 1fr auto', alignItems: 'center', gap: 20, cursor: 'pointer' }}>
            <span className="ds-label" style={{ color: 'var(--ink-3)' }}>{s.n}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 600, letterSpacing: '-.02em', color: hover === i ? 'var(--ink)' : 'var(--ink-2)', transition: 'color .25s, transform .25s', transform: hover === i ? 'translateX(8px)' : 'none' }}>{s.t}</h3>
              <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--ink-3)', letterSpacing: '.02em', maxHeight: hover === i ? 24 : 0, opacity: hover === i ? 1 : 0, overflow: 'hidden', transition: 'all .3s', transform: hover === i ? 'translateX(8px)' : 'none' }}>{s.m}</p>
            </div>
            <span style={{ fontSize: 22, color: 'var(--ink)', opacity: hover === i ? 1 : .25, transform: hover === i ? 'translateX(0)' : 'translateX(-6px)', transition: 'all .25s' }}>→</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Work grid (filterable) ---------------- */
function AWork({ onOpen }) {
  const [filter, setFilter] = useStateSW('All');
  const items = window.ANDATA.work.filter(w => filter === 'All' || w.cat === filter);
  return (
    <section style={{ padding: '80px 40px', background: 'var(--surface)' }} data-screen-label="andata-work" id="a-work">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
          <h2 className="ds-label">Selected Work</h2>
          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            {window.ANDATA.filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ fontFamily: 'inherit', fontSize: 12, fontWeight: 500, letterSpacing: '.02em', padding: '8px 15px', borderRadius: 999, cursor: 'pointer', transition: '.2s', border: '1px solid', borderColor: filter === f ? 'var(--ink)' : 'var(--hair)', background: filter === f ? 'var(--ink)' : 'transparent', color: filter === f ? 'var(--on-accent)' : 'var(--ink-2)' }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 22 }}>
          {items.map(w => (
            <article key={w.id} onClick={() => onOpen(w)} className="a-card"
              style={{ background: 'var(--bg)', borderRadius: 18, overflow: 'hidden', cursor: 'pointer', boxShadow: 'var(--shadow-card)', transition: 'transform .3s, box-shadow .3s' }}>
              <img src={w.img} alt={w.t} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '16px 18px 20px' }}>
                <span className="ds-label" style={{ color: 'var(--ink-3)', fontSize: 10.5 }}>{w.tag}</span>
                <h3 style={{ margin: '7px 0 0', fontSize: 17, fontWeight: 600, letterSpacing: '-.01em' }}>{w.t}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AServices, AWork });
