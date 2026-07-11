/** Bilingual UI + project copy (EN / ES) — sister sites with Andata Lab */

export type Lang = 'en' | 'es';

const STORAGE_KEY = 'airolax-lang';

export interface ProjectLocaleFields {
  title?: string;
  tag?: string;
  cardSubtitle?: string;
  description?: string[];
  concept?: string;
}

type UiStrings = {
  nav: { work: string; contact: string; andataLab: string };
  brand: { role: string };
  langToggle: { toEs: string; toEn: string };
    sections: {
      selectedWork: string;
      scroll: string;
    scrollDown: string;
    exploreIndex: string;
    expositions: string;
    expositionsSub: string;
  };
  hero: { line2: string; line3: string };
  footer: {
    headline: string;
    sub: string;
    email: string;
    based: string;
    mexico: string;
    worldwide: string;
    name: string;
    org: string;
    message: string;
    send: string;
    note: string;
    legal: string;
  };
};

const UI: Record<Lang, UiStrings> = {
  en: {
    nav: { work: 'Work', contact: 'Contact', andataLab: 'Andata Lab' },
    brand: { role: 'Multimedia Artist' },
    langToggle: { toEs: 'Switch to Spanish', toEn: 'Switch to English' },
    sections: {
      selectedWork: 'Selected work',
      scroll: 'Scroll',
      scrollDown: 'Scroll down',
      exploreIndex: 'Explore Index',
      expositions: 'Expositions',
      expositionsSub:
        'AI-assisted visuals, generative content, and large-scale work delivered on site - museums, festivals, and public space.',
    },
    hero: { line2: 'MÉXICO', line3: 'MULTIMEDIA ARTIST · 1991' },
    footer: {
      headline: "Let's collab",
      sub: 'Get in contact.',
      email: 'Email',
      based: 'Based',
      mexico: 'Mexico',
      worldwide: 'Working worldwide',
      name: 'Name',
      org: 'Museum, brand, festival, studio…',
      message: 'The space, the mood, the timeline — what should people feel?',
      send: 'Send a note',
      note: "No pressure — if it isn't the right match, I'll tell you straight.",
      legal: '© 2026 — Multimedia Artist & Immersive Installation',
    },
  },
  es: {
    nav: { work: 'Trabajo', contact: 'Contacto', andataLab: 'Andata Lab' },
    brand: { role: 'Artista multimedia' },
    langToggle: { toEs: 'Cambiar a español', toEn: 'Cambiar a inglés' },
    sections: {
      selectedWork: 'Trabajo seleccionado',
      scroll: 'Desplazar',
      scrollDown: 'Desplazar',
      exploreIndex: 'Explorar índice',
      expositions: 'Exposiciones',
      expositionsSub:
        'Visuales asistidas por IA, contenido generativo e instalaciones a gran escala en sitio — museos, festivales y espacio público.',
    },
    hero: { line2: 'MÉXICO', line3: 'ARTISTA MULTIMEDIA · 1991' },
    footer: {
      headline: 'Colaboremos',
      sub: 'Ponte en contacto.',
      email: 'Email',
      based: 'Base',
      mexico: 'México',
      worldwide: 'Trabajo en todo el mundo',
      name: 'Nombre',
      org: 'Museo, marca, festival, estudio…',
      message: 'El espacio, el mood, el timeline — ¿qué debería sentir la gente?',
      send: 'Enviar mensaje',
      note: 'Sin compromiso — si no encaja, te lo digo con claridad.',
      legal: '© 2026 — Artista multimedia e instalaciones inmersivas',
    },
  },
};

