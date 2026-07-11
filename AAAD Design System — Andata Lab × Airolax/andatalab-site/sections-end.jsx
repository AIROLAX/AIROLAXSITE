// ANDATA LAB site — why, final CTA, footer, app
const { useState: useStateEnd } = React;

function Why() {
  return (
    <section id="s-studio" className="reveal" style={{ padding: '90px clamp(20px,4vw,48px)' }} data-screen-label="studio">
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ maxWidth: 640, marginBottom: 52 }}>
          <span className="ds-label" style={{ color: 'var(--ink-3)' }}>The studio</span>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, letterSpacing: '-.03em', margin: '12px 0 0', textWrap: 'balance' }}>A creative-technology studio for work that has to be felt.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 36 }}>
          {window.SITE.why.map((w, i) => (
            <div key={i}>
              <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-.015em', margin: '0 0 10px' }}>{w.t}</h3>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const f = window.SITE.finalCta;
  const [sent, setSent] = useStateEnd(false);
  return (
    <section id="s-contact" className="reveal" style={{ padding: '90px clamp(20px,4vw,48px)', background: 'var(--surface)', borderTop: '1px solid var(--hair-2)' }} data-screen-label="contact">
      <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 'clamp(36px,6vw,80px)', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2rem,4.6vw,3.4rem)', fontWeight: 800, letterSpacing: '-.035em', lineHeight: 1.04, margin: 0, textWrap: 'balance' }}>{f.h}</h2>
          <p style={{ fontSize: 'clamp(1.05rem,1.5vw,1.25rem)', color: 'var(--ink-2)', lineHeight: 1.5, marginTop: 20, maxWidth: 440 }}>{f.sub}</p>
          <div style={{ display: 'flex', gap: 36, marginTop: 36, flexWrap: 'wrap' }}>
            <div><span className="ds-label" style={{ color: 'var(--ink-3)' }}>Email</span><p style={{ margin: '7px 0 0', fontSize: 15, fontWeight: 500 }}>{f.email}</p></div>
            <div><span className="ds-label" style={{ color: 'var(--ink-3)' }}>Based</span><p style={{ margin: '7px 0 0', fontSize: 15, fontWeight: 500 }}>{f.location}</p></div>
          </div>
        </div>
        <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 13, background: 'var(--bg)', padding: 'clamp(22px,3vw,34px)', borderRadius: 20, boxShadow: 'var(--shadow-card)' }}>
          {sent ? (
            <div style={{ padding: '36px 8px', textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.02em', margin: 0 }}>Thanks — message received.</p>
              <p style={{ color: 'var(--ink-2)', marginTop: 8 }}>We reply within 24–48 hours.</p>
            </div>
          ) : (
            <React.Fragment>
              <div style={{ display: 'flex', gap: 13, flexWrap: 'wrap' }}>
                <input required placeholder="Name" style={{ ...field, flex: 1, minWidth: 120 }} />
                <input required type="email" placeholder="Email" style={{ ...field, flex: 1, minWidth: 120 }} />
              </div>
              <input placeholder="Organization (museum, brand, festival…)" style={field} />
              <textarea required rows="4" placeholder="The space, the audience, the timeline…" style={{ ...field, resize: 'vertical', fontFamily: 'inherit' }} />
              <button className="btn-primary" style={{ ...field, background: 'var(--ink)', color: 'var(--on-accent)', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', borderRadius: 999, padding: '15px' }}>Send project brief</button>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', margin: '2px 0 0' }}>No obligation — we'll tell you honestly if we're the right fit.</p>
            </React.Fragment>
          )}
        </form>
      </div>
    </section>
  );
}
const field = { fontFamily: 'inherit', fontSize: 15, padding: '14px 16px', borderRadius: 12, border: '1px solid var(--hair)', background: 'var(--field-bg)', color: 'var(--ink)', outline: 'none', width: '100%', boxSizing: 'border-box' };

function Footer() {
  return (
    <footer style={{ padding: '40px clamp(20px,4vw,48px)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <img src="../assets/logo-mark-black.png" alt="" style={{ width: 26, height: 26 }} />
      <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.04em' }}>Andata Lab*</span>
      <a href="../ui_kits/airolax/index.html" className="nav-link" style={{ fontSize: 13, color: 'var(--ink-2)', textDecoration: 'none', marginLeft: 10 }}>AIROLAX ↗</a>
      <span className="ds-label" style={{ color: 'var(--ink-3)', marginLeft: 'auto' }}>© 2026 — Immersive & Creative Technology Studio</span>
    </footer>
  );
}

function App() {
  useStateEnd; // keep import
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div data-brand="andata">
      <Nav />
      <Hero />
      <Statement />
      <TrustBar />
      <Services />
      <Work />
      <Process />
      <Why />
      <FinalCTA />
      <Footer />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
