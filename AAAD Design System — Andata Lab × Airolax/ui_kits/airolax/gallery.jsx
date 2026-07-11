// AIROLAX — Immersive Index (filterable gallery)
// Project + technique facets, sliding active indicator, live counter,
// micro-ficha on select, staggered enter/exit. All derived from window.AIROLAX.
const { useState: useStateG, useRef: useRefG, useEffect: useEffectG, useLayoutEffect: useLayoutG } = React;

const pad3 = (n) => String(n).padStart(3, '0');

function XGallery() {
  const tiles = window.AIROLAX.gallery;
  const works = window.AIROLAX.work;
  const discs = window.AIROLAX.discs;

  const [facet, setFacet] = useStateG('proj');   // 'proj' | 'disc'
  const [active, setActive] = useStateG('all');   // chip key
  const [ficha, setFicha] = useStateG(null);

  const gridRef = useRefG(null);
  const cardsRef = useRefG([]);
  const trackRef = useRefG(null);
  const chipRefs = useRefG({});
  const [indi, setIndi] = useStateG({ x: 0, w: 0 });
  const fichaTimer = useRefG(null);

  // ---- draggable-canvas state + helpers ----
  const stageRef = useRefG(null);
  const txRef = useRefG({ x: 0, y: 0 });
  const activeRef = useRefG(active); activeRef.current = active;
  const facetRef = useRefG(facet); facetRef.current = facet;

  const matchesNow = (t) => {
    const k = activeRef.current;
    if (k === 'all') return true;
    return facetRef.current === 'proj' ? t.proj === k : t.disc.includes(k);
  };
  const applyT = () => {
    const gr = gridRef.current;
    if (gr) gr.style.transform = `translate3d(${txRef.current.x}px, ${txRef.current.y}px, 0)`;
  };
  const clampXY = (x, y) => {
    const st = stageRef.current, gr = gridRef.current;
    if (!st || !gr) return [x, y];
    const minX = Math.min(0, st.clientWidth - gr.scrollWidth);
    const minY = Math.min(0, st.clientHeight - gr.scrollHeight);
    return [Math.max(minX, Math.min(0, x)), Math.max(minY, Math.min(0, y))];
  };
  const centerView = () => {
    const st = stageRef.current, gr = gridRef.current;
    if (!st || !gr) return;
    const [cx, cy] = clampXY((st.clientWidth - gr.scrollWidth) / 2, (st.clientHeight - gr.scrollHeight) / 2);
    txRef.current.x = cx; txRef.current.y = cy; applyT();
  };
  // adaptive column count keeps the wall dense at any filter size
  const relayout = () => {
    const gr = gridRef.current;
    if (!gr) return;
    const vis = tiles.filter(matchesNow).length || 1;
    const COL = 264, GAP = 16;
    const cols = Math.max(3, Math.min(11, Math.ceil(vis / 6)));
    gr.style.columnCount = cols;
    gr.style.width = (cols * COL + (cols - 1) * GAP + 20) + 'px';
  };

  // ---- chip model (derived, no duplicate lists) ----
  const matches = (t, key) => key === 'all'
    ? true
    : facet === 'proj' ? t.proj === key : t.disc.includes(key);

  const countFor = (key) => tiles.filter(t => matches(t, key)).length;

  const chips = facet === 'proj'
    ? [{ key: 'all', label: 'Todos' }, ...works.map(w => ({ key: w.id, label: w.t }))]
    : [{ key: 'all', label: 'Todos' }, ...discs.map(d => ({ key: d, label: d }))];

  const visibleCount = countFor(active);
  const total = tiles.length;

  // ---- switch facet → reset selection ----
  const pickFacet = (f) => { if (f === facet) return; setFacet(f); setActive('all'); setFicha(null); };

  // ---- select chip → maybe show micro-ficha ----
  const pickChip = (key) => {
    setActive(key);
    if (key === 'all') { setFicha(null); return; }
    let card;
    if (facet === 'proj') {
      const w = works.find(x => x.id === key);
      card = { kind: 'PROJECT', title: w.t, sub: w.tag, meta: w.year };
    } else {
      card = { kind: 'TECHNIQUE', title: key, sub: 'Discipline', meta: pad3(countFor(key)) + ' works' };
    }
    setFicha(card);
    clearTimeout(fichaTimer.current);
    fichaTimer.current = setTimeout(() => setFicha(null), 2600);
  };

  // ---- staggered exit (only leaving tiles) → reflow → staggered enter ----
  // Entering/staying tiles use fill:'backwards' so they always settle back to
  // the base (opacity 1); they can never get stuck invisible even if a rapid
  // re-filter interrupts the animation. Only leaving tiles fade to 0, then hide.
  useEffectG(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = cardsRef.current;

    // clear anything in-flight so stale fills can't linger
    cards.forEach(el => el && el.getAnimations().forEach(a => a.cancel()));

    if (reduce) {
      tiles.forEach((t, i) => { const el = cards[i]; if (el) el.style.display = matches(t, active) ? '' : 'none'; });
      relayout(); centerView();
      return;
    }
    // phase 1 — fade out only the tiles that are leaving
    tiles.forEach((t, i) => {
      const el = cards[i];
      if (!el) return;
      const wasShown = el.style.display !== 'none';
      const willShow = matches(t, active);
      if (wasShown && !willShow) {
        el.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(.975)' }],
          { duration: 180, easing: 'ease', fill: 'forwards' });
      }
    });
    // phase 2 — reflow to the new set, then stagger the visible ones in
    const tm = setTimeout(() => {
      let vi = 0;
      tiles.forEach((t, i) => {
        const el = cards[i];
        if (!el) return;
        el.getAnimations().forEach(a => a.cancel());
        const willShow = matches(t, active);
        el.style.display = willShow ? '' : 'none';
        if (willShow) {
          el.animate(
            [{ opacity: 0, transform: 'translateY(18px) scale(.965)' }, { opacity: 1, transform: 'none' }],
            { duration: 540, delay: Math.min(vi, 16) * 36, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards' }
          );
          vi++;
        }
      });
      relayout(); centerView();
    }, 190);
    return () => clearTimeout(tm);
  }, [facet, active]);

  // ---- sliding active indicator ----
  useLayoutG(() => {
    const btn = chipRefs.current[active];
    const track = trackRef.current;
    if (!btn || !track) return;
    setIndi({ x: btn.offsetLeft, w: btn.offsetWidth });
    btn.scrollIntoView ? null : null; // no scrollIntoView per house rules
  }, [active, facet, chips.length]);

  useEffectG(() => {
    const onResize = () => {
      const btn = chipRefs.current[active];
      if (btn) setIndi({ x: btn.offsetLeft, w: btn.offsetWidth });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [active]);

  // ---- drag-to-pan canvas (with inertia) ----
  useEffectG(() => {
    const st = stageRef.current, gr = gridRef.current;
    if (!st || !gr) return;
    let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0, vx = 0, vy = 0, last = 0, raf = 0, moved = false;
    const hint = st.querySelector('.gal-hint');
    const onDown = (e) => {
      if (e.button != null && e.button !== 0) return;
      dragging = true; moved = false; st.classList.add('dragging');
      cancelAnimationFrame(raf);
      sx = e.clientX; sy = e.clientY; ox = txRef.current.x; oy = txRef.current.y;
      vx = vy = 0; last = performance.now();
      try { st.setPointerCapture(e.pointerId); } catch (_) {}
      hint && hint.classList.add('gone');
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
      const [cx, cy] = clampXY(ox + dx, oy + dy);
      const now = performance.now(), dt = Math.max(8, now - last);
      vx = (cx - txRef.current.x) / dt * 16; vy = (cy - txRef.current.y) / dt * 16;
      last = now; txRef.current.x = cx; txRef.current.y = cy; applyT();
    };
    const onUp = (e) => {
      if (!dragging) return; dragging = false; st.classList.remove('dragging');
      try { st.releasePointerCapture(e.pointerId); } catch (_) {}
      const step = () => {
        vx *= 0.93; vy *= 0.93;
        if (Math.abs(vx) < 0.15 && Math.abs(vy) < 0.15) return;
        const [cx, cy] = clampXY(txRef.current.x + vx, txRef.current.y + vy);
        if (cx === txRef.current.x) vx = 0;
        if (cy === txRef.current.y) vy = 0;
        txRef.current.x = cx; txRef.current.y = cy; applyT();
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const onClickCap = (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); } };
    const onResize = () => { relayout(); centerView(); };
    st.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    st.addEventListener('click', onClickCap, true);
    window.addEventListener('resize', onResize);
    relayout(); centerView();
    return () => {
      st.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      st.removeEventListener('click', onClickCap, true);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section style={{ padding: '40px 0 96px' }} data-screen-label="airolax-gallery" id="x-gallery">
      {/* header */}
      <div style={gHead}>
        <div>
          <h2 className="ds-label">Index — Full Archive</h2>
          <p style={{ margin: '10px 0 0', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--ink)', lineHeight: 1.04 }}>
            Every frame, one wall.
          </p>
        </div>
        {/* live counter */}
        <div style={gCounter}>
          <span style={{ fontSize: 'clamp(2rem,4vw,3.1rem)', fontWeight: 700, letterSpacing: '-.04em', color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{pad3(visibleCount)}</span>
          <span style={{ fontSize: 'clamp(2rem,4vw,3.1rem)', fontWeight: 300, color: 'var(--ink-3)' }}>/</span>
          <span style={{ fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontWeight: 500, color: 'var(--ink-3)', fontVariantNumeric: 'tabular-nums' }}>{pad3(total)}</span>
        </div>
      </div>

      {/* facet toggle */}
      <div style={gFacetWrap}>
        <div style={gSeg}>
          {[['proj', 'By Project'], ['disc', 'By Technique']].map(([k, l]) => (
            <button key={k} onClick={() => pickFacet(k)}
              style={{ ...gSegBtn, color: facet === k ? 'var(--on-accent)' : 'var(--ink-2)', background: facet === k ? 'var(--ink)' : 'transparent' }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* chips with sliding indicator */}
      <div style={gChipsScroll}>
        <div ref={trackRef} className="gal-chips" style={{ position: 'relative' }}>
          <span aria-hidden="true" style={{ ...gIndicator, transform: `translateX(${indi.x}px)`, width: indi.w }} />
          {chips.map(c => {
            const on = active === c.key;
            return (
              <button key={c.key} ref={el => (chipRefs.current[c.key] = el)} onClick={() => pickChip(c.key)}
                style={{ ...gChip, color: on ? 'var(--on-accent)' : 'var(--ink-2)', borderColor: on ? 'transparent' : 'var(--hair)' }}>
                <span style={{ fontWeight: on ? 600 : 500 }}>{c.label}</span>
                <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.04em', opacity: on ? .72 : .55, fontVariantNumeric: 'tabular-nums' }}>{pad3(countFor(c.key)).slice(1)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* masonry grid — draggable canvas */}
      <div ref={stageRef} className="gal-stage">
        <div ref={gridRef} className="gal-grid">
          {tiles.map((t, i) => (
            <figure key={t.id} ref={el => (cardsRef.current[i] = el)} className="gal-tile" style={{ margin: 0 }}>
              <div className="gal-frame" style={{ aspectRatio: String(t.ar) }}>
                {t.img ? (
                  <img src={t.img} alt={t.projName} loading="lazy" draggable={false}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: t.pos, display: 'block', filter: t.treat === 'none' ? 'none' : t.treat }} />
                ) : (
                  <image-slot id={t.slot} shape="rect" placeholder={`Add to ${t.projName}`} style={{ width: '100%', height: '100%' }}></image-slot>
                )}
                <span className="gal-caption">
                  <span className="ds-label" style={{ color: '#fff', fontSize: 9.5, letterSpacing: '.18em' }}>{t.projName}</span>
                  <span style={{ color: 'rgba(255,255,255,.7)', fontSize: 9.5, fontWeight: 500 }}>{t.disc[0]}</span>
                </span>
                <span className="gal-spec" />
              </div>
            </figure>
          ))}
        </div>
        <div className="gal-hint">✣ drag to explore</div>
      </div>

      {/* micro-ficha */}
      <div style={{ ...gFicha, opacity: ficha ? 1 : 0, transform: ficha ? 'translateY(0)' : 'translateY(14px)', pointerEvents: 'none' }}>
        {ficha && (
          <React.Fragment>
            <span className="ds-label" style={{ color: 'var(--ink-3)', fontSize: 9.5 }}>{ficha.kind}</span>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-.02em', color: 'var(--ink)', marginTop: 3 }}>{ficha.title}</span>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 5 }}>
              <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>{ficha.sub}</span>
              <span style={{ width: 3, height: 3, borderRadius: 999, background: 'var(--ink-3)' }} />
              <span style={{ fontSize: 12, color: 'var(--ink-2)', fontVariantNumeric: 'tabular-nums' }}>{ficha.meta}</span>
            </span>
            <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'var(--spectrum)', borderRadius: 999 }} />
          </React.Fragment>
        )}
      </div>
    </section>
  );
}

const gHead = { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '0 36px', marginBottom: 30 };
const gCounter = { display: 'flex', alignItems: 'baseline', gap: 8, lineHeight: 1 };
const gFacetWrap = { padding: '0 36px', marginBottom: 16 };
const gSeg = { display: 'inline-flex', gap: 4, padding: 4, borderRadius: 999, border: '1px solid var(--hair-2)', background: 'var(--field-bg)' };
const gSegBtn = { fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, letterSpacing: '.01em', padding: '8px 18px', borderRadius: 999, border: 'none', cursor: 'pointer' };
const gChipsScroll = { padding: '0 36px', overflowX: 'auto', scrollbarWidth: 'none' };
const gChip = { position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 8, flex: 'none', fontFamily: 'inherit', fontSize: 13.5, padding: '9px 16px', borderRadius: 999, border: '1px solid var(--hair)', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap' };
const gIndicator = { position: 'absolute', zIndex: 0, top: 0, left: 0, height: '100%', background: 'var(--ink)', borderRadius: 999, transition: 'transform .42s cubic-bezier(.22,.61,.36,1), width .42s cubic-bezier(.22,.61,.36,1)' };
const gFicha = { position: 'fixed', left: 36, bottom: 28, zIndex: 60, display: 'flex', flexDirection: 'column', minWidth: 210, padding: '14px 18px 16px', borderRadius: 16, background: 'var(--surface-2)', border: '1px solid var(--hair)', boxShadow: 'var(--shadow-lift)', overflow: 'hidden', transition: 'opacity .3s, transform .3s' };

Object.assign(window, { XGallery });
