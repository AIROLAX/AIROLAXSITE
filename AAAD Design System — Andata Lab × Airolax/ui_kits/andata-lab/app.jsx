// ANDATA LAB — Contact, Footer, project modal, App
const { useState: useStateApp } = React;

function AContact() {
  const [sent, setSent] = useStateApp(false);
  return (
    <section style={{ padding: '90px 40px' }} data-screen-label="andata-contact" id="a-contact">
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64 }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2rem,4.5vw,3.25rem)', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05, margin: 0 }}>Let's build<br />something immersive.</h2>
          <p className="ds-lead" style={{ marginTop: 20, maxWidth: 420 }}>Tell us about the space, the audience and the idea. We scope, design and deliver end-to-end.</p>
          <div style={{ display: 'flex', gap: 28, marginTop: 36 }}>
            <div><span className="ds-label" style={{ color: 'var(--ink-3)' }}>Studio</span><p style={{ margin: '6px 0 0', fontSize: 14 }}>hello@andatalab.art</p></div>
            <div><span className="ds-label" style={{ color: 'var(--ink-3)' }}>Based</span><p style={{ margin: '6px 0 0', fontSize: 14 }}>Mexico · Worldwide</p></div>
          </div>
        </div>
        <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {sent ? (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <p style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.02em', margin: 0 }}>Thanks — message received.</p>
              <p style={{ color: 'var(--ink-2)', marginTop: 8 }}>We reply within 24–48h.</p>
            </div>
          ) : (
            <React.Fragment>
              <input required placeholder="Name or company" style={aField} />
              <input required type="email" placeholder="Email" style={aField} />
              <textarea required rows="4" placeholder="About the project, the venue, the timeline…" style={{ ...aField, resize: 'vertical', fontFamily: 'inherit' }} />
              <button style={{ ...aField, background: 'var(--ink)', color: 'var(--on-accent)', border: 'none', fontWeight: 600, cursor: 'pointer', borderRadius: 999 }}>Send message</button>
            </React.Fragment>
          )}
        </form>
      </div>
    </section>
  );
}
const aField = { fontFamily: 'inherit', fontSize: 15, padding: '15px 18px', borderRadius: 12, border: '1px solid var(--hair)', background: 'var(--field-bg)', color: 'var(--ink)', outline: 'none' };

function AFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--hair)', padding: '40px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <img src="../../assets/logo-mark-black.png" alt="" style={{ width: 28, height: 28 }} />
      <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.04em' }}>Andata Lab*</span>
      <span className="ds-label" style={{ color: 'var(--ink-3)', marginLeft: 'auto' }}>© 2025 — Creative Technology Studio</span>
    </footer>
  );
}

function AModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(20,20,22,.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg)', borderRadius: 22, overflow: 'hidden', maxWidth: 720, width: '100%', boxShadow: 'var(--shadow-lift)' }}>
        <img src={item.img} alt={item.t} style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
        <div style={{ padding: '28px 34px 34px' }}>
          <span className="ds-label" style={{ color: 'var(--ink-3)' }}>{item.tag}</span>
          <h2 style={{ margin: '10px 0 0', fontSize: 30, fontWeight: 700, letterSpacing: '-.025em' }}>{item.t}</h2>
          <p className="ds-lead" style={{ marginTop: 14 }}>Site-specific immersive work — concept, generative content, technical direction and on-site delivery by Andata Lab.</p>
          <button onClick={onClose} style={{ marginTop: 22, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 999, background: 'var(--ink)', color: 'var(--on-accent)', border: 'none', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </div>
  );
}

function AApp() {
  const [active, setActive] = useStateApp('top');
  const [open, setOpen] = useStateApp(null);
  const go = (id) => {
    setActive(id);
    const map = { work: 'a-work', services: 'a-services', contact: 'a-contact', about: 'a-services' };
    const el = document.getElementById(map[id]);
    if (el) window.scrollTo({ top: el.offsetTop - 66, behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div data-brand="andata" style={{ background: 'var(--bg)' }}>
      <ATopBar active={active} onNav={go} />
      <AHero />
      <AWhatWeDo />
      <AServices />
      <AWork onOpen={setOpen} />
      <AContact />
      <AFooter />
      <AModal item={open} onClose={() => setOpen(null)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AApp />);
