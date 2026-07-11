// ANDATA LAB site — services, work, process
const { useState: useStateMid } = React;

function Services() {
  const [hover, setHover] = useStateMid(null);
  return (
    <section id="s-services" className="reveal" style={{ padding: '90px clamp(20px,4vw,48px)', background: 'var(--surface)', borderTop: '1px solid var(--hair-2)' }} data-screen-label="services">
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 40, flexWrap: 'wrap' }}>
          <div>
            <span className="ds-label" style={{ color: 'var(--ink-3)' }}>What we do</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, letterSpacing: '-.03em', margin: '12px 0 0' }}>Five ways we move audiences.</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 18 }}>
          {window.SITE.services.map((s, i) => (
            <article key={s.n} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              style={{ background: 'var(--bg)', borderRadius: 18, padding: '30px 28px', boxShadow: hover === i ? 'var(--shadow-lift)' : 'var(--shadow-card)', transform: hover === i ? 'translateY(-4px)' : 'none', transition: 'all .3s', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className="ds-label" style={{ color: 'var(--ink-3)' }}>{s.n}</span>
              <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-.015em', margin: 0, lineHeight: 1.25 }}>{s.t}</h3>
              <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.55, margin: 0 }}>{s.d}</p>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '.01em', margin: 'auto 0 0', paddingTop: 14, borderTop: '1px solid var(--hair-2)' }}>{s.get}</p>
            </article>
          ))}
          <article style={{ background: 'var(--ink)', color: 'var(--on-accent)', borderRadius: 18, padding: '30px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.015em', margin: 0 }}>Not sure where it fits?</h3>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,.7)', lineHeight: 1.55, margin: 0 }}>Bring us the space and the ambition. We'll shape the rest.</p>
            <button onClick={() => window.scrollTo({ top: document.getElementById('s-contact').offsetTop - 64, behavior: 'smooth' })} style={{ alignSelf: 'flex-start', marginTop: 6, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, padding: '12px 22px', borderRadius: 999, background: '#fff', color: '#111', border: 'none', cursor: 'pointer' }}>Book a call →</button>
          </article>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="s-work" className="reveal" style={{ padding: '90px clamp(20px,4vw,48px)' }} data-screen-label="work">
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <span className="ds-label" style={{ color: 'var(--ink-3)' }}>Selected work</span>
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, letterSpacing: '-.03em', margin: '12px 0 40px' }}>Built, staged and running.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 22 }}>
          {window.SITE.work.map(w => (
            <article key={w.id} className="work-card" style={{ borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-card)', background: 'var(--bg)', cursor: 'pointer', transition: 'transform .3s, box-shadow .3s' }}>
              <div style={{ overflow: 'hidden' }}>
                <img src={w.img} alt={w.t} className="work-img" style={{ width: '100%', height: 230, objectFit: 'cover', display: 'block', transition: 'transform .5s' }} />
              </div>
              <div style={{ padding: '20px 22px 24px' }}>
                <span className="ds-label" style={{ color: 'var(--ink-3)', fontSize: 10.5 }}>{w.client}</span>
                <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.02em', margin: '8px 0 8px' }}>{w.t}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>{w.outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="s-process" className="reveal" style={{ padding: '90px clamp(20px,4vw,48px)', background: 'var(--ink)', color: 'var(--on-accent)' }} data-screen-label="process">
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <span className="ds-label" style={{ color: 'rgba(255,255,255,.5)' }}>How we work</span>
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, letterSpacing: '-.03em', margin: '12px 0 48px', color: '#fff' }}>One team, concept to on-site.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 30 }}>
          {window.SITE.process.map(p => (
            <div key={p.n} style={{ borderTop: '1px solid rgba(255,255,255,.18)', paddingTop: 20 }}>
              <span className="ds-label" style={{ color: 'rgba(255,255,255,.45)' }}>{p.n}</span>
              <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.015em', margin: '14px 0 10px', color: '#fff' }}>{p.t}</h3>
              <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,.62)', lineHeight: 1.55, margin: 0 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Services, Work, Process });
