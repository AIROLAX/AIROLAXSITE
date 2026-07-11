// ANDATA LAB — components (light, B2B studio)
const { useState, useEffect, useRef } = React;

const A_MARK = '../../assets/logo-mark-black.png';

/* ---------------- Top bar ---------------- */
function ATopBar({ active, onNav }) {
  const [clock, setClock] = useState('00:00:00');
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-GB'));
    tick(); const i = setInterval(tick, 1000); return () => clearInterval(i);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header style={{ ...aBar, background: scrolled ? 'rgba(255,255,255,.78)' : 'rgba(255,255,255,1)', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid var(--hair-2)' : '1px solid transparent' }}>
      <a style={aLogo} onClick={() => onNav('top')}>
        <img src={A_MARK} alt="" style={{ width: 22, height: 22 }} />
        Andata&nbsp;Lab<sup style={{ fontSize: '.55em' }}>*</sup>
      </a>
      <span className="ds-label" style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ink-2)', marginLeft: 18 }}>{clock}</span>
      <nav style={aNav}>
        {window.ANDATA.nav.map(n => (
          <a key={n} onClick={() => onNav(n.toLowerCase())}
            style={{ ...aLink, color: active === n.toLowerCase() ? 'var(--ink)' : 'var(--ink-2)', fontWeight: active === n.toLowerCase() ? 500 : 400 }}>{n}</a>
        ))}
        <a style={{ ...aLink, color: 'var(--ink-2)' }} href="../airolax/index.html">AIROLAX↗</a>
      </nav>
    </header>
  );
}
const aBar = { position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', gap: 24, padding: '0 40px', height: 66, transition: 'background .3s, border-color .3s' };
const aLogo = { display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, letterSpacing: '.04em', cursor: 'pointer' };
const aNav = { display: 'flex', gap: 26, marginLeft: 'auto', alignItems: 'center' };
const aLink = { fontSize: 14, textDecoration: 'none', cursor: 'pointer', transition: 'color .2s' };

/* ---------------- Hero ---------------- */
function AHero() {
  return (
    <section style={aHeroWrap} data-screen-label="andata-hero">
      <div style={aMeta}>
        <span className="ds-label">Based In — Mexico</span>
        <span className="ds-label">Creative Technology Studio</span>
        <span className="ds-label">Est. 1991</span>
      </div>
      <h1 style={aHeroH1}>
        <span style={{ display: 'block', fontSize: '.26em', fontWeight: 600, letterSpacing: '.04em', color: 'var(--ink-2)', marginBottom: 18 }}>ANDATA LAB*</span>
        Immersive<br /><span style={{ color: 'var(--ink-2)' }}>Living&nbsp;Art</span>
      </h1>
      <p className="ds-lead" style={{ maxWidth: 560, marginTop: 24 }}>
        Architectural projection, generative art and immersive installations — engineered for global clients at the intersection of art and technology.
      </p>
      <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
        <button style={aBtnPrimary} onMouseDown={e => e.currentTarget.style.transform = 'scale(.97)'} onMouseUp={e => e.currentTarget.style.transform = ''} onMouseLeave={e => e.currentTarget.style.transform = ''}>Start a project</button>
        <button style={aBtnGhost}><span style={{ borderBottom: '1.5px solid var(--ink)', paddingBottom: 3 }}>View selected work</span></button>
      </div>
    </section>
  );
}
const aHeroWrap = { padding: '110px 40px 90px', maxWidth: 1000 };
const aMeta = { display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 40 };
const aHeroH1 = { fontSize: 'clamp(3rem,8vw,6.5rem)', fontWeight: 800, letterSpacing: '-.035em', lineHeight: 1, margin: 0 };
const aBtnPrimary = { fontFamily: 'inherit', fontSize: 15, fontWeight: 600, letterSpacing: '-.01em', padding: '15px 30px', borderRadius: 999, background: 'var(--ink)', color: 'var(--on-accent)', border: 'none', cursor: 'pointer', transition: 'transform .15s' };
const aBtnGhost = { fontFamily: 'inherit', fontSize: 15, fontWeight: 600, padding: '15px 8px', background: 'none', border: 'none', color: 'var(--ink)', cursor: 'pointer' };

/* ---------------- What we do (reel) ---------------- */
function AWhatWeDo() {
  const [playing, setPlaying] = useState(false);
  return (
    <section style={aSection} data-screen-label="andata-whatwedo">
      <h2 className="ds-label" style={{ marginBottom: 24 }}>What We Do</h2>
      <p style={aPillars}>Architectural Mapping · Generative Art · Audiovisual AI / Interactive Design · Spatial Sound</p>
      <figure style={aReel} onClick={() => setPlaying(p => !p)}>
        <img src="../../assets/img-motion.png" alt="Demo reel" style={{ width: '100%', display: 'block', aspectRatio: '16/8.4', objectFit: 'cover', filter: playing ? 'none' : 'saturate(1.05)' }} />
        <span style={aPlay}>{playing ? '❚❚' : '▶'}</span>
        <figcaption className="ds-label" style={aReelCap}>Demo Reel 2026 — 02:14</figcaption>
      </figure>
      <p style={{ ...aPillars, textAlign: 'right', color: 'var(--ink-3)' }}>3D Design · Large-Scale Projection · Technical Direction · Spatial Storytelling</p>
    </section>
  );
}
const aSection = { padding: '40px 40px', maxWidth: 1100, margin: '0 auto' };
const aPillars = { fontFamily: 'var(--font)', fontSize: 13, letterSpacing: '.04em', color: 'var(--ink-2)', lineHeight: 1.5, margin: '0 0 16px' };
const aReel = { position: 'relative', borderRadius: 18, overflow: 'hidden', cursor: 'pointer', boxShadow: 'var(--shadow-card)', margin: '0 0 16px' };
const aPlay = { position: 'absolute', inset: 0, margin: 'auto', width: 64, height: 64, borderRadius: 999, background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#111', pointerEvents: 'none' };
const aReelCap = { position: 'absolute', left: 18, bottom: 16, color: '#fff', textShadow: '0 1px 8px rgba(0,0,0,.5)' };

Object.assign(window, { ATopBar, AHero, AWhatWeDo });
