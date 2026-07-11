// ANDATA LAB site — top sections (cinematic)
const { useState, useEffect, useRef } = React;
const MARK_W = '../assets/logo-mark-white.png';
const MARK_B = '../assets/logo-mark-black.png';

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
}

function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    f(); window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f);
  }, []);
  const fg = solid ? 'var(--ink)' : '#fff';
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, height: 64, display: 'flex', alignItems: 'center', gap: 22, padding: '0 clamp(20px,4vw,48px)', transition: 'all .4s cubic-bezier(.16,1,.3,1)', background: solid ? 'rgba(255,255,255,.82)' : 'transparent', backdropFilter: solid ? 'blur(16px)' : 'none', borderBottom: solid ? '1px solid var(--hair-2)' : '1px solid transparent' }}>
      <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', fontSize: 14, fontWeight: 600, letterSpacing: '.04em', color: fg, transition: 'color .4s' }}>
        <img src={solid ? MARK_B : MARK_W} alt="" style={{ width: 22, height: 22, transition: 'opacity .4s' }} />Andata&nbsp;Lab<sup style={{ fontSize: '.55em' }}>*</sup>
      </a>
      <nav style={{ display: 'flex', gap: 26, marginLeft: 'auto', alignItems: 'center' }}>
        {window.SITE.nav.map(n => <a key={n} onClick={() => scrollTo('s-' + n.toLowerCase())} style={{ fontSize: 14, color: solid ? 'var(--ink-2)' : 'rgba(255,255,255,.75)', cursor: 'pointer', textDecoration: 'none', transition: 'color .4s' }} className="nav-link">{n}</a>)}
        <button onClick={() => scrollTo('s-contact')} style={{ fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, letterSpacing: '-.01em', padding: '11px 22px', borderRadius: 999, cursor: 'pointer', transition: 'all .4s', border: '1px solid', borderColor: solid ? 'var(--ink)' : 'rgba(255,255,255,.5)', background: solid ? 'var(--ink)' : 'transparent', color: solid ? 'var(--on-accent)' : '#fff' }}>{window.SITE.cta}</button>
      </nav>
    </header>
  );
}

// Subtle generative particle atmosphere — premium drifting motes, not a debug field
function HeroParticles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SPEC = ['255,255,255', '60,220,255', '255,46,138', '255,138,60'];
    let w = 0, h = 0, dpr = 1, parts = [], raf = 0, running = true, t = 0;
    const spawn = () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vy: -(Math.random() * 0.22 + 0.04),
      sway: Math.random() * 0.5 + 0.1, phase: Math.random() * Math.PI * 2,
      a: Math.random() * 0.34 + 0.08,
      c: Math.random() < 0.18 ? SPEC[1 + ((Math.random() * 3) | 0)] : SPEC[0],
      glow: Math.random() < 0.2,
    });
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: Math.round(Math.min(95, Math.max(38, w / 16))) }, spawn);
    };
    const draw = (animate) => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (animate) { p.y += p.vy; if (p.y < -12) { p.y = h + 12; p.x = Math.random() * w; } }
        const x = p.x + Math.sin(t + p.phase) * p.sway * 7;
        ctx.globalAlpha = p.a;
        ctx.shadowBlur = p.glow ? 8 : 0;
        ctx.shadowColor = p.glow ? 'rgba(' + p.c + ',.6)' : 'transparent';
        ctx.fillStyle = 'rgba(' + p.c + ',1)';
        ctx.beginPath(); ctx.arc(x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    };
    const loop = () => { if (!running) return; draw(true); raf = requestAnimationFrame(loop); };
    resize();
    if (reduce) draw(false); else loop();
    const onResize = () => resize();
    const onVis = () => { running = !document.hidden; if (running && !reduce) raf = requestAnimationFrame(loop); };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'screen', pointerEvents: 'none' }} />;
}

