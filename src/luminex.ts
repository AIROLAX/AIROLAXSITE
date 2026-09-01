import './colors_and_type.css';
import './site-footer-andata.css';
import './luminex.css';
import { getLang, initI18n, onLangChange, type Lang } from './i18n';
import thumbsFile from './luminex-thumbs.json';

type Thumb = { src: string; srcSet: string; width: number; height: number };

const thumbs = (thumbsFile as { thumbs: Record<string, Thumb> }).thumbs;

type Copy = { kicker: string; title: string; body: string; badge?: string };

type Chapter = {
  id: string;
  slug: string;
  thumb: string;
  alt: string;
  en: Copy;
  es: Copy;
};

const CHAPTERS: Chapter[] = [
  {
    id: 'hero',
    slug: '',
    thumb: 'hero',
    alt: 'Argel Erevan Airola — LUMINEX 4.0',
    en: {
      kicker: 'LUMINEX 4.0 · Los Angeles · Resonance of Connection',
      title: 'Argel Erevan Airola',
      body: 'Multimedia artist from Culiacán, Sinaloa. I work with technology as an extension of art — light, sound, and living systems that open spaces of connection.',
    },
    es: {
      kicker: 'LUMINEX 4.0 · Los Ángeles · Resonance of Connection',
      title: 'Argel Erevan Airola',
      body: 'Artista multimedia de Culiacán, Sinaloa. Trabajo la tecnología como extensión del arte — luz, sonido y sistemas vivos que abren espacios de encuentro.',
    },
  },
  {
    id: 'ohm-1',
    slug: 'ohm-1',
    thumb: 'ohm-1',
    alt: 'OHM 1 — kinetic laser sculpture with a person inside the ring',
    en: {
      kicker: 'OHM 1',
      title: 'OHM 1',
      body: 'Kinetic laser sculpture — it divides physical space and holds a place suspended in time, through precision light and live sound. MUTEK Festival.',
    },
    es: {
      kicker: 'OHM 1',
      title: 'OHM 1',
      body: 'Escultura láser cinética — divide el espacio físico y crea un lugar suspendido en el tiempo, a través de luz de precisión y sonido en vivo. Festival MUTEK.',
    },
  },
  {
    id: 'ohm-1c',
    slug: 'ohm-1',
    thumb: 'ohm-1c',
    alt: 'OHM 1 — blue laser sound sculpture',
    en: { kicker: 'OHM 1', title: '', body: '' },
    es: { kicker: 'OHM 1', title: '', body: '' },
  },
  {
    id: 'ohm-2',
    slug: 'ohm-2',
    thumb: 'ohm-2',
    alt: 'OHM 2 — blue kinetic laser sculpture',
    en: {
      kicker: 'OHM 2',
      title: 'OHM 2',
      body: 'Kinetic laser sculpture — blue variant. A circular chamber of precision light and sound; space held in suspension, inhabited from within. Museo Descubre.',
    },
    es: {
      kicker: 'OHM 2',
      title: 'OHM 2',
      body: 'Escultura láser cinética — variante azul. Una cámara circular de luz de precisión y sonido; el espacio queda suspendido, habitable desde adentro. Museo Descubre.',
    },
  },
  {
    id: 'thermosense',
    slug: 'thermosense',
    thumb: 'thermosense',
    alt: 'ThermoSense — thermal sensors and generative visuals',
    en: {
      kicker: 'ThermoSense',
      title: 'ThermoSense',
      body: 'Thermal sensors and generative visuals — the heat of the human body, invisible, made visible for the public. Mexico City.',
    },
    es: {
      kicker: 'ThermoSense',
      title: 'ThermoSense',
      body: 'Sensores térmicos y visuales generativas — el calor del cuerpo humano, invisible, hecho visible para el público. CDMX.',
    },
  },
  {
    id: 'wavey',
    slug: 'wavey-runway',
    thumb: 'wavey',
    alt: 'Wavey Runway — live generative AI on the runway',
    en: {
      kicker: 'Wavey Runway',
      title: 'Wavey Runway',
      body: 'Live generative AI on the runway — each look as a canvas, VFX in real time.',
    },
    es: {
      kicker: 'Wavey Runway',
      title: 'Wavey Runway',
      body: 'IA generativa en pasarela en vivo — cada look como lienzo, VFX en tiempo real.',
    },
  },
  {
    id: 'biointerface',
    slug: 'biointerface',
    thumb: 'biointerface',
    alt: 'Biointerface — living plants as capacitive instruments',
    en: {
      kicker: 'Biointerface',
      title: 'Biointerface',
      body: 'Interactive installation — living plants as capacitive instruments; human touch activates the piece. Mexico City.',
    },
    es: {
      kicker: 'Biointerface',
      title: 'Biointerface',
      body: 'Instalación interactiva — plantas vivas como instrumentos capacitivos, el tacto humano activa la pieza. Ciudad de México.',
    },
  },
  {
    id: 'resonance',
    slug: 'resonance',
    thumb: 'resonance',
    alt: 'Resonance of Connection — concept proposal 2027',
    en: {
      kicker: 'Proposal 2027',
      title: 'Resonance of Connection',
      body: 'A new iteration of Biointerface: instead of plants, two people connected by a handshake trigger a generative response of light, sound, and movement in real time. Resonance of human connection, mediated by a system that answers like a living organism.',
      badge: 'Work in progress · Concept',
    },
    es: {
      kicker: 'Propuesta 2027',
      title: 'Resonance of Connection',
      body: 'Nueva iteración de Biointerface: en lugar de plantas, dos personas conectadas por un apretón de manos disparan una respuesta generativa de luz, sonido y movimiento en tiempo real. Resonancia de la conexión humana, mediada por un sistema que responde como un organismo vivo.',
      badge: 'Work in progress · Concepto',
    },
  },
];

