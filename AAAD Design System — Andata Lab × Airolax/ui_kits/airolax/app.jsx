// AIROLAX — Expositions, Contact footer, App
const { useState: useStateX } = React;

function XExpos() {
  return (
    <section style={{ padding: '90px 36px' }} data-screen-label="airolax-expos" id="x-about">
      <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-.03em', margin: 0, color: 'var(--ink)' }}>Expositions</h2>
      <p className="ds-lead" style={{ color: 'var(--ink-2)', margin: '10px 0 40px' }}>Museums, festivals and public presentations.</p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {window.AIROLAX.expos.map((e, i) => (
          <li key={i} style={xRow}>
            <span className="ds-label" style={{ color: 'var(--ink-2)', width: 70, flex: 'none', fontVariantNumeric: 'tabular-nums' }}>{e.y}</span>
            <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-.01em', color: 'var(--ink)', flex: 1 }}>{e.t}</span>
            <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{e.v}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
const xRow = { display: 'flex', alignItems: 'center', gap: 18, padding: '20px 0', borderTop: '1px solid var(--hair-2)' };

function XContact() {
  const [sent, setSent] = useStateX(false);
  return (
    <footer style={{ padding: '90px 36px 70px', borderTop: '1px solid var(--hair)' }} data-screen-label="airolax-contact" id="x-contact">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, maxWidth: 1000 }}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-.03em', margin: 0, color: 'var(--ink)' }}>Let's collaborate</h2>
          <p className="ds-lead" style={{ color: 'var(--ink-2)', marginTop: 14 }}>Send a message. I reply within 24–48h.</p>
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28, maxWidth: 380 }}>
            {sent ? <p style={{ color: 'var(--ink)', fontWeight: 600 }}>Thanks — talk soon.</p> : <React.Fragment>
              <input required placeholder="Your name" style={xField} />
              <input required type="email" placeholder="Your email" style={xField} />
              <textarea required rows="3" placeholder="Tell me about your project…" style={{ ...xField, resize: 'vertical', fontFamily: 'inherit' }} />
              <button style={{ ...xField, background: 'var(--ink)', color: 'var(--on-accent)', border: 'none', fontWeight: 600, cursor: 'pointer', borderRadius: 999 }}>Send Message</button>
            </React.Fragment>}
          </form>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>Airola Argel Erevan.</p>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: 0 }}>Multimedia Artist. Director. Producer.</p>
          <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: '4px 0 24px' }}>Based in Mexico. Working worldwide.</p>
          <span className="ds-label" style={{ color: 'var(--ink-3)', marginBottom: 10 }}>Artist Channels</span>
          <div style={{ display: 'flex', gap: 18 }}>
            {window.AIROLAX.channels.map(c => <a key={c.l} href={c.h} className="x-chan" style={{ fontSize: 14, color: 'var(--ink-2)', textDecoration: 'none' }}>{c.l}</a>)}
          </div>
          <p className="ds-label" style={{ color: 'var(--ink-3)', marginTop: 'auto', paddingTop: 40 }}>2025©</p>
        </div>
      </div>
    </footer>
  );
}
const xField = { fontFamily: 'inherit', fontSize: 15, padding: '14px 16px', borderRadius: 12, border: '1px solid var(--hair)', background: 'var(--field-bg)', color: 'var(--ink)', outline: 'none' };

function XApp() {
  const go = (id) => {
    const map = { work: 'x-work', index: 'x-gallery', about: 'x-about', contact: 'x-contact' };
    const el = document.getElementById(map[id]);
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
  };
  return (
    <div data-brand="airolax" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <XTopBar onNav={go} />
      <XHero onWork={() => go('index')} />
      <XGallery />
      <XWork />
      <XExpos />
      <XContact />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<XApp />);