/** Spanish overrides keyed by project id */
export const PROJECT_LOCALES: Record<string, Partial<Record<Lang, ProjectLocaleFields>>> = {
  '1': {
    es: {
      tag: 'IA + instalación interactiva',
      cardSubtitle: 'Instalación IA interactiva · Ciudad de México',
      description: [
        'Instalación interactiva en la intersección de IA, datos biológicos y arte digital — plantas vivas como instrumentos capacitivos y el tacto del público impulsando un entorno multiscreen en tiempo real.',
        'Un motor TouchDesigner convierte sensores y datos biométricos en un entorno responsivo proyectado en un canvas de tres pantallas (3240 × 1920 px) — diálogo vivo entre humano, planta y máquina.',
      ],
      concept:
        'Biointerface explora el puente entre inteligencia artificial, datos biológicos y arte digital. Plantas cableadas como sensores capacitivos convierten el tacto del visitante en el input que da forma a las visuales en tiempo real.',
    },
  },
  '7': {
    es: {
      title: 'Susurros del Lago. Experiencia inmersiva digital',
      tag: 'Proyección asistida por IA · Instalación cultural',
      cardSubtitle: 'Mapping arquitectónico · Lago de Chapala',
      description: [
        'Video mapping a gran escala sobre una fachada histórica — visuales asistidas por IA, capas generativas y audio espacial para un público real en el Lago de Chapala.',
      ],
    },
  },
  'breathing-space': {
    es: {
      title: 'Breathing Space',
      tag: 'Video generativo · Espacio real',
      cardSubtitle: 'Asana Yoga · Guadalajara',
      description: [
        'Visuales generativas en tiempo real proyectadas en un espacio de yoga — contenido digital que respira con la sala, no solo en pantalla.',
      ],
    },
  },
  'ai-mirror-dia-de-muertos': {
    es: {
      title: 'Espejo IA. Día de Muertos',
      tag: 'Contenido IA · Espejo en tiempo real',
      cardSubtitle: 'Altar interactivo · Chapala',
      description: [
        'Texturas de calavera generadas por IA y retratos compositados en vivo sobre visitantes — contenido IA como experiencia física de altar.',
      ],
    },
  },
  '1b': {
    es: {
      title: 'Biointerface 2',
      tag: 'Contenido IA · Multipantalla',
      cardSubtitle: 'Línea generativa · multiscreen',
      description: [
        'Línea visual generativa que viaja entre múltiples pantallas con sonido espacial — movimiento IA diseñado para un entorno físico multipantalla.',
      ],
    },
  },
  '2': {
    es: {
      title: 'MUSEO DESCUBRE',
      tag: 'Interactivo · Hecho para museo',
      cardSubtitle: 'Museo interactivo · Aguascalientes',
      description: [
        'Experiencia museográfica interactiva en sitio — motion tracking, superficies táctiles y gráficos en tiempo real en una exposición viva.',
      ],
    },
  },
  '3': {
    es: {
      title: 'OHM. Escultura láser interactiva',
      tag: 'Instalación física · Luz y sonido',
      cardSubtitle: 'Escultura cinética · MUTEK',
      description: [
        'Escultura láser cinética en espacio físico — luz de precisión, sensores fotónicos y síntesis sonora en vivo; sin pantalla, construida y presentada in situ.',
      ],
    },
  },
  '4': {
    es: {
      title: 'EDZNA VIDEO MAPPING',
      tag: 'Video mapping · Patrimonio',
      cardSubtitle: 'Zona arqueológica · Campeche',
      description: [
        'Pirámide maya como lienzo — mapping, animación 3D y narrativa para un sitio arqueológico real y show nocturno al público.',
      ],
    },
  },
  '5': {
    es: {
      title: 'Wavey Runway',
      tag: 'IA generativa · Pasarela en vivo',
      cardSubtitle: 'Fashion show · visuales en tiempo real',
      description: [
        'Visuales de IA generativa en pasarela — cada look como lienzo en vivo; VFX en tiempo real y contenido sensible al movimiento.',
      ],
    },
  },
  '6': {
    es: {
      title: 'ThermoSense',
      tag: 'Interactivo · Sensores',
      cardSubtitle: 'Instalación térmica · CDMX',
      description: [
        'Sensores térmicos y visuales generativas en instalación física — el calor corporal invisible hecho visible para el público.',
      ],
    },
  },
  '8': {
    es: {
      title: 'OHM 1',
      tag: 'Instalación física · Láser',
      cardSubtitle: 'Escultura sonora · láser',
      description: [
        'Primera iteración de escultura sonora láser — composiciones geométricas de luz en espacio tridimensional.',
      ],
    },
  },
  '9': {
    es: {
      title: 'Ethereal Motion. Poesía digital',
      tag: 'Video generativo · Motion 3D',
      cardSubtitle: 'Motion graphics · poesía abstracta',
      description: [
        'Pieza de motion 3D generativa — poesía digital abstracta donde forma, luz y movimiento llevan la narrativa.',
      ],
    },
  },
};

let currentLang: Lang = 'en';
const listeners = new Set<(lang: Lang) => void>();

function detectInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'es') return stored;
  } catch {
    /* private mode */
  }
  const nav = (navigator.language || '').toLowerCase();
  return nav.startsWith('es') ? 'es' : 'en';
}

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  if (lang === currentLang) return;
  currentLang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = lang;
  applyDocumentI18n(lang);
  listeners.forEach((fn) => fn(lang));
}

export function onLangChange(fn: (lang: Lang) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function tUi<K extends keyof UiStrings>(section: K, key: keyof UiStrings[K]): string {
  const block = UI[currentLang][section] as Record<string, string>;
  return block[String(key)] ?? '';
}

export function initI18n(): void {
  currentLang = detectInitialLang();
  document.documentElement.lang = currentLang;
  applyDocumentI18n(currentLang);
  initLangToggle();
}

function applyDocumentI18n(lang: Lang): void {
  const ui = UI[lang];
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    const value = resolveI18nKey(ui, key);
    if (value) el.textContent = value;
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (!key) return;
    const value = resolveI18nKey(ui, key);
    if (value && 'placeholder' in el) (el as HTMLInputElement).placeholder = value;
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria;
    if (!key) return;
    const value = resolveI18nKey(ui, key);
    if (value) el.setAttribute('aria-label', value);
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-matrix]').forEach((el) => {
    const key = el.dataset.i18nMatrix;
    if (!key) return;
    const value = resolveI18nKey(ui, key);
    if (value) el.dataset.matrixText = value;
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-en]').forEach((el) => {
    el.hidden = lang !== 'en';
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-es]').forEach((el) => {
    el.hidden = lang !== 'es';
  });
  updateLangToggleButton(lang);
}

function resolveI18nKey(ui: UiStrings, dotted: string): string {
  const parts = dotted.split('.');
  let cur: unknown = ui;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as object)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return '';
    }
  }
  return typeof cur === 'string' ? cur : '';
}

function initLangToggle(): void {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    setLang(currentLang === 'en' ? 'es' : 'en');
  });
  updateLangToggleButton(currentLang);
}

function updateLangToggleButton(lang: Lang): void {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  const ui = UI[lang];
  btn.textContent = lang === 'en' ? 'ES' : 'EN';
  btn.setAttribute('aria-label', lang === 'en' ? ui.langToggle.toEs : ui.langToggle.toEn);
  btn.setAttribute('title', lang === 'en' ? ui.langToggle.toEs : ui.langToggle.toEn);
}

/** Merge locale fields onto a project for the active language */
export function localizeProject<T extends ProjectLocaleFields & { id: string }>(
  project: T,
  lang: Lang = currentLang
): T {
  if (lang === 'en') return project;
  const loc = PROJECT_LOCALES[project.id]?.es;
  if (!loc) return project;
  return {
    ...project,
    ...loc,
    description: loc.description ?? project.description,
  };
}

export function projectCardSubtitle(
  project: ProjectLocaleFields & { credits?: { exhibition?: string } }
): string {
  if (project.cardSubtitle) return project.cardSubtitle;
  const exh = project.credits?.exhibition?.trim();
  return exh || '';
}

/** Claudeworks-style varied tile sizes */
export type CardSize = 'xl' | 'lg' | 'md' | 'sm' | 'wide';

const CARD_SIZE_BY_ID: Partial<Record<string, CardSize>> = {
  '1b': 'xl',
  '1': 'lg',
  '7': 'xl',
  '2': 'lg',
  '4': 'lg',
  '3': 'md',
  '5': 'wide',
  'breathing-space': 'lg',
  'ai-mirror-dia-de-muertos': 'md',
};

const CARD_SIZE_CYCLE: CardSize[] = ['xl', 'lg', 'md', 'md', 'wide', 'lg', 'xl', 'sm', 'md', 'lg', 'md', 'sm'];

export function getProjectCardSize(projectId: string, index: number, portrait = false): CardSize {
  if (portrait) {
    const portraitMap: Partial<Record<string, CardSize>> = {
      '9': 'xl',
      '1b': 'xl',
      '1': 'xl',
      'breathing-space': 'xl',
      'ai-mirror-dia-de-muertos': 'lg',
      '5': 'md',
      '7': 'md',
    };
    return portraitMap[projectId] ?? CARD_SIZE_CYCLE[index % CARD_SIZE_CYCLE.length] ?? 'md';
  }
  return CARD_SIZE_BY_ID[projectId] ?? CARD_SIZE_CYCLE[index % CARD_SIZE_CYCLE.length] ?? 'md';
}