function pageId(): string {
  return document.body.dataset.lx || 'index';
}

function chapterForPage(): Chapter[] {
  const id = pageId();
  if (id === 'index') return CHAPTERS;
  const group = CHAPTERS.filter((c) => c.slug === id);
  if (group.length) return group;
  const one = CHAPTERS.find((c) => c.id === id);
  return one ? [one] : CHAPTERS;
}

function imgTag(chapter: Chapter, eager: boolean): string {
  const t = thumbs[chapter.thumb];
  if (!t) return '';
  const loading = eager ? 'eager' : 'lazy';
  const pri = eager ? ' fetchpriority="high"' : '';
  const ar = t.width && t.height ? ` style="aspect-ratio:${t.width}/${t.height}"` : '';
  return `<img src="${t.src}" srcset="${t.srcSet}" sizes="100vw" width="${t.width}" height="${t.height}" alt="${chapter.alt}" loading="${loading}" decoding="async"${pri}${ar} draggable="false">`;
}

function chapterHtml(chapter: Chapter, eager: boolean): string {
  const isHero = chapter.id === 'hero';
  const titleTag = isHero ? 'h1' : 'h2';
  const href =
    pageId() === 'index' && chapter.slug && chapter.id === chapter.slug
      ? `/luminex/${chapter.slug}/`
      : '';
  const open = href ? `<a class="lx-chapter-link" href="${href}">` : '';
  const close = href ? '</a>' : '';
  const img = imgTag(chapter, eager);
  const figureClass = img ? 'lx-figure' : 'lx-figure lx-figure--empty';
  return `
    <section class="lx-chapter${isHero ? ' lx-chapter--hero is-in' : ''}" id="${chapter.id}" data-lx-chapter="${chapter.id}">
      <figure class="${figureClass}">${img}</figure>
      <div class="lx-copy">
        ${open}
        <span class="lx-badge" data-lx-field="badge" hidden></span>
        <p class="lx-kicker" data-lx-field="kicker"></p>
        <${titleTag} data-lx-field="title"></${titleTag}>
        ${close}
        <p class="lx-body" data-lx-field="body"></p>
      </div>
    </section>`;
}

