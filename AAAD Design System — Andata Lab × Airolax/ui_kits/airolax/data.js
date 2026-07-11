// AIROLAX — shared data
window.AIROLAX = {
  nav: ['Index', 'Work', 'About', 'Contact'],
  hero: { lines: ['ARGEL EREVAN AIROLA', 'MÉXICO', '1991'], role: 'Multimedia Artist' },
  work: [
    { id: 'bio', t: 'Biointerface', tag: 'AI + Interactive Art', img: '../../assets/proj-biointerface.webp', year: '2025' },
    { id: 'ohm', t: 'OHM', tag: 'Laser Sound Sculpture', img: '../../assets/proj-ohm.webp', year: '2024' },
    { id: 'museo', t: 'Museo Descubre', tag: 'Interactive Museum', img: '../../assets/proj-museo.webp', year: '2024' },
    { id: 'edzna', t: 'Edzná', tag: 'Projection Mapping', img: '../../assets/proj-edzna.webp', year: '2023' },
    { id: 'wavey', t: 'Wavey Runway', tag: 'Generative · Fashion', img: '../../assets/proj-wavey.webp', year: '2023' },
    { id: 'booth', t: 'Whispers of the Lake', tag: 'Immersive Experience', img: '../../assets/img-immersive-booth.jpg', year: '2024' },
  ],
  expos: [
    { y: '2025', t: 'Biointerface', v: 'Museo de Arte · CDMX' },
    { y: '2024', t: 'AI Mirror — Día de Muertos', v: 'Chapala Festival' },
    { y: '2024', t: 'OHM Laser Sculpture', v: 'Luz y Sonido Biennial' },
    { y: '2023', t: 'Edzná Video Mapping', v: 'Campeche Heritage Site' },
  ],
  channels: [
    { l: 'Instagram', h: '#' }, { l: 'Behance', h: '#' }, { l: 'WhatsApp', h: '#' },
  ],
};

/* ----------------------------------------------------------------
   IMMERSIVE INDEX — derived automatically from `work` above.
   No duplicated lists: project chips, technique chips, live counts
   and every gallery tile all come from this single source.

   Each project contributes N tiles (stills / details of the same
   work, varied by crop + tonal treatment) plus a couple of empty
   drop-slots so the artist can keep loading their own images in.
   ---------------------------------------------------------------- */
(function buildIndex() {
  const DISC = {                       // discipline / technique per project
    bio:   ['AI Content', 'Real-time'],
    ohm:   ['Sound', 'Real-time'],
    museo: ['Real-time', 'TouchDesigner'],
    edzna: ['Projection Mapping'],
    wavey: ['Generative', 'AI Content'],
    booth: ['TouchDesigner', 'Real-time'],
  };
  const N = { bio: 12, ohm: 10, museo: 11, edzna: 10, wavey: 10, booth: 12 };

  // tonal treatments + crops so repeated stills read as distinct frames
  const TREAT = [
    'none',
    'grayscale(1) contrast(1.06)',
    'saturate(1.35) contrast(1.08)',
    'sepia(.6) hue-rotate(150deg) saturate(2.4) contrast(1.05)',  // cyan duotone
    'brightness(.92) contrast(1.18)',
    'sepia(.5) hue-rotate(290deg) saturate(2.1)',                 // magenta tint
  ];
  const POS = ['center', 'top', 'bottom', '30% 70%', '70% 30%', 'left', 'right', '50% 20%'];
  const AR  = [1, 0.8, 1.28, 1, 0.74, 1.34, 1, 0.92, 1.1];       // masonry rhythm

  // build each project's tiles, then scatter them deterministically so no
  // project clusters — a hash-sorted order avoids the same still landing in a
  // row or stacked together, giving a real mixed-wall feel.
  const perProj = window.AIROLAX.work.map((w, wi) => {
    const n = N[w.id] || 6;
    const slots = 2;                   // a couple of drop-your-own tiles per project
    const thumb = `../../assets/thumbs/${w.id}.jpg`;   // web-optimized still
    return Array.from({ length: n }, (_, k) => {
      const isSlot = k >= n - slots;
      const idx = wi * 5 + k;
      return {
        id: `${w.id}-${k}`,
        proj: w.id,
        projName: w.t,
        disc: DISC[w.id] || [],
        tag: w.tag,
        year: w.year,
        img:  isSlot ? null : thumb,
        slot: isSlot ? `gal-${w.id}-${k}` : null,
        treat: TREAT[idx % TREAT.length],
        pos:   POS[idx % POS.length],
        ar:    AR[(wi + k) % AR.length],
      };
    });
  });
  const hash = (s) => {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0);
  };
  window.AIROLAX.gallery = perProj.flat().sort((a, b) => (hash(a.id) % 9973) - (hash(b.id) % 9973));

  // unique technique list, in first-seen order
  window.AIROLAX.discs = [...new Set(
    window.AIROLAX.work.flatMap(w => DISC[w.id] || [])
  )];
})();
