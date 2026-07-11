// AIROLAX — core (dark, artist portfolio)
const { useState, useEffect, useRef } = React;
const X_MARK = '../../assets/logo-mark-white.png';

/* ---------------- Top bar ---------------- */
function XTopBar({ onNav }) {
  const [clock, setClock] = useState('00:00:00');
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-GB'));
    tick(); const i = setInterval(tick, 1000); return () => clearInterval(i);
  }, []);
  return (
    <header style={xBar}>
      <span className="ds-label" style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ink)' }}>{clock}</span>
      <img src={X_MARK} alt="AIROLAX" style={{ width: 22, height: 22, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
      <nav style={xNav}>
        {window.AIROLAX.nav.map(n => <a key={n} style={xLink} onClick={() => onNav(n.toLowerCase())}>{n}</a>)}
        <a style={{ ...xLink, color: 'var(--ink)' }} href="../andata-lab/index.html">LAB*</a>
      </nav>
    </header>
  );
}
const xBar = { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', padding: '0 36px', height: 60, background: 'rgba(0,0,0,.35)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--hair-2)' };
const xNav = { display: 'flex', gap: 24, marginLeft: 'auto', alignItems: 'center' };
const xLink = { fontSize: 14, color: 'var(--ink-2)', textDecoration: 'none', cursor: 'pointer', transition: 'color .2s' };

/* ---------------- Hero (full-bleed media) ---------------- */
function XHero({ onWork }) {
  const { lines, role } = window.AIROLAX.hero;
  return (
    <section style={xHeroWrap} data-screen-label="airolax-hero">
      <img src="../../assets/img-immersive-booth.jpg" alt="" style={xHeroMedia} />
      <div style={xGrain} />
      <div style={xHeroOverlay} />
      <div style={xHeroContent}>
        <div>
          {lines.map((l, i) => (
            <p key={i} style={{ margin: 0, fontWeight: i === 0 ? 800 : 500, fontSize: i === 0 ? 'clamp(1.6rem,4vw,3rem)' : 'clamp(.8rem,1.4vw,1rem)', letterSpacing: i === 0 ? '-.03em' : '.24em', textTransform: i === 0 ? 'none' : 'uppercase', color: i === 0 ? 'var(--ink)' : 'var(--ink-2)', lineHeight: i === 0 ? 1.05 : 2 }}>{l}</p>
          ))}
          <p style={{ margin: '20px 0 0', fontSize: 13, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>{role}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <button onClick={onWork} style={xHeroBtn}>Artworks</button>
          <span style={{ color: 'var(--ink-2)', fontSize: 18, animation: 'xbob 2s ease-in-out infinite' }}>↓</span>
        </div>
      </div>
    </section>
  );
}
const xHeroWrap = { position: 'relative', height: '100vh', minHeight: 560, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const xHeroMedia = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.15) contrast(1.05)' };
const xHeroOverlay = { position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 50% 40%, rgba(0,0,0,.15), rgba(0,0,0,.78))' };
const xGrain = { position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: .5, background: 'repeating-linear-gradient(0deg, rgba(60,220,255,.018) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(255,46,138,.018) 0 1px, transparent 1px 3px)' };
const xHeroContent = { position: 'relative', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 56, padding: 24, textShadow: '0 2px 24px rgba(0,0,0,.85), 0 1px 4px rgba(0,0,0,.7)' };
const xHeroBtn = { fontFamily: 'inherit', fontSize: 13, fontWeight: 600, letterSpacing: '.06em', padding: '13px 34px', borderRadius: 999, background: 'transparent', color: 'var(--ink)', border: '1px solid rgba(255,255,255,.45)', cursor: 'pointer', transition: 'all .25s' };

Object.assign(window, { XTopBar, XHero });