function applyChapterCopy(lang: Lang): void {
  document.querySelectorAll<HTMLElement>('[data-lx-chapter]').forEach((section) => {
    const id = section.dataset.lxChapter;
    const chapter = CHAPTERS.find((c) => c.id === id);
    if (!chapter) return;
    const copy = chapter[lang];
    const set = (field: keyof Copy, text: string | undefined) => {
      const el = section.querySelector<HTMLElement>(`[data-lx-field="${field}"]`);
      if (!el) return;
      if (!text) {
        el.hidden = true;
        el.textContent = '';
        return;
      }
      el.hidden = false;
      el.textContent = text;
    };
    set('badge', copy.badge);
    set('kicker', copy.kicker);
    set('title', copy.title);
    set('body', copy.body);
  });
}

function pagerHtml(): string {
  if (pageId() === 'index') return '';
  const works = CHAPTERS.filter((c) => c.slug).filter(
    (c, i, arr) => arr.findIndex((x) => x.slug === c.slug) === i
  );
  const i = works.findIndex((c) => c.slug === pageId() || c.id === pageId());
  if (i < 0) return '';
  const prev = works[i - 1];
  const next = works[i + 1];
  const prevLink = prev
    ? `<a href="/luminex/${prev.slug}/">${prev.en.title}</a>`
    : `<span></span>`;
  const nextLink = next
    ? `<a href="/luminex/${next.slug}/">${next.en.title}</a>`
    : `<span></span>`;
  return `<nav class="lx-pager" aria-label="Works">
    ${prevLink}
    <a href="/luminex/">LUMINEX</a>
    ${nextLink}
  </nav>`;
}

function headerHtml(): string {
  const home = '/';
  return `
  <header class="lx-nav">
    <a class="lx-brand" href="${home}">
      Argel Erevan Airola
      <span>LUMINEX 4.0</span>
    </a>
    <nav class="lx-nav-links">
      <a href="/#projects" data-i18n="nav.work">Work</a>
      <a href="/#contact" data-i18n="nav.contact">Contact</a>
      <a href="https://www.andatalab.art" target="_blank" rel="noopener noreferrer" data-i18n="nav.andataLab">Andata Lab</a>
      <button type="button" class="lang-toggle" id="lang-toggle" aria-label="Switch to Spanish">ES</button>
    </nav>
    <button type="button" class="lx-menu-toggle" id="lx-menu-toggle" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </header>
  <div class="lx-drawer" id="lx-drawer">
    <a href="/#projects" data-i18n="nav.work">Work</a>
    <a href="/#contact" data-i18n="nav.contact">Contact</a>
    <a href="https://www.andatalab.art" target="_blank" rel="noopener noreferrer">Andata Lab</a>
    <a href="/luminex/">LUMINEX 4.0</a>
  </div>`;
}