// Cinematic full-bleed hero — demo reel as the central visual asset
function Hero() {
  const h = window.SITE.hero;
  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 560, overflow: 'hidden', background: '#000' }} data-screen-label="hero">
      <img src={h.poster} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <video
        className="hero-video"
        autoPlay muted loop playsInline preload="auto"
        poster={h.poster}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', background: 'transparent' }}
      >
        <source src={h.video} type="video/mp4" onError={(e) => { const v = e.currentTarget.parentElement; if (v) v.style.display = 'none'; }} />
      </video>
      {/* dark cinematic overlay for legibility */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.18) 36%, rgba(0,0,0,.5) 70%, rgba(0,0,0,.86) 100%)' }} />
      {/* subtle generative particle atmosphere */}
      <HeroParticles />
      {/* Showreel label */}
      <div className="hero-in" style={{ position: 'absolute', top: 'clamp(82px,12vh,108px)', left: 'clamp(20px,4vw,48px)', display: 'flex', alignItems: 'center', gap: 9, animationDelay: '.1s' }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: '#fff', boxShadow: '0 0 0 4px rgba(255,255,255,.18)' }} />
        <span className="ds-label" style={{ color: 'rgba(255,255,255,.85)' }}>{h.reelLabel}</span>
      </div>

      <div style={{ position: 'relative', height: '100%', maxWidth: 1240, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 'clamp(52px,9vh,110px)' }}>
        <h1 className="hero-in" style={{ fontSize: 'clamp(2.6rem,8vw,7rem)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: .96, margin: 0, color: '#fff', textWrap: 'balance', animationDelay: '.2s', textShadow: '0 2px 40px rgba(0,0,0,.45)' }}>
          {h.h1a}<br /><span style={{ color: 'rgba(255,255,255,.55)' }}>{h.h1b}</span>
        </h1>
        <p className="hero-in" style={{ fontSize: 'clamp(1.02rem,1.5vw,1.3rem)', fontWeight: 400, lineHeight: 1.5, color: 'rgba(255,255,255,.82)', maxWidth: 580, margin: '24px 0 0', textShadow: '0 1px 24px rgba(0,0,0,.5)', animationDelay: '.3s' }}>{h.sub}</p>
        <div className="hero-in" style={{ display: 'flex', gap: 14, marginTop: 38, flexWrap: 'wrap', animationDelay: '.42s' }}>
          <button onClick={() => scrollTo('s-work')} className="hero-ghost" style={{ fontFamily: 'inherit', fontSize: 15, fontWeight: 600, letterSpacing: '-.01em', padding: '16px 32px', borderRadius: 999, background: 'rgba(255,255,255,.08)', color: '#fff', border: '1px solid rgba(255,255,255,.45)', cursor: 'pointer', backdropFilter: 'blur(6px)', transition: 'all .25s' }}>{h.ctaSecondary}</button>
          <button onClick={() => scrollTo('s-contact')} className="btn-primary" style={{ fontFamily: 'inherit', fontSize: 15, fontWeight: 600, letterSpacing: '-.01em', padding: '16px 34px', borderRadius: 999, background: '#fff', color: '#111', border: '1px solid #fff', cursor: 'pointer' }}>{h.ctaPrimary}</button>
        </div>
      </div>
    </section>
  );
}

// Confident statement — the value prop as one cinematic line (replaces the run-on capabilities)
function Statement() {
  const s = window.SITE.statement;
  return (
    <section className="reveal" style={{ padding: 'clamp(80px,14vh,150px) clamp(20px,4vw,48px)', maxWidth: 1100, margin: '0 auto' }}>
      <p style={{ fontSize: 'clamp(1.6rem,3.6vw,2.9rem)', fontWeight: 500, letterSpacing: '-.025em', lineHeight: 1.18, margin: 0, textWrap: 'balance' }}>
        <span style={{ color: 'var(--ink)' }}>{s.lead}</span> <span style={{ color: 'var(--ink-3)' }}>{s.rest}</span>
      </p>
    </section>
  );
}

function TrustBar() {
  const c = window.SITE.clients;
  return (
    <section className="reveal" style={{ borderTop: '1px solid var(--hair-2)', borderBottom: '1px solid var(--hair-2)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '30px clamp(20px,4vw,48px)', display: 'flex', alignItems: 'center', gap: 'clamp(24px,5vw,68px)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span className="ds-label" style={{ color: 'var(--ink-3)', flex: 'none' }}>Selected clients & venues</span>
        {c.map(x => x.img
          ? <img key={x.name} src={x.img} alt={x.name} style={{ height: 24, opacity: .6, filter: 'grayscale(1)' }} />
          : <span key={x.name} style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-.01em', color: 'var(--ink-2)' }}>{x.name}</span>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Statement, TrustBar, scrollTo });