function footerHtml(): string {
  return `
    <footer class="site-footer site-footer--andata" id="contact">
      <section class="site-footer__cta" aria-labelledby="footer-contact-heading">
        <div class="site-footer__cta-inner">
          <div class="site-footer__lead">
            <h2 class="site-footer__headline" id="footer-contact-heading" data-i18n="footer.headline">Let&apos;s collab</h2>
            <p class="site-footer__sub" data-i18n="footer.sub">Get in contact.</p>
            <div class="site-footer__details">
              <div class="site-footer__detail">
                <span class="site-footer__label" data-i18n="footer.email">Email</span>
                <a href="mailto:airolaxx@gmail.com" class="site-footer__detail-value site-footer__detail-value--plain">airolaxx@gmail.com</a>
              </div>
              <div class="site-footer__detail">
                <span class="site-footer__label" data-i18n="footer.based">Based</span>
                <div class="site-footer__location-row">
                  <span class="site-footer__location-pill">
                    <span class="site-footer__location-pill-text" data-i18n="footer.mexico">Mexico</span>
                  </span>
                  <span class="site-footer__location-sep" aria-hidden="true">·</span>
                  <span class="site-footer__location-wide">
                    <span data-i18n="footer.worldwide">Working worldwide</span>
                  </span>
                </div>
              </div>
            </div>
            <nav class="site-footer__channels" aria-label="Contact and channels">
              <a href="/Portfolio.pdf" class="site-footer__channel-link site-footer__channel-link--text" download="Argel-Erevan-Airola-Portfolio.pdf">Portfolio</a>
              <a href="/CV.pdf" class="site-footer__channel-link site-footer__channel-link--text" download="Argel-Erevan-Airola-CV-2027.pdf">CV</a>
            </nav>
          </div>
          <form class="site-footer__form" id="footer-contact-form">
            <div class="site-footer__form-row">
              <input type="text" name="name" class="site-footer__field" data-i18n-placeholder="footer.name" placeholder="Name" required aria-label="Name">
              <input type="email" name="email" class="site-footer__field" data-i18n-placeholder="footer.email" placeholder="Email" required aria-label="Email">
            </div>
            <input type="text" name="organization" class="site-footer__field" data-i18n-placeholder="footer.org" placeholder="Museum, brand, festival, studio…" aria-label="Organization">
            <textarea name="message" class="site-footer__field site-footer__field--area" rows="4" data-i18n-placeholder="footer.message" placeholder="The space, the mood, the timeline — what should people feel?" required aria-label="Message"></textarea>
            <button type="submit" class="site-footer__submit" data-i18n="footer.send">Send a note</button>
            <p class="site-footer__form-note" data-i18n="footer.note">No pressure — if it isn&apos;t the right match, I&apos;ll tell you straight.</p>
            <div class="footer-form-message" id="footer-form-message"></div>
          </form>
        </div>
      </section>
      <div class="site-footer__bar">
        <span class="site-footer__brand">Argel Erevan Airola</span>
        <a href="https://www.andatalab.art" class="site-footer__cross" target="_blank" rel="noopener noreferrer">Andata Lab ↗</a>
        <span class="site-footer__legal" data-i18n="footer.legal">© 2026 — Multimedia Artist &amp; Immersive Installation</span>
      </div>
    </footer>`;
}

function render(): void {
  const root = document.getElementById('lx-root');
  if (!root) return;
  const chapters = chapterForPage();
  const body = chapters.map((ch, i) => chapterHtml(ch, i === 0)).join('');
  root.innerHTML = `${headerHtml()}<main>${body}</main>${pagerHtml()}${footerHtml()}`;
}

function initReveal(): void {
  const nodes = document.querySelectorAll('.lx-chapter:not(.is-in)');
  if (!nodes.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.classList.add('is-in');
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  nodes.forEach((n) => io.observe(n));
}

function initMenu(): void {
  const btn = document.getElementById('lx-menu-toggle');
  const drawer = document.getElementById('lx-drawer');
  if (!btn || !drawer) return;
  btn.addEventListener('click', () => {
    const open = drawer.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  drawer.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => drawer.classList.remove('is-open'));
  });
}

function initFooterForm(): void {
  const form = document.getElementById('footer-contact-form') as HTMLFormElement | null;
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const organization = String(data.get('organization') || '');
    const message = String(data.get('message') || '');
    const box = document.getElementById('footer-form-message');
    if (!name || !email || !message) {
      if (box) {
        box.textContent = 'Please fill in all fields.';
        box.className = 'footer-form-message error';
      }
      return;
    }
    const subject = encodeURIComponent(`Project brief from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}${organization ? `\nOrganization: ${organization}` : ''}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:airolaxx@gmail.com?subject=${subject}&body=${body}`;
    if (box) {
      box.textContent = 'Your email client will open. Send the message to reach us.';
      box.className = 'footer-form-message success';
    }
    form.reset();
  });
}

function boot(): void {
  document.body.classList.add('lx-page');
  render();
  initI18n();
  applyChapterCopy(getLang());
  onLangChange((lang) => applyChapterCopy(lang));
  initReveal();
  initMenu();
  initFooterForm();
}

boot();
