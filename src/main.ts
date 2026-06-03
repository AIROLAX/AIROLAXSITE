// ==========================================
// IMPORTS
// ==========================================
import './styles.css';
import './colors_and_type.css';
import './aaad-theme.css';
import { initImmersiveIndex } from './immersive-index';
import { mediaUrl } from './media';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** GA4 — ID from Vite env (set VITE_GA_MEASUREMENT_ID in Vercel / .env). See .env.example */
function initGoogleAnalytics(): void {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!id || String(id).trim() === '') return;
  const w = window as unknown as { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer.push(args);
  };
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(String(id))}`;
  document.head.appendChild(script);
  w.gtag?.('js', new Date());
  w.gtag?.('config', String(id));
}
initGoogleAnalytics();

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// TYPE DEFINITIONS
// ==========================================
interface Project {
  id: string;
  title: string;
  tag: string;
  videoUrl: string;
  poster?: string;
  description: string[];
  technologies: string[];
  concept: string;
  galleryItems: Array<{type: 'video' | 'image'; src: string; alt?: string}>;
  credits: {
    direction: string;
    development: string;
    exhibition: string;
    duration: string;
  };
}

// ==========================================
// THREE.JS TYPE DECLARATIONS
// ==========================================
declare const THREE: any;

// ==========================================
// PROJECT DATA
// ==========================================
const projects: Project[] = [
  {
    id: '1',
    title: 'Biointerface',
    tag: 'AI Content · Interactive Installation',
    videoUrl: '/videos/compressed/pro1.mp4',
    poster: '/videos/BIOINTERFACE/1.JPG',
    description: [
      'AI-driven visuals and biometric data translated into a live interactive installation — digital content made tangible for audiences in the room.',
      'Developed using machine learning algorithms, biometric sensors, real-time processing with Python and OpenCV, and interactive visualization systems.',
      'Deliverables: Real-time interactive system, biometric data visualization, and immersive installation design.'
    ],
    technologies: ['Machine Learning', 'Biometric Sensors', 'Real-time Processing', 'Interactive Visualization', 'Python', 'OpenCV'],
    concept: 'The concept explores how technology can serve as a mirror to our internal biological processes, making the invisible visible through art. By translating physiological data into aesthetic experiences, Biointerface creates a new form of human-computer interaction that is both intimate and universal.',
    galleryItems: [
      { type: 'image', src: '/videos/BIOINTERFACE/F2.jpg', alt: 'Biointerface Installation' },
      { type: 'video', src: '/videos/compressed/BIOINTERFACE/4.mp4', alt: 'Biointerface Detail' }
    ],
    credits: {
      direction: 'AIROLAX',
      development: 'AIROLAX Team',
      exhibition: 'Mexico City · event presentation 2024',
      duration: '2024'
    }
  },
  {
    id: '7',
    title: 'Whispers of the Lake. Digital Immersive Experience',
    tag: 'AI-Assisted Projection · Cultural Installation',
    // Use original master video; compressed versions live under /videos but we avoid broken /videos/optimized paths
    videoUrl: '/videos/chapala_project/1.mp4',
    poster: '/videos/chapala_project/1.mp4',
    description: [
      'Large-scale projection mapping on a historic façade — AI-assisted visuals, generative layers, and spatial audio composed for a real public audience at Lake Chapala.',
      'Developed using 3D projection mapping, Blender for architectural modeling, After Effects for animation, AI-assisted visuals via Runway, TouchDesigner for real-time generative systems, and spatial audio design.',
      'Deliverables: Large-scale projection mapping show, 3D animations, generative visual content, and spatial sound installation.'
    ],
    technologies: ['3D Projection Mapping', 'Blender', 'After Effects', 'Runway / AI Tools', 'TouchDesigner', 'Spatial Audio'],
    concept: 'The concept explores the spiritual connection between the lake, its ancestral stories, and the transition between life and death. Through layered 3D animations, architectural transformations, and atmospheric sound design, the façade becomes a portal between worlds.',
    galleryItems: [
      { type: 'video', src: '/videos/chapala_project/2.mp4', alt: 'Chapala Projection Mapping detail' },
      { type: 'video', src: '/videos/chapala_project/3.mp4', alt: 'Chapala Projection Mapping ambience' }
    ],
    credits: {
      direction: 'Airolax',
      development: 'Airolax Studio + Collaborators',
      exhibition: 'Chapala, Jalisco. Día de Muertos 2025',
      duration: '3 months development'
    }
  },
  {
    id: 'breathing-space',
    title: 'Breathing Space',
    tag: 'Generative Video · Real Space',
    videoUrl: '/videos/ASANA_YOGA/elbueno.mp4',
    poster: '/videos/ASANA_YOGA/elbueno.mp4',
    description: [
      'Real-time generative visuals projected into a physical yoga space — digital content that breathes with the room, not a screen-only piece.',
      'Using TouchDesigner and real-time generative systems, the space was transformed into a living environment of light and motion.',
      'A cubic architecture became a responsive field where generative visuals evolved continuously, creating a contemplative atmosphere between body, perception and space.'
    ],
    technologies: ['TouchDesigner', 'Real-time generative systems', 'Projection mapping', 'Generative Art'],
    concept: 'Breathing Space is a generative audiovisual installation that transforms a cubic architecture into a responsive field. Developed for Asana Yoga at Conjunto Santander, Guadalajara, the piece uses TouchDesigner and real-time generative systems to create a living environment of light and motion, where visuals evolve continuously and the space becomes a contemplative dialogue between body, perception and environment.',
    galleryItems: [
      { type: 'video', src: '/videos/ASANA_YOGA/IMG_6114.MOV', alt: 'Breathing Space, Asana Yoga installation' },
      { type: 'image', src: '/videos/ASANA_YOGA/IMG_20260131_103426.jpg', alt: 'Breathing Space, Asana Yoga installation' },
      { type: 'image', src: '/videos/ASANA_YOGA/IMG_20260131_120910.jpg', alt: 'Breathing Space, Asana Yoga installation' },
      { type: 'image', src: '/videos/ASANA_YOGA/IMG_20260131_170352.jpg', alt: 'Breathing Space, Asana Yoga installation' },
      { type: 'image', src: '/videos/ASANA_YOGA/IMG_20260201_141845.jpg', alt: 'Breathing Space, Asana Yoga installation' },
      { type: 'image', src: '/videos/ASANA_YOGA/IMG_20260201_142306.jpg', alt: 'Breathing Space, Asana Yoga installation' },
      { type: 'image', src: '/videos/ASANA_YOGA/IMG_20260201_144131.jpg', alt: 'Breathing Space, Asana Yoga installation' },
      { type: 'image', src: '/videos/ASANA_YOGA/IMG_20260201_164343.jpg', alt: 'Breathing Space, Asana Yoga installation' }
    ],
    credits: {
      direction: 'AIROLAX',
      development: 'AIROLAX',
      exhibition: 'Guadalajara, Mexico · Asana Yoga, Conjunto Santander 2026',
      duration: '2026'
    }
  },
  {
    id: 'ai-mirror-dia-de-muertos',
    title: 'AI Mirror. Día de Muertos',
    tag: 'AI Content · Real-Time Mirror',
    videoUrl: '/videos/Chapala/export%287%29.MP4',
    poster: '/videos/Chapala/export%287%29.MP4',
    description: [
      'Live AI-generated calavera textures and generative portraits composited in real time on visitors — AI content as a physical altar experience.',
      'When a visitor approaches the mirror, a real-time camera captures their silhouette and merges it with AI-generated calavera textures, neon smoke patterns, and glitch-driven spiritual motifs.',
      'The installation reacts to presence, movement, and proximity, generating portraits that appear and fade like memories.',
      'This piece explores how artificial intelligence can expand traditional rituals. Turning a classic Día de Muertos ofrenda into a living, luminous, and responsive portal.',
      'Developed using TouchDesigner for real-time compositing, Stable Diffusion / Runway for AI textures, and camera tracking for body detection, enhanced with spatial audio layers to immerse the viewer.'
    ],
    technologies: ['TouchDesigner', 'AI Textures', 'Stable Diffusion', 'RunwayML', 'Real-Time Compositing', 'Camera Tracking', 'Interactive Installation', 'Generative Art', 'Spatial Audio'],
    concept: 'An AI-powered mirror that blends visitors with generative calavera spirits, transforming the Día de Muertos altar into a responsive digital portal.',
    galleryItems: [
      { type: 'video', src: '/videos/ai-mirror/1.mp4', alt: 'AI Mirror interaction detail 1' },
      { type: 'video', src: '/videos/ai-mirror/2.mp4', alt: 'AI Mirror interaction detail 2' }
    ],
    credits: {
      direction: 'AIROLAX',
      development: 'AIROLAX Studio',
      exhibition: 'Chapala, Jalisco. Día de Muertos 2025',
      duration: '2025'
    }
  },
  {
    id: '1b',
    title: 'Biointerface 2',
    tag: 'AI Content · Multiscreen',
    videoUrl: '/videos/BIOINTERFACE/4.MOV',
    poster: '/videos/BIOINTERFACE/1.JPG',
    description: [
      'Generative visual line traveling across multiple screens with spatial sound — AI-driven motion designed for a physical multiscreen environment.',
      'Features real-time generative visuals, spatial sound design, and a continuous flowing line that moves between screens, creating a unified audiovisual experience across multiple displays.',
      'Deliverables: Multi-screen interactive installation, generative visual line, spatial audio, and immersive environment.'
    ],
    technologies: ['Multi-Screen Animation', 'Generative Art', 'Real-time Processing', 'Spatial Audio', 'Interactive Visualization', 'Python', 'OpenCV'],
    concept: 'Biointerface 2 extends the original concept into a multiscreen space. A single generative line of light and form travels across the screens, accompanied by sound, transforming the installation into a journey of one continuous gesture through different “windows” of the same system.',
    galleryItems: [
      { type: 'video', src: '/videos/BIOINTERFACE/4.MOV', alt: 'Biointerface 2, Multiscreen' },
      { type: 'video', src: '/videos/compressed/pro1.mp4', alt: 'Biointerface 1 reference' }
    ],
    credits: {
      direction: 'AIROLAX',
      development: 'AIROLAX Team',
      exhibition: 'Mexico City · Digital Art Museum 2024',
      duration: '6 months development'
    }
  },
  {
    id: '2',
    title: 'MUSEO DESCUBRE',
    tag: 'Interactive · Built for Museum',
    videoUrl: '/videos/museo/DESCUBRE.mkv', // First video from gallery as main carousel video
    poster: '/videos/museo/1.png',                                                                                                                                                                                 
    description: [
      'Interactive museum experience built on site — motion tracking, touch surfaces, and real-time graphics deployed in a living exhibition space.',
      'Developed using projection mapping, motion tracking with Kinect sensors, touch interactive surfaces, Unity3D for 3D environments, and real-time graphics processing.',
      'Deliverables: Interactive museum installation, 3D reconstructions, motion-tracking systems, and adaptive educational experiences.'
    ],
    technologies: ['Projection Mapping', 'Motion Tracking', 'Touch Interactive Surfaces', 'Unity3D', 'Kinect Sensors', 'Real-time Graphics'],
    concept: 'This project reimagines the museum experience for the digital age, making education more engaging and accessible through interactive technology. It demonstrates how immersive installations can enhance learning and create memorable experiences that inspire curiosity.',
    galleryItems: [
      { type: 'video', src: '/videos/museo/C0087.MP4', alt: 'MUSEO DESCUBRE Interactive' },
      { type: 'image', src: '/videos/museo/2.png', alt: 'MUSEO DESCUBRE Projection' },
      { type: 'image', src: '/videos/museo/3.png', alt: 'MUSEO DESCUBRE Experience' },
      { type: 'image', src: '/videos/museo/4.png', alt: 'MUSEO DESCUBRE Installation' }
    ],
    credits: {
      direction: 'AIROLAX',
      development: 'AIROLAX Interactive Team',
      exhibition: 'Aguas Calientes · Museo Descubre 2022',
      duration: '2022'
    }
  },
  {
    id: '3',
    title: 'OHM Interactive Laser Sculpture',
    tag: 'Physical Installation · Light & Sound',
    videoUrl: '/videos/compressed/OHM/ohmfinal.MP4',
    poster: '/videos/OHM/2.png',
    description: [
      'Kinetic laser sculpture in physical space — precision light, photonic sensors, and live sound synthesis; no screen, fully built and presented on site.',
      'Developed using laser technology, photonic sensors, kinetic sculpture mechanics, sound synthesis with Arduino and Max/MSP, and real-time audio-visual processing.',
      'Deliverables: Interactive laser sculpture, sound synthesis system, and real-time audio-visual composition.'
    ],
    technologies: ['Laser Technology', 'Photonic Sensors', 'Kinetic Sculpture', 'Sound Synthesis', 'Arduino', 'Max/MSP'],
    concept: 'OHM explores the fundamental relationship between light and sound, making visible the invisible frequencies that surround us. The sculpture serves as a meditation on the nature of resonance and the interconnectedness of all vibrational phenomena.',
    galleryItems: [
      { type: 'video', src: '/videos/compressed/OHM/1.MP4', alt: 'OHM Blue Lasers' },
      { type: 'video', src: '/videos/compressed/OHM/ohm.mp4', alt: 'OHM Laser Sculpture' },
      { type: 'video', src: '/videos/compressed/OHM/ohm2.mp4', alt: 'OHM Installation View' },
      { type: 'image', src: '/videos/OHM/3.png', alt: 'OHM Installation View' }
    ],
    credits: {
      direction: 'AIROLAX',
      development: 'AIROLAX Team',
      exhibition: 'Mexico City · Festival MUTEK 2019',
      duration: '2019'
    }
  },
  {
    id: '4',
    title: 'EDZNA VIDEO MAPPING',
    tag: 'Projection Mapping · Heritage Site',
    videoUrl: '/videos/compressed/edzna/ednzapyramid.mp4',
    poster: '/videos/edzna/1.png',
    description: [
      'Mayan pyramid as canvas — projection mapping, 3D animation, and narrative content produced for a real archaeological site and night-time public show.',
      'Developed using projection mapping, 3D modeling with Blender, animation in After Effects, TouchDesigner for real-time content, camera mapping techniques, and historical research integration.',
      'Deliverables: Large-scale projection mapping show, 3D animations, historical narrative content, and on-site installation.'
    ],
    technologies: ['Projection Mapping', '3D Modeling', 'Blender', 'After Effects', 'TouchDesigner', 'Camera Mapping'],
    concept: 'This project creates a dialogue between ancient architecture and modern technology, demonstrating how digital art can enhance cultural heritage sites and make history accessible to new generations through spectacular visual experiences.',
    galleryItems: [
      { type: 'image', src: '/videos/edzna/2.png', alt: 'EDZNA Video Mapping Detail' },
      { type: 'image', src: '/videos/edzna/3.png', alt: 'EDZNA Night Show' }
    ],
    credits: {
      direction: 'AIROLAX',
      development: 'AIROLAX Visual Team',
      exhibition: 'Edzná · Archaeological Zone 2021',
      duration: '2021'
    }
  },
  {
    id: '5',
    title: 'Wavey Runway',
    tag: 'Generative AI · Live Runway',
    // Use original waveytiktok master as base video
    videoUrl: '/videos/waveytiktok.mp4',
    // Use compressed hero still
    poster: '/images/optimized/videos/wavey/wavey-1.webp',
    description: [
      'Generative AI visuals on the runway — each look becomes a live canvas; real-time VFX and motion-responsive content for a fashion show audience.',
      'Developed using generative AI tools, real-time VFX, motion capture systems, LED technology, machine learning algorithms, and TouchDesigner for live visual generation.',
      'Deliverables: Real-time generative fashion show, AI-generated visual content, motion-responsive systems, and immersive runway experience.'
    ],
    technologies: ['Generative AI', 'Real-time VFX', 'Motion Capture', 'LED Technology', 'Machine Learning', 'TouchDesigner'],
    concept: 'This project reimagines the fashion runway as a space for technological experimentation, where clothing becomes an interface for digital expression. It demonstrates how AI and generative art can enhance and transform traditional fashion presentation.',
    galleryItems: [
      {
        type: 'image',
        src: '/videos/wavey/Captura de Pantalla 2024-02-17 a la(s) 5.03.54.png',
        alt: 'Wavey Runway Scene 1'
      },
      {
        type: 'image',
        src: '/videos/wavey/Captura de Pantalla 2025-05-25 a la(s) 14.51.40.png',
        alt: 'Wavey Runway Scene 2'
      },
      {
        type: 'image',
        src: '/videos/wavey/Captura de Pantalla 2025-05-25 a la(s) 14.54.27 2.png',
        alt: 'Wavey Runway Scene 3'
      }
    ],
    credits: {
      direction: 'AIROLAX',
      development: 'AIROLAX Creative Lab',
      exhibition: 'Mexico City · Digital Fashion Week 2023',
      duration: '2023'
    }
  },
  {
    id: '6',
    title: 'ThermoSense',
    tag: 'Interactive · Sensor-Driven',
    videoUrl: '/videos/thermosense.mp4',
    poster: '/videos/thermosense.mp4',
    description: [
      'Thermal sensors and generative visuals in a physical installation — invisible body heat made visible for visitors in real space.',
      'Developed using infrared sensors, thermal imaging technology, generative art algorithms, real-time processing with Processing and Arduino, and interactive sound design.',
      'Deliverables: Interactive thermal visualization system, generative visual content, and immersive installation design.'
    ],
    technologies: ['Infrared Sensors', 'Thermal Imaging', 'Generative Art', 'Real-time Processing', 'Processing', 'Arduino'],
    concept: 'ThermoSense explores the invisible energy we emit and how technology can make this energy visible and beautiful. The installation invites reflection on our physical presence and impact on the spaces we inhabit.',
    galleryItems: [],
    credits: {
      direction: 'AIROLAX',
      development: 'AIROLAX Tech Team',
      exhibition: 'Mexico City · Interactive Art Fair 2021',
      duration: '2021'
    }
  },
  {
    id: '8',
    title: 'OHM 1',
    tag: 'Physical Installation · Lasers',
    videoUrl: '/videos/compressed/OHM/1.MP4',
    poster: '/videos/compressed/OHM/1.MP4',
    description: [
      'Early laser sound sculpture — geometric light compositions in three-dimensional space, built and presented as a physical audiovisual work.',
      'Developed using laser technology, photonic sensors, sound synthesis with Arduino and Max/MSP, and real-time audio-visual processing.',
      'Deliverables: Laser sound sculpture, photonic sensor system, and audio-visual composition.'
    ],
    technologies: ['Laser Technology', 'Photonic Sensors', 'Sound Synthesis', 'Arduino', 'Max/MSP'],
    concept: 'OHM 1 represents the first iteration in exploring the relationship between light and sound through laser technology. The red laser beams create a visual language that translates into harmonic frequencies, making visible the invisible connections between vibration, resonance, and perception.',
    galleryItems: [
      { type: 'image', src: '/videos/OHM/3.png', alt: 'OHM 1 Installation View' }
    ],
    credits: {
      direction: 'AIROLAX',
      development: 'AIROLAX Team',
      exhibition: 'Aguas Calientes · MUTEK 2023',
      duration: '3 months development'
    }
  },
  {
    id: '9',
    title: 'Ethereal Motion. Digital Poetry',
    tag: 'Generative Video · 3D Motion',
    videoUrl: '/videos/compressed/demo2.mp4',
    poster: '/videos/compressed/demo2.mp4',
    description: [
      'Generative 3D motion piece — abstract digital poetry where form, light, and movement carry the narrative; content-first video work.',
      'This piece explores the fluid boundaries between form and void, light and shadow, creating a meditative experience through kinetic 3D compositions.',
      'Each movement tells a story, each transition reveals a new perspective, inviting the viewer to lose themselves in the dance of digital matter.',
      'Developed using Blender for 3D modeling and animation, After Effects for compositing and color grading, Cinema 4D for complex motion design, and real-time rendering techniques.',
      'Deliverables: 3D motion graphics piece, abstract visual narrative, and immersive motion design experience.'
    ],
    technologies: ['3D Animation', 'Blender', 'After Effects', 'Cinema 4D', 'Motion Design', 'Compositing', 'Color Grading', 'Real-time Rendering'],
    concept: 'Ethereal Motion explores the poetic potential of 3D motion graphics, where abstract forms and fluid movements create a language beyond words. The piece demonstrates how digital geometry can evoke emotion and how motion can become a form of visual poetry.',
    galleryItems: [
      { type: 'video', src: '/videos/compressed/demo2.mp4', alt: 'Ethereal Motion. Digital Poetry' }
    ],
    credits: {
      direction: 'AIROLAX',
      development: 'AIROLAX Studio',
      exhibition: 'Mexico City · Digital Art Collection 2022',
      duration: '2022'
    }
  }
];

function withMediaUrls(project: Project): Project {
  return {
    ...project,
    videoUrl: mediaUrl(project.videoUrl),
    poster: project.poster ? mediaUrl(project.poster) : undefined,
    galleryItems: project.galleryItems?.map((g) => ({ ...g, src: mediaUrl(g.src) })),
  };
}

for (let i = 0; i < projects.length; i++) {
  projects[i] = withMediaUrls(projects[i]);
}

const carouselProjects: Project[] = [...projects];

// Selected project state
let selectedProject: Project | null = null;

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
/**
 * Generate URL-friendly slug from project title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/** Slug for work/*.html — must match filenames in work/ folder */
function getProjectSlug(project: Project): string {
  const slugMap: Record<string, string> = {
    'ai-mirror-dia-de-muertos': 'ai-mirror-dia-de-muertos',
    'breathing-space': 'breathing-space',
    '1': 'biointerface',
    '1b': 'biointerface-2',
    '2': 'museo-descubre',
    '3': 'ohm-interactive-laser-sculpture',
    '4': 'edzna-video-mapping',
    '5': 'wavey-runway',
    '6': 'thermosense',
    '7': 'whispers-of-the-lake-digital-immersive-experience',
    '8': 'ohm-1',
    '9': 'ethereal-motion-digital-poetry'
  };
  return slugMap[project.id] ?? generateSlug(project.title);
}

function getProjectYear(project: Project): string {
  const dur = (project.credits?.duration || '').trim();
  const exh = (project.credits?.exhibition || '').trim();
  const m = dur.match(/^\d{4}$/) || exh.match(/\d{4}/);
  return m ? m[0] : dur || '';
}

/** Safe ASCII for UI when host omits UTF-8 charset (cPanel/LiteSpeed). */
function asciiUiText(text: string): string {
  return text
    .replace(/\u2014/g, '-')
    .replace(/\u2013/g, '-')
    .replace(/\u00b7/g, ' / ')
    .replace(/\u2192/g, '->')
    .replace(/[\u2018\u2019]/g, "'");
}

function renderWorkDetailStrip(project: Project): void {
  const strip = document.getElementById('work-detail-strip');
  if (!strip) return;
  const href = `work/${getProjectSlug(project)}.html`;
  const year = getProjectYear(project);
  const teaser = project.description[0] || project.concept || '';
  strip.innerHTML = `
    <a class="work-detail-strip__link" href="${href}">
      <span class="work-detail-strip__meta">${asciiUiText(`${year}${year ? ' - ' : ''}${project.tag}`)}</span>
      <h3 class="work-detail-strip__title">${asciiUiText(project.title)}</h3>
      <p class="work-detail-strip__teaser">${asciiUiText(teaser)}</p>
      <span class="work-detail-strip__cta">View project -&gt;</span>
    </a>
  `;
}

function getCenteredCarouselIndex(track: HTMLElement): number {
  const cards = Array.from(track.querySelectorAll<HTMLElement>('.project-card'));
  if (cards.length === 0) return 0;
  const tr = track.getBoundingClientRect();
  const centerX = tr.left + tr.width * 0.5;
  let bestIdx = 0;
  let best = Infinity;
  cards.forEach((card, i) => {
    const r = card.getBoundingClientRect();
    const d = Math.abs(r.left + r.width * 0.5 - centerX);
    if (d < best) {
      best = d;
      bestIdx = i;
    }
  });
  return bestIdx;
}

function bindWorkDetailStrip(track: HTMLElement): void {
  const update = (): void => {
    const idx = getCenteredCarouselIndex(track);
    const project = carouselProjects[idx];
    if (project) renderWorkDetailStrip(project);
    track.querySelectorAll('.project-card').forEach((card, i) => {
      card.classList.toggle('is-centered', i === idx);
    });
  };
  update();
  let debounce: number | null = null;
  track.addEventListener(
    'scroll',
    () => {
      if (debounce != null) window.clearTimeout(debounce);
      debounce = window.setTimeout(() => {
        update();
        debounce = null;
      }, 80);
    },
    { passive: true }
  );
  track.addEventListener('scrollend', update as EventListener, { passive: true });
}

// ==========================================
// SELECTED WORK CAROUSEL - Clean Rebuild
// ==========================================
const CAROUSEL_MOBILE_MQ = '(max-width: 767px)';

function isCarouselMobileView(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(CAROUSEL_MOBILE_MQ).matches;
}

/** Móvil: solo el slide más centrado en el track tiene src + play; el resto poster + data-src (ahorra memoria). */
function syncMobileCarouselVideos(track: HTMLElement): void {
  if (!isCarouselMobileView()) return;
  const cards = Array.from(track.querySelectorAll<HTMLElement>('.project-card'));
  if (cards.length === 0) return;
  const tr = track.getBoundingClientRect();
  const centerX = tr.left + tr.width * 0.5;
  let activeIdx = 0;
  let best = Infinity;
  cards.forEach((card, i) => {
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width * 0.5;
    const d = Math.abs(cx - centerX);
    if (d < best) {
      best = d;
      activeIdx = i;
    }
  });

  cards.forEach((card, i) => {
    const video = card.querySelector('video') as HTMLVideoElement | null;
    if (!video) return;
    const dataSrc = video.dataset.src?.trim();
    if (!dataSrc) return;

    if (i === activeIdx) {
      if (!video.getAttribute('src')) {
        video.src = dataSrc;
        video.load();
      }
      video.play().catch(() => {});
    } else {
      video.pause();
      if (video.getAttribute('src')) {
        video.removeAttribute('src');
        video.load();
      }
    }
  });
}

function initSelectedWorkCarousel(): void {
  const carouselContainer = document.querySelector('.selected-work-carousel');
  const trackElement = document.getElementById('carousel-track');
  const leftArrow = document.querySelector('.carousel-arrow--left') as HTMLButtonElement;
  const rightArrow = document.querySelector('.carousel-arrow--right') as HTMLButtonElement;
  
  if (!carouselContainer || !trackElement) {
    setTimeout(initSelectedWorkCarousel, 100);
    return;
  }

  let mobileCarouselScrollBound = false;
  let carouselBreakpointBound = false;
  let workDetailStripBound = false;

  // Create project card with video
  const createCard = (project: Project, _index: number): HTMLElement => {
    const mobileLayout = isCarouselMobileView();
    const card = document.createElement('a');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);
    const slug = getProjectSlug(project);
    card.href = `work/${slug}.html`;
    card.setAttribute('aria-label', `View ${project.title} project page`);
    
    const videoSrc = project.videoUrl || '';
    const posterSrc = project.poster || '';
    
    // Desktop: todos los videos con src (comportamiento anterior). Móvil: data-src + poster; src solo al slide activo.
    card.innerHTML = `
      <div class="project-card__media">
        ${videoSrc ? `
          <video
            data-src="${videoSrc}"
            ${mobileLayout
              ? `preload="none"`
              : `src="${videoSrc}"
            autoplay
            preload="metadata"
            loading="lazy"`}
            muted
            loop
            playsinline
            webkit-playsinline
            poster="${posterSrc || ''}"
          ></video>
          ${posterSrc ? `
            <img
              src="${posterSrc}"
              alt="${project.title}"
              class="project-card__fallback-img"
            />
          ` : ''}
        ` : posterSrc ? `
          <img
            src="${posterSrc}"
            alt="${project.title}"
          />
        ` : ''}
        <div class="project-card__overlay">
          <p class="project-card__category">${asciiUiText(project.tag).toUpperCase()}</p>
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__view-hint">View project</p>
        </div>
      </div>
    `;
    
    // Handle video with Intersection Observer for play/pause (both desktop and mobile)
    if (videoSrc) {
      const video = card.querySelector('video') as HTMLVideoElement;
      const fallbackImg = card.querySelector('.project-card__fallback-img') as HTMLImageElement;
      
      if (video) {
        // Force-set all required attributes for iOS/Android autoplay
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        if (!mobileLayout) {
          video.autoplay = true;
        }
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        
        // Ensure video is visible and styled correctly
        video.style.display = 'block';
        video.style.opacity = '1';
        video.style.width = '100%';
        video.style.height = '100%';
        
        // Apply mobile-specific styles using media query detection
        const updateVideoStyles = () => {
          const isMobile = window.innerWidth < 768;
          
          if (isMobile) {
            // Mobile: Fill container perfectly (cover) - immersive experience, perfectly centered
            video.style.objectFit = 'cover';
            video.style.objectPosition = 'center center';
            video.style.position = 'absolute';
            video.style.top = '50%';
            video.style.left = '50%';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.minWidth = '100%';
            video.style.minHeight = '100%';
            video.style.transform = 'translate(-50%, -50%)';
            video.style.maxWidth = 'none';
            video.style.maxHeight = 'none';
          } else {
            // Desktop: Fill container with cover (crop as needed)
            video.style.objectFit = 'cover';
            video.style.objectPosition = 'center center';
            video.style.position = 'absolute';
            video.style.top = '50%';
            video.style.left = '50%';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.minWidth = '100%';
            video.style.minHeight = '100%';
            video.style.transform = 'translate(-50%, -50%)';
            video.style.maxWidth = 'none';
            video.style.maxHeight = 'none';
          }
        };
        
        // Apply styles immediately
        updateVideoStyles();
        
        // Update on resize to handle orientation changes
        window.addEventListener('resize', updateVideoStyles);
        
        // Hide fallback image once video loads
        if (fallbackImg) {
          const hideFallback = () => {
            fallbackImg.style.display = 'none';
            fallbackImg.style.opacity = '0';
          };
          
          video.addEventListener('loadeddata', hideFallback, { once: true });
          video.addEventListener('canplay', hideFallback, { once: true });
          
          // Also hide after a short delay as fallback
          setTimeout(() => {
            if (video.readyState >= 2) { // HAVE_CURRENT_DATA
              hideFallback();
            }
          }, 500);
        }
        
        // Biointerface 2: start playback from the middle
        if (project.id === '1b') {
          const startAtHalf = () => {
            if (video.duration && isFinite(video.duration)) {
              video.currentTime = video.duration * 0.5;
            }
          };
          video.addEventListener('loadedmetadata', startAtHalf, { once: true });
        }
        
        // Log video source for debugging
        console.log(`Loading video for ${project.title}:`, videoSrc);
        
        // Function to play video with retry logic for iOS
        const playVideo = async (vid: HTMLVideoElement) => {
          try {
            await vid.play();
          } catch (err) {
            console.warn(`Autoplay failed for ${project.title}, retrying...`, err);
            // Retry after a short delay (iOS sometimes needs this)
            setTimeout(() => {
              vid.play().catch(() => {
                console.warn(`Autoplay retry failed for ${project.title}`);
              });
            }, 300);
          }
        };
        
        // Desktop: play/pause según visibilidad en viewport. Móvil: solo un video vía syncMobileCarouselVideos.
        if (!mobileLayout) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const vid = entry.target as HTMLVideoElement;
                playVideo(vid);
              } else {
                const vid = entry.target as HTMLVideoElement;
                vid.pause();
              }
            });
          }, {
            threshold: 0.1,
            rootMargin: '50px'
          });
          observer.observe(video);
        }
        
        // Mark first card for immediate autoplay
        // We'll handle this in renderCards after all cards are appended
        
        // Handle video load errors
        video.addEventListener('error', () => {
          console.error(`Error loading video for ${project.title}:`, videoSrc, video.error);
          if (fallbackImg && posterSrc) {
            video.style.display = 'none';
            fallbackImg.style.display = 'block';
          }
        });
        
        // Ensure video loads and is visible when ready (desktop: autoplay; móvil: sync asigna src solo al activo)
        video.addEventListener('loadeddata', () => {
          console.log(`Video loaded successfully for ${project.title}:`, videoSrc);
          if (fallbackImg) {
            fallbackImg.style.display = 'none';
          }
          video.style.display = 'block';
          video.style.opacity = '1';
          if (!mobileLayout) {
            video.play().catch((err) => {
              console.warn(`Play failed for ${project.title}:`, err);
            });
          }
        });
        
        video.addEventListener('canplay', () => {
          console.log(`Video can play for ${project.title}`);
          if (fallbackImg) {
            fallbackImg.style.display = 'none';
          }
          video.style.display = 'block';
          video.style.opacity = '1';
        });
        
        if (!mobileLayout) {
          video.load();
        }
        
        // Set initial styles to ensure video is visible
      video.style.display = 'block';
        video.style.opacity = '1';
        video.style.zIndex = '2';
      if (fallbackImg) {
        fallbackImg.style.display = 'none';
          fallbackImg.style.zIndex = '1';
        }
      }
    }
    
    // Card is now a link, no need for click handler
    // Navigation will happen via href
    
    return card;
  };

  // Calculate scroll amount (card width + CSS gap — matches mobile 12px / desktop 20px)
  const getScrollAmount = (): number => {
    const firstCard = trackElement.querySelector('.project-card') as HTMLElement;
    if (!firstCard) return typeof window !== 'undefined' ? window.innerWidth : 400;
    const cardWidth = firstCard.offsetWidth;
    const gapStr = getComputedStyle(trackElement).gap || getComputedStyle(trackElement).columnGap;
    const gap = parseFloat(gapStr) || 0;
    return cardWidth + gap;
  };

  // Handle arrow navigation (simple scroll)
  const handleNext = () => {
    const scrollAmount = getScrollAmount();
    trackElement.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    if (isCarouselMobileView()) {
      window.setTimeout(() => syncMobileCarouselVideos(trackElement), 360);
    }
  };

  const handlePrev = () => {
    const scrollAmount = getScrollAmount();
    trackElement.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
    if (isCarouselMobileView()) {
      window.setTimeout(() => syncMobileCarouselVideos(trackElement), 360);
    }
  };

  // Render all cards
  const renderCards = () => {
    trackElement.innerHTML = '';
    
    carouselProjects.forEach((project, index) => {
      const card = createCard(project, index);
      trackElement.appendChild(card);
      
      // Desktop: primer video con autoplay. Móvil: un solo video activo vía syncMobileCarouselVideos.
      if (index === 0 && !isCarouselMobileView()) {
        const video = card.querySelector('video') as HTMLVideoElement;
        if (video) {
          setTimeout(() => {
            video.play().catch((err) => {
              console.warn('First video autoplay failed, retrying...', err);
              setTimeout(() => {
                video.play().catch(() => {
                  console.warn('First video autoplay retry failed');
                });
              }, 500);
            });
          }, 100);

          video.addEventListener('canplaythrough', () => {
            if (video.paused) {
              video.play().catch(() => {});
            }
          }, { once: true });
        }
      }
    });
    
    console.log('✅ Selected Work carousel initialized with arrow navigation');
    
    // Force-set video attributes for iOS/Android autoplay on all videos
    const forceVideoAttributes = () => {
      const allVideos = trackElement.querySelectorAll('video');
      allVideos.forEach((v: HTMLVideoElement) => {
        v.muted = true;
        v.playsInline = true;
        v.setAttribute('muted', '');
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
        v.style.display = 'block';
        v.style.opacity = '1';
        v.style.width = '100%';
        v.style.height = '100%';
        v.style.objectFit = 'cover';
      });
    };
    
    forceVideoAttributes();
    setTimeout(forceVideoAttributes, 300);

    if (isCarouselMobileView()) {
      const runSync = (): void => {
        syncMobileCarouselVideos(trackElement);
      };
      runSync();
      setTimeout(runSync, 120);
      setTimeout(runSync, 400);

      if (!mobileCarouselScrollBound) {
        mobileCarouselScrollBound = true;
        let scrollDebounce: number | null = null;
        const onScroll = (): void => {
          if (scrollDebounce != null) window.clearTimeout(scrollDebounce);
          scrollDebounce = window.setTimeout(() => {
            runSync();
            scrollDebounce = null;
          }, 110);
        };
        trackElement.addEventListener('scroll', onScroll, { passive: true });
        trackElement.addEventListener('scrollend', runSync as EventListener, { passive: true });
        let resizeT: number | null = null;
        window.addEventListener(
          'resize',
          () => {
            if (!isCarouselMobileView()) return;
            if (resizeT != null) window.clearTimeout(resizeT);
            resizeT = window.setTimeout(() => {
              runSync();
              resizeT = null;
            }, 150);
          },
          { passive: true }
        );
      }
    }

    if (!carouselBreakpointBound) {
      carouselBreakpointBound = true;
      const mq = window.matchMedia(CAROUSEL_MOBILE_MQ);
      mq.addEventListener('change', (ev) => {
        if (ev.matches) {
          syncMobileCarouselVideos(trackElement);
        } else {
          trackElement.querySelectorAll('video').forEach((node) => {
            const el = node as HTMLVideoElement;
            const ds = el.dataset.src?.trim();
            if (ds && el.getAttribute('src') !== ds) {
              el.src = ds;
              el.load();
            }
          });
        }
      });
    }

    if (!workDetailStripBound && carouselProjects[0]) {
      workDetailStripBound = true;
      renderWorkDetailStrip(carouselProjects[0]);
      bindWorkDetailStrip(trackElement);
    }
  };
  
  // Setup arrow buttons (only once, outside renderCards to avoid duplicate listeners)
  if (leftArrow) {
    leftArrow.addEventListener('click', handlePrev);
  }
  if (rightArrow) {
    rightArrow.addEventListener('click', handleNext);
  }

  // Initialize
  setTimeout(() => {
    renderCards();
  }, 100);
}

// ==========================================
// CLOCK FUNCTIONALITY
// ==========================================
function updateClock(): void {
  const clockElement = document.getElementById('time-clock');
  if (!clockElement) return;

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

// ==========================================
// SELECTED PRESENTATIONS (timeline) — Expositions
// ==========================================
const TIMELINE_RASTER_EXT = /\.(jpe?g|png|gif|webp|avif|bmp|svg)(\?|#|$)/i;

/** Rutas públicas (Vercel / static): siempre desde la raíz del sitio. */
function normalizePresentationAssetPath(src: string): string {
  const s = (src || '').trim();
  if (!s) return '';
  if (s.startsWith('/')) return s;
  if (s.startsWith('./')) return '/' + s.slice(2).replace(/^\/+/, '');
  return '/' + s.replace(/^\/+/, '');
}

function isTimelineRasterPath(url: string): boolean {
  if (!url) return false;
  const path = url.split('?')[0].split('#')[0];
  return TIMELINE_RASTER_EXT.test(path);
}

/** Primera imagen usable (evita poster .mp4; acepta cualquier src del gallery con extensión de imagen). */
function presentationRasterImageUrl(p: Project): string {
  for (const g of p.galleryItems || []) {
    if (g.type === 'image' && g.src && isTimelineRasterPath(g.src)) {
      return normalizePresentationAssetPath(g.src);
    }
  }
  for (const g of p.galleryItems || []) {
    if (g.src && isTimelineRasterPath(g.src)) {
      return normalizePresentationAssetPath(g.src);
    }
  }
  const poster = (p.poster || '').trim();
  if (poster && isTimelineRasterPath(poster)) {
    return normalizePresentationAssetPath(poster);
  }
  return '';
}

function presentationPreviewVideoUrl(p: Project): string {
  const v = (p.videoUrl || '').trim();
  if (v) return normalizePresentationAssetPath(v);
  const gv = (p.galleryItems || []).find((g) => g.type === 'video' && g.src);
  if (gv?.src) return normalizePresentationAssetPath(gv.src);
  return '';
}

function escapeTimelineAttr(value: string): string {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function getPresentationsTimeline(): Array<{
  id: string;
  year: string;
  title: string;
  tag: string;
  venue: string;
  href: string;
  imageUrl: string;
  previewVideoUrl: string;
}> {
  return projects.filter((p) => p.id !== '1b').map((p) => {
    const dur = (p.credits?.duration || '').trim();
    const exh = (p.credits?.exhibition || '').trim();
    const yearMatch = dur.match(/^\d{4}$/) || exh.match(/\d{4}/);
    const year = yearMatch ? yearMatch[0] : '';
    const venue = exh.replace(/\s*—?\s*\d{4}\s*$/, '').trim() || exh;
    const slug = getProjectSlug(p);
    const imageUrl = presentationRasterImageUrl(p);
    const previewVideoUrl = imageUrl ? '' : presentationPreviewVideoUrl(p);
    return {
      id: p.id,
      year,
      title: p.title,
      tag: p.tag || '',
      venue,
      href: `work/${slug}.html`,
      imageUrl,
      previewVideoUrl
    };
  }).filter((t) => t.year).sort((a, b) => Number(b.year) - Number(a.year));
}

function initPresentationsTimeline(): void {
  const container = document.getElementById('presentations-timeline');
  if (!container) {
    setTimeout(initPresentationsTimeline, 100);
    return;
  }
  const items = getPresentationsTimeline();
  container.innerHTML = items.map((item) => {
    const tag = item.tag ? `<p>${item.tag}</p>` : '';
    const pinSvg = '<svg class="timeline-venue-pin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
    const venue = item.venue ? `<span class="timeline-venue">${pinSvg}${item.venue}</span>` : '';
    const imgSrc = escapeTimelineAttr(item.imageUrl);
    const vidSrc = escapeTimelineAttr(item.previewVideoUrl);
    const bgMedia = item.imageUrl
      ? `<img class="timeline-item__bg-media timeline-item__bg-media--img" src="${imgSrc}" alt="" loading="lazy" decoding="async" />`
      : item.previewVideoUrl
        ? `<video class="timeline-item__bg-media timeline-item__bg-media--video" src="${vidSrc}" muted playsinline preload="metadata" loop aria-hidden="true"></video>`
        : '';
    return `
      <a href="${escapeTimelineAttr(item.href)}" class="timeline-item" data-project-id="${item.id}">
        <div class="timeline-item__bg" aria-hidden="true">${bgMedia}</div>
        <div class="timeline-year">${item.year}</div>
        <div class="timeline-content">
          <h3>${item.title}</h3>
          ${tag}
          ${venue}
        </div>
      </a>
    `;
  }).join('');

  const playBgVideo = (root: HTMLElement): void => {
    const vid = root.querySelector<HTMLVideoElement>('.timeline-item__bg-media--video');
    if (vid) void vid.play().catch(() => {});
  };

  const pauseBgVideo = (root: HTMLElement): void => {
    const vid = root.querySelector<HTMLVideoElement>('.timeline-item__bg-media--video');
    if (vid) {
      vid.pause();
      try {
        vid.currentTime = 0;
      } catch {
        /* ignore */
      }
    }
  };

  /* Hover (desktop): vídeo de fondo en play; touch: clase + play */
  container.querySelectorAll('.timeline-item').forEach((el) => {
    const item = el as HTMLElement;
    const addOver = (): void => {
      item.classList.add('timeline-item--over');
      playBgVideo(item);
    };
    const removeOver = (): void => {
      item.classList.remove('timeline-item--over');
      pauseBgVideo(item);
    };
    item.addEventListener('mouseenter', addOver);
    item.addEventListener('mouseleave', removeOver);
    item.addEventListener('touchstart', addOver, { passive: true });
    item.addEventListener('touchend', removeOver, { passive: true });
    item.addEventListener('touchcancel', removeOver, { passive: true });
  });
}

// Enhanced Capabilities animations with entrance effects
function initCapabilitiesAnimations(): void {
  const section = document.querySelector('#capabilities-carousel-section') as HTMLElement;
  if (!section) return;

  const capabilityCards = section.querySelectorAll('.capability-carousel-card');
  
  // Use IntersectionObserver for entrance animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const card = entry.target as HTMLElement;
    setTimeout(() => {
          card.classList.remove('capability-carousel-card--hidden');
          card.classList.add('capability-carousel-card--visible');
        }, index * 100); // Stagger animation
        observer.unobserve(card);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  capabilityCards.forEach((card) => {
    observer.observe(card);
  });
}

// ==========================================
// NAVIGATION & ANCHOR LINKS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Handle nav links (both desktop and mobile)
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link, .mobile-menu__link');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      if (/^https?:\/\//i.test(href)) {
        closeMobileMenu();
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const targetId = href.substring(1);
      
      // Call scrollToSection which handles both vision-section and contact
      scrollToSection(targetId);
    });
  });
  
  // Handle other anchor links
  const allAnchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  allAnchorLinks.forEach((link) => {
    // Skip nav links that are already handled above
    if (!link.classList.contains('nav-link') && !link.classList.contains('mobile-menu__link')) {
      link.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          scrollToSection(targetId);
        }
      });
    }
  });
  
  // Initialize mobile menu
  initMobileMenu();

  // index#projects: el navegador alinea #projects (sección + "SELECTED WORK"); corregir al vídeo.
  const syncProjectsHashScroll = (): void => {
    if (window.location.hash !== '#projects') return;
    scrollToProjectsVideoStart('auto');
    setTimeout(() => scrollToProjectsVideoStart('auto'), 280);
  };
  if (document.readyState === 'complete') {
    syncProjectsHashScroll();
  } else {
    window.addEventListener('load', syncProjectsHashScroll, { once: true });
  }
});

// ==========================================
// CONTACT ANIMATIONS
// ==========================================
function initContactAnimations(): void {
  const section = document.querySelector('#contact') as HTMLElement;
  if (!section) return;

  const contactTitle = section.querySelector('.contact-title');
  const contactForm = section.querySelector('.contact-form');

  if (contactTitle) {
    gsap.set(contactTitle, { opacity: 0, y: 30 });
    gsap.to(contactTitle, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
        start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });
  }

  if (contactForm) {
    gsap.set(contactForm, { opacity: 0, y: 20 });
    gsap.to(contactForm, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  }
}

// ==========================================
// CONTACT FORM
// ==========================================
function initContactForm(): void {
  // Initialize footer contact form
  const footerForm = document.getElementById('footer-contact-form') as HTMLFormElement;
  if (footerForm) {
    footerForm.addEventListener('submit', handleFooterFormSubmit);
  }

  // Initialize regular contact form if it exists
  const form = document.getElementById('contact-form') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', data);
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.textContent = 'Thank you! Your message has been sent.';
      form.appendChild(successMessage);
      
      // Reset form
      form.reset();
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }
}

// Handle footer contact form: open email to airolaxx@gmail.com (no backend needed)
function handleFooterFormSubmit(e: Event): void {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const messageDiv = document.getElementById('footer-form-message');
  const formData = new FormData(form);
  const name = (formData.get('name') as string) || '';
  const email = (formData.get('email') as string) || '';
  const message = (formData.get('message') as string) || '';

  if (!name || !email || !message) {
    showFormMessage(messageDiv, 'Please fill in all fields.', 'error');
    return;
  }

  const subject = encodeURIComponent(`Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:airolaxx@gmail.com?subject=${subject}&body=${body}`;
  showFormMessage(messageDiv, 'Your email client will open. Send the message to reach us.', 'success');
  form.reset();
}

function showFormMessage(element: HTMLElement | null, message: string, type: 'success' | 'error'): void {
  if (!element) return;
  
  element.textContent = message;
  element.className = `footer-form-message ${type}`;
  element.style.display = 'block';

  // Hide message after 5 seconds
  setTimeout(() => {
    element.style.display = 'none';
  }, 5000);
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu(): void {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  
  if (!toggle || !menu) {
    console.warn('Mobile menu elements not found');
    return;
  }
  
  /* El botón se maneja con el script inline en el HTML para que funcione siempre */

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('is-open')) {
      const target = e.target as HTMLElement;
      if (!menu.contains(target) && !toggle.contains(target)) {
        closeMobileMenu();
      }
    }
  });
  
  // Close menu on window resize if switching to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
  
  // Prevent body scroll when menu is open
  const observer = new MutationObserver(() => {
    if (menu.classList.contains('is-open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  observer.observe(menu, { attributes: true, attributeFilter: ['class'] });
}

function openMobileMenu(): void {
  const menu = document.getElementById('mobile-menu');
  const toggle = document.getElementById('mobile-menu-toggle');
  if (menu && toggle) {
    menu.classList.add('is-open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Prevent scrolling on body
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  }
}

function closeMobileMenu(): void {
  const menu = document.getElementById('mobile-menu');
  const toggle = document.getElementById('mobile-menu-toggle');
  if (menu && toggle) {
    menu.classList.remove('is-open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
}

/** Llamada directa desde onclick del botón (fallback para móvil) */
function toggleMobileMenu(e?: Event): void {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const menu = document.getElementById('mobile-menu');
  const toggle = document.getElementById('mobile-menu-toggle');
  if (!menu || !toggle) return;
  if (menu.classList.contains('is-open')) closeMobileMenu();
  else openMobileMenu();
}

/** Offset for fixed UI so anchor targets sit below the topbar (measured when possible). */
function getFixedHeaderOffsetPx(): number {
  const topbar = document.querySelector('.topbar') as HTMLElement | null;
  if (topbar) {
    const h = topbar.getBoundingClientRect().height;
    if (h > 0) return Math.round(h + 4);
  }
  const root = getComputedStyle(document.documentElement);
  return Math.round((parseFloat(root.getPropertyValue('--topbar-height')) || 72) + 4);
}

/**
 * Work / Artworks / #projects → situar el carrusel/vídeo bajo el header y bajar lo bastante
 * para sensación “pantalla completa” (SELECTED WORK fuera de vista si aplica).
 */
function scrollToProjectsVideoStart(behavior: ScrollBehavior = 'smooth'): void {
  const computeTop = (): number | null => {
    const track = document.getElementById('carousel-track');
    const firstMedia = document.querySelector(
      '#carousel-track .project-card .project-card__media'
    ) as HTMLElement | null;
    const el = firstMedia ?? track ?? (document.querySelector('.selected-work-carousel') as HTMLElement | null);
    if (!el) return null;
    const headerOffset = getFixedHeaderOffsetPx();
    let top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    const label = document.querySelector('#projects .section-label');
    if (label) {
      const labelBottom = label.getBoundingClientRect().bottom + window.scrollY;
      const minScroll = labelBottom - headerOffset + 2;
      top = Math.max(top, minScroll);
    }
    top += 36;
    return Math.max(0, top);
  };
  const run = (b: ScrollBehavior): void => {
    const top = computeTop();
    if (top === null) return;
    window.scrollTo({ top, behavior: b });
  };
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      run(behavior);
      setTimeout(() => run('auto'), 220);
    });
  });
}

function scrollToSection(targetId: string): void {
  // Close mobile menu first (will be called again at end, but ensures it closes)
  closeMobileMenu();
  
  // Special handling for contact - scroll to footer (contact section is just an anchor)
  if (targetId === 'contact') {
    const footer = document.querySelector('.site-footer');
    if (footer) {
      const isMobile = window.innerWidth <= 768;
      const headerHeight = isMobile ? 64 : 80;
      const footerRect = footer.getBoundingClientRect();
      const footerTop = footerRect.top + window.pageYOffset;
      const targetPosition = Math.max(0, footerTop - headerHeight);
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      return;
    }
    // Fallback: try contact anchor if footer not found
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const isMobile = window.innerWidth <= 768;
      const headerHeight = isMobile ? 64 : 80;
      const elementRect = contactSection.getBoundingClientRect();
      const elementTop = elementRect.top + window.pageYOffset;
      const targetPosition = Math.max(0, elementTop - headerHeight);
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      return;
    }
    console.warn('Contact section and footer not found');
    return;
  }
  
  // Handle vision-section explicitly
  if (targetId === 'vision-section') {
    const visionElement = document.getElementById('vision-section');
    if (!visionElement) {
      console.warn(`Target element not found: #${targetId}`);
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const headerHeight = isMobile ? 64 : 80;
    const elementRect = visionElement.getBoundingClientRect();
    const elementTop = elementRect.top + window.pageYOffset;
    const targetPosition = Math.max(0, elementTop - headerHeight);

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    return;
  }
  
  if (targetId === 'projects') {
    scrollToProjectsVideoStart('smooth');
    return;
  }

  // Handle all other sections
  const targetElement = document.getElementById(targetId);
  if (!targetElement) {
    console.warn(`Target element not found: #${targetId}`);
    return;
  }

  const isMobile = window.innerWidth <= 768;
  const headerHeight = isMobile ? 64 : 80;
  const elementRect = targetElement.getBoundingClientRect();
  const elementTop = elementRect.top + window.pageYOffset;
  const targetPosition = Math.max(0, elementTop - headerHeight);

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

let _logoHomeNavLast = 0;

/** 3D logo click/tap: always return to landing (smooth scroll on home, or navigate to index). */
function goLogoToLandingHome(): void {
  const now = Date.now();
  if (now - _logoHomeNavLast < 450) return;
  _logoHomeNavLast = now;

  if (document.getElementById('hero-video')) {
    if (window.location.hash) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const path = window.location.pathname.replace(/\\/g, '/');
  if (path.includes('/work/')) {
    window.location.href = '../index.html';
    return;
  }
  window.location.href = 'index.html';
}

// ==========================================
// 3D LOGO SCENE
// ==========================================
// Restored from working version - ensures Three.js is loaded before initialization
function setupLogoScene({
  containerId,
  modelPath,
  envMapPath,
  cameraZ = 6,
  autoRotate = true,
  rotationSpeed = 0.5
}: {
  containerId: string;
  modelPath: string;
  envMapPath: string;
  cameraZ?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
}): void {
  const container = document.getElementById(containerId);
  
  // Wait for Three.js to be available (loaded with defer)
  if (!container) {
    console.warn(`⚠️ Container ${containerId} not found, retrying...`);
    setTimeout(() => {
      setupLogoScene({ containerId, modelPath, envMapPath, cameraZ, autoRotate, rotationSpeed });
    }, 200);
    return;
  }

  // Forzar visibilidad y tamaño: desktop 280x155, móvil 180x100 (logo 3D con animaciones en ambos)
  const isDesktop = window.innerWidth >= 768;
  container.style.display = 'block';
  container.style.visibility = 'visible';
  container.style.opacity = '1';
  if (isDesktop) {
    container.style.width = '280px';
    container.style.height = '155px';
    container.style.minWidth = '280px';
    container.style.minHeight = '155px';
  } else {
    container.style.width = '180px';
    container.style.height = '100px';
    container.style.minWidth = '180px';
    container.style.minHeight = '100px';
  }
  
  // Check for THREE in both global scope and window
  const THREE = (window as any).THREE || (typeof (window as any).THREE !== 'undefined' ? (window as any).THREE : null);
  if (!THREE) {
    console.warn('⚠️ Three.js not loaded yet, waiting...');
    setTimeout(() => {
      setupLogoScene({ containerId, modelPath, envMapPath, cameraZ, autoRotate, rotationSpeed });
    }, 200);
    return;
  }
  
  // Ensure container has dimensions
  const defW = isDesktop ? 280 : 180;
  const defH = isDesktop ? 155 : 100;
  const w = container.clientWidth || defW;
  const h = container.clientHeight || defH;
  if (w === 0 || h === 0) {
    console.warn(`⚠️ Container ${containerId} has no dimensions, waiting...`);
    setTimeout(() => {
      setupLogoScene({ containerId, modelPath, envMapPath, cameraZ, autoRotate, rotationSpeed });
    }, 200);
    return;
  }

  // Use any types for THREE.js objects since it's loaded dynamically
  let scene: any;
  let camera: any;
  let renderer: any;
  let model: any = null;
  let mixer: any = null;
  let clock: any;
  let envMap: any = null;
  
  // ==========================================
  // CONSTANTS - Material and Glow Mode Parameters
  // ==========================================
  // Material Configuration - Metálico brillante reflectivo optimizado
  const MATERIAL_BASE = {
    metalness: 0.95,
    roughness: 0.08,
    envMapIntensity: 3.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    transmission: 0.15,
    transparent: true,
    opacity: 0.95,
    ior: 1.8,
    reflectivity: 1.0,
    color: 0xaaccff,
    emissive: 0x3366cc,
    emissiveIntensity: 0.18
  };
  
  const GLOW_MODE = {
    envMapIntensity: 2.8,
    roughness: 0.05,
    transmission: 0.8,
    scale: 1.05,
    emissiveIntensity: 0.6
  };
  
  // Gradient color palette - matching hero CSS gradient exactly
  // CSS uses: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.98) 100%)
  // Plus radial gradients: rgba(147, 197, 253, 0.15), rgba(251, 191, 36, 0.12), rgba(196, 181, 253, 0.1)
  const gradientColorHex = {
    top: 0xf9fafb,    // rgba(249, 250, 251) - matches CSS top
    middle: 0xffffff, // rgba(255, 255, 255) - matches CSS base white
    bottom: 0xf9fafb  // Same as top for smooth gradient matching CSS
  };
  
  // Modern liquid metallic gradient palettes - each click cycles through these
  const modernGradients = [
    {
      name: 'Liquid Chrome',
      top: 0xc0c0c0,    // Silver
      middle: 0xe8e8e8, // Light silver
      bottom: 0xa0a0a0, // Dark silver
      angle: '135deg',
      stops: ['0%', '35%', '70%', '100%']
    },
    {
      name: 'Metallic Blue',
      top: 0x4a90e2,    // Bright blue
      middle: 0x6bb6ff, // Light blue
      bottom: 0x2e5c8a, // Deep blue
      angle: '135deg',
      stops: ['0%', '40%', '80%', '100%']
    },
    {
      name: 'Liquid Gold',
      top: 0xffd700,    // Gold
      middle: 0xffed4e, // Light gold
      bottom: 0xcc9900, // Dark gold
      angle: '135deg',
      stops: ['0%', '45%', '75%', '100%']
    },
    {
      name: 'Plasma Purple',
      top: 0x9d4edd,    // Purple
      middle: 0xc77dff, // Light purple
      bottom: 0x5a189a, // Deep purple
      angle: '135deg',
      stops: ['0%', '38%', '72%', '100%']
    },
    {
      name: 'Mercury Silver',
      top: 0xd4d4d4,    // Mercury
      middle: 0xf0f0f0, // Light mercury
      bottom: 0xb8b8b8, // Dark mercury
      angle: '135deg',
      stops: ['0%', '42%', '68%', '100%']
    },
    {
      name: 'Liquid Cyan',
      top: 0x00d4ff,    // Bright cyan
      middle: 0x4de8ff, // Light cyan
      bottom: 0x0099cc, // Deep cyan
      angle: '135deg',
      stops: ['0%', '36%', '74%', '100%']
    },
    {
      name: 'Metallic Rose',
      top: 0xff6b9d,    // Rose
      middle: 0xff9ec5, // Light rose
      bottom: 0xcc3366, // Deep rose
      angle: '135deg',
      stops: ['0%', '40%', '70%', '100%']
    },
    {
      name: 'Liquid Emerald',
      top: 0x00ff88,    // Emerald
      middle: 0x4dffaa, // Light emerald
      bottom: 0x00cc66, // Deep emerald
      angle: '135deg',
      stops: ['0%', '35%', '75%', '100%']
    }
  ];
  
  let currentGradientIndex = -1; // -1 means base gradient, 0+ means modern gradient
  
  // Base background color is set in CSS
  
  // State variables
  let metalTexture: any = null;
  let videoTexture: any = null;
  let videoElement: HTMLVideoElement | null = null;
  let originalMaterials: any[] = [];
  let isGlowMode = false;
  let glowModeProgress = 0; // 0 to 1 for smooth transition
  let gradientPlane: any = null;
  
  // Model rotation controls (model rotates on its own axis, camera stays fixed)
  let modelRotationY = 0; // Y axis rotation (horizontal spin)
  let modelRotationX = 0; // X axis rotation (vertical tilt)
  let modelRotationVelocityY = 0; // Angular velocity for Y
  let modelRotationVelocityX = 0; // Angular velocity for X
  let lastMouseX = 0;
  let lastMouseY = 0;
  let isPointerDown = false; // shared so animate() can skip mouse-follow when dragging
  let targetRotationY = 0; // mouse-follow target (smooth movement)
  let targetRotationX = -Math.PI / 2; // base tilt
  let autoRotateEnabled = autoRotate; // Store autoRotate parameter
  let rotationSpeedValue = rotationSpeed; // Store rotationSpeed parameter
  const DRAG_SENSITIVITY = 0.02; // Rotation sensitivity
  const GRAVITY_DECAY = 0.92; // Gravity/friction for rotation
  const MIN_VELOCITY = 0.001; // Minimum velocity to stop rotation
  const MOUSE_FOLLOW_STRENGTH = 0.06; // smooth follow to mouse position
  const MOUSE_FOLLOW_RANGE_Y = 0.5; // max rotation Y (rad) from center
  const MOUSE_FOLLOW_RANGE_X = 0.25; // max tilt X (rad) from base
  
  // Function to update gradient with smooth animation
  const updateGradient = (targetIndex: number) => {
    if (!gradientPlane) return;
    const uniforms = gradientPlane.material.uniforms;
    
    // Get current colors from uniforms
    const currentTopColor = uniforms.topColor.value.clone();
    const currentMiddleColor = uniforms.middleColor.value.clone();
    const currentBottomColor = uniforms.bottomColor.value.clone();
    
    // Get target gradient colors
    let targetTopColor, targetMiddleColor, targetBottomColor;
    if (targetIndex === -1) {
      // Base gradient
      targetTopColor = new THREE.Color(gradientColorHex.top);
      targetMiddleColor = new THREE.Color(gradientColorHex.middle);
      targetBottomColor = new THREE.Color(gradientColorHex.bottom);
    } else {
      const gradient = modernGradients[targetIndex % modernGradients.length];
      targetTopColor = new THREE.Color(gradient.top);
      targetMiddleColor = new THREE.Color(gradient.middle);
      targetBottomColor = new THREE.Color(gradient.bottom);
    }
    
    // Animate transition with GSAP if available
    if (typeof gsap !== 'undefined') {
      // Create animation objects for GSAP
      const topAnim = { r: currentTopColor.r, g: currentTopColor.g, b: currentTopColor.b };
      const middleAnim = { r: currentMiddleColor.r, g: currentMiddleColor.g, b: currentMiddleColor.b };
      const bottomAnim = { r: currentBottomColor.r, g: currentBottomColor.g, b: currentBottomColor.b };
      
      // Animate top color
      gsap.to(topAnim, {
        r: targetTopColor.r,
        g: targetTopColor.g,
        b: targetTopColor.b,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: function() {
          uniforms.topColor.value.setRGB(topAnim.r, topAnim.g, topAnim.b);
        }
      });
      
      // Animate middle color
      gsap.to(middleAnim, {
        r: targetMiddleColor.r,
        g: targetMiddleColor.g,
        b: targetMiddleColor.b,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: function() {
          uniforms.middleColor.value.setRGB(middleAnim.r, middleAnim.g, middleAnim.b);
        }
      });
      
      // Animate bottom color
      gsap.to(bottomAnim, {
        r: targetBottomColor.r,
        g: targetBottomColor.g,
        b: targetBottomColor.b,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: function() {
          uniforms.bottomColor.value.setRGB(bottomAnim.r, bottomAnim.g, bottomAnim.b);
        }
      });
    } else {
      // Fallback: immediate change
      uniforms.topColor.value.copy(targetTopColor);
      uniforms.middleColor.value.copy(targetMiddleColor);
      uniforms.bottomColor.value.copy(targetBottomColor);
    }
    
    currentGradientIndex = targetIndex;
  };

  async function init(): Promise<void> {
    // Scene setup - transparent background to show hero gradient
    // Restored from working version: scene.background = null
    scene = new THREE.Scene();
    scene.background = null; // Transparent to show CSS gradient background

    // Camera - positioned to see logo from front
    const containerWidth = container!.clientWidth;
    const containerHeight = container!.clientHeight;
    const aspect = containerWidth / containerHeight;
    camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    // Initial camera position: (0, 1.8, 6) looking at center
    camera.position.set(0, 1.8, 6);
    camera.lookAt(0, 0, 0);

    // Renderer - with alpha for transparency (restored from working version)
    renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: "high-performance"
    });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Use correct property names for Three.js r128
    if (THREE.SRGBColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } else if (renderer.outputEncoding !== undefined) {
      renderer.outputEncoding = THREE.sRGBEncoding;
    }
    
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setClearColor(0x000000, 0); // Transparent clear color
    
    // Ensure canvas is visible
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    
    // Clear any existing content and append renderer
    container!.innerHTML = '';
    container!.appendChild(renderer.domElement);

    // Lighting - Luces laterales y traseras (no frontales) para material metálico
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xccddff, 0.7);
    scene.add(hemisphereLight);

    // Luz lateral derecha (no frontal)
    const sideLight1 = new THREE.DirectionalLight(0xffffff, 1.3);
    sideLight1.position.set(8, 4, 2);
    sideLight1.castShadow = false;
    scene.add(sideLight1);

    // Luz lateral izquierda
    const sideLight2 = new THREE.DirectionalLight(0xffffff, 1.1);
    sideLight2.position.set(-7, 3, 3);
    sideLight2.castShadow = false;
    scene.add(sideLight2);

    // Luz superior trasera (rim light)
    const topBackLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topBackLight.position.set(0, 6, -6);
    topBackLight.castShadow = false;
    scene.add(topBackLight);

    // Luz trasera inferior (edge definition)
    const backLight = new THREE.DirectionalLight(0xffffff, 0.9);
    backLight.position.set(0, -2, -8);
    backLight.castShadow = false;
    scene.add(backLight);

    // Create gradient background plane
    const createGradientBackground = () => {
      // Convert hex colors to THREE.Color
      const topColor = new THREE.Color(gradientColorHex.top);
      const middleColor = new THREE.Color(gradientColorHex.middle);
      const bottomColor = new THREE.Color(gradientColorHex.bottom);
      
      const geometry = new THREE.PlaneGeometry(20, 20);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          topColor: { value: topColor },
          middleColor: { value: middleColor },
          bottomColor: { value: bottomColor },
          time: { value: 0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 topColor;
          uniform vec3 middleColor;
          uniform vec3 bottomColor;
          uniform float time;
          varying vec2 vUv;
          void main() {
            float t = vUv.y; // 0 at bottom, 1 at top
            vec3 color;
            // Smooth gradient from bottom to top matching CSS
            if (t < 0.5) {
              color = mix(bottomColor, middleColor, t * 2.0);
            } else {
              color = mix(middleColor, topColor, (t - 0.5) * 2.0);
            }
            // Add subtle radial gradient effects matching CSS radial-gradients
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);
            // Blue radial at 30% 30%
            vec3 blueRadial = vec3(0.576, 0.773, 0.992) * (1.0 - smoothstep(0.0, 0.5, dist)) * 0.15;
            // Yellow radial at 70% 70%
            vec2 yellowCenter = vec2(0.7, 0.7);
            float yellowDist = distance(vUv, yellowCenter);
            vec3 yellowRadial = vec3(0.984, 0.749, 0.141) * (1.0 - smoothstep(0.0, 0.5, yellowDist)) * 0.12;
            // Purple radial at 50% 50%
            vec3 purpleRadial = vec3(0.769, 0.710, 0.992) * (1.0 - smoothstep(0.0, 0.6, dist)) * 0.1;
            // Combine all gradients
            color = color + blueRadial + yellowRadial + purpleRadial;
            // Subtle color swing with time (matching CSS animation)
            color += sin(time * 0.5) * 0.01;
            gl_FragColor = vec4(color, 1.0);
          }
        `,
        side: THREE.BackSide
      });
      gradientPlane = new THREE.Mesh(geometry, material);
      gradientPlane.position.z = -10; // Behind everything
      scene.add(gradientPlane);
    };
    createGradientBackground();

    // Load metal texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      './textures/metal.jpg',
      (texture: any) => {
        metalTexture = texture;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        console.log('✅ Metal texture loaded successfully');
        // Update materials if model is already loaded
        if (model) {
          model.traverse((child: any) => {
            if (child.isMesh && child.material) {
              // Skip LED screen - it will use video texture
              const meshName = child.name?.toLowerCase() || '';
              if (meshName.includes('led') || meshName.includes('screen') || meshName.includes('pantalla')) {
                return;
              }
              if (child.material.map === null || child.material.map === undefined) {
                child.material.map = metalTexture;
                child.material.needsUpdate = true;
              }
            }
          });
        }
      },
      undefined,
      (error: any) => {
        console.warn('⚠️ Could not load metal texture:', error);
      }
    );

    // Create video element for LED screen (use lightweight variant + browser cache)
    videoElement = document.createElement('video');
    videoElement.src = mediaUrl('/videos/home_WEB.mp4');
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.playsInline = true;
    videoElement.autoplay = true;
    videoElement.preload = 'metadata';
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('webkit-playsinline', '');
    videoElement.setAttribute('x5-playsinline', '');
    videoElement.setAttribute('x5-video-player-type', 'h5');
    console.log('🎥 Creating video element with src:', videoElement.src);
    
    // Handle autoplay with improved error handling
    const playVideo = async () => {
      if (!videoElement) return;
      
      try {
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log('✅ Video autoplay started successfully');
        }
      } catch (error: any) {
        console.warn('⚠️ Autoplay blocked, attempting user interaction fallback:', error);
        // Try to play on first user interaction
        const playOnInteraction = async () => {
          if (!videoElement) return;
          try {
            await videoElement.play();
            console.log('✅ Video started after user interaction');
          } catch (err: any) {
            console.warn('⚠️ Video play failed after interaction:', err);
          }
        };
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        document.addEventListener('scroll', playOnInteraction, { once: true });
      }
    };

    // Helper function to check if mesh is LED screen
    const isLEDScreen = (mesh: any): boolean => {
      const name = mesh.name?.toLowerCase() || '';
      // More flexible matching for LED screen
      return name.includes('led') || 
             name.includes('screen') || 
             name.includes('pantalla') || 
             name.includes('display') || 
             name.includes('monitor') ||
             name.includes('video') ||
             name.includes('tv') ||
             name.includes('panel');
    };
    
    // Debug: Log all mesh names when model loads
    const logAllMeshNames = (modelToLog: any) => {
      console.log('📋 All meshes in model:');
      modelToLog.traverse((child: any) => {
        if (child.isMesh) {
          console.log('  - Mesh name:', child.name || '(unnamed)', '| Material:', child.material?.name || 'default');
        }
      });
    };

    // Helper function to apply video texture to LED screen
    const applyVideoTextureToLEDScreen = (modelToProcess: any) => {
      if (!videoTexture) {
        console.warn('⚠️ Video texture not available yet');
        return;
      }
      
      let foundLEDScreen = false;
      modelToProcess.traverse((child: any) => {
        if (child.isMesh && isLEDScreen(child)) {
          foundLEDScreen = true;
          const mesh = child;
          console.log('🎯 Found LED screen mesh:', mesh.name);
          
          if (mesh.material) {
            let material = mesh.material;
            if (Array.isArray(material)) {
              material = material[0];
            }
            
            // Apply video texture to LED screen
            if (THREE.MeshPhysicalMaterial) {
              const ledMaterial = new THREE.MeshPhysicalMaterial({
                map: videoTexture,
                metalness: 0.1,
                roughness: 0.3,
                envMap: envMap,
                envMapIntensity: 0.5,
                emissive: new THREE.Color(0xffffff),
                emissiveIntensity: 1.0,
                emissiveMap: videoTexture,
                side: THREE.DoubleSide
              });
              mesh.material = ledMaterial;
              originalMaterials.push(ledMaterial);
              console.log('✅ Video texture applied to LED screen:', mesh.name);
            } else {
              // Fallback
              material.map = videoTexture;
              material.emissive = new THREE.Color(0xffffff);
              material.emissiveIntensity = 1.0;
              material.emissiveMap = videoTexture;
              material.needsUpdate = true;
              originalMaterials.push(material);
              console.log('✅ Video texture applied to LED screen (fallback):', mesh.name);
            }
          }
        }
      });
      
      if (!foundLEDScreen) {
        console.warn('⚠️ No LED screen mesh found. Checking all meshes...');
        logAllMeshNames(modelToProcess);
      }
    };

    // Create video texture when video metadata is loaded
    videoElement.addEventListener('loadedmetadata', () => {
      if (!videoElement) return;
      
      videoTexture = new THREE.VideoTexture(videoElement);
      videoTexture.wrapS = THREE.ClampToEdgeWrapping;
      videoTexture.wrapT = THREE.ClampToEdgeWrapping;
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.flipY = false;
      console.log('✅ Video texture created successfully');
      
      // Apply video texture to LED screen if model is already loaded
      if (model) {
        applyVideoTextureToLEDScreen(model);
      }
    });

    // Handle video ready to play
    videoElement.addEventListener('canplay', () => {
      console.log('✅ Video ready to play');
      playVideo();
    });

    // Handle video errors
    videoElement.addEventListener('error', (e) => {
      console.error('❌ Video loading error:', e);
      const error = videoElement?.error;
      if (error) {
        console.error('Video error details:', {
          code: error.code,
          message: error.message
        });
        // Try alternative path if main path fails
        if (videoElement && videoElement.src.includes('home.mp4')) {
          console.log('🔄 Trying alternative video path...');
          videoElement.src = mediaUrl('/videos/home.mp4') + '?' + Date.now();
          videoElement.load();
        }
      }
    });

    // Log when video source loads
    videoElement.addEventListener('loadstart', () => {
      console.log('📥 Video load started:', videoElement?.src);
    });

    // Load video
    console.log('🔄 Loading video from:', videoElement.src);
    videoElement.load();

    // Load environment map for reflections (opcional: si falla, logo sigue sin reflejos)
    try {
      const loader = new THREE.CubeTextureLoader();
      envMap = loader.load([
        envMapPath, envMapPath, envMapPath,
        envMapPath, envMapPath, envMapPath
      ]);
      scene.environment = envMap;
    } catch (_e) {
      envMap = null;
      scene.environment = null;
    }

    // Logo de respaldo por si el .glb no carga (siempre verás un logo girando)
    function createFallbackLogo(): any {
      const g = new THREE.Group();
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#ffffff'),
        emissive: new THREE.Color('#38bdf8'),
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.25,
        envMap: envMap || null,
        clearcoat: 1,
        clearcoatRoughness: 0.25
      });
      const arm = new THREE.BoxGeometry(2.4, 0.35, 0.4);
      const h = new THREE.Mesh(arm, mat), v = new THREE.Mesh(arm, mat);
      v.rotation.z = Math.PI / 2;
      const center = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), mat.clone());
      g.add(h); g.add(v); g.add(center);
      const box = new THREE.Box3().setFromObject(g);
      const c = box.getCenter(new THREE.Vector3());
      const sz = box.getSize(new THREE.Vector3());
      const scale = (window.innerWidth <= 768 ? 1.3 : 1.8) / Math.max(sz.x, sz.y, sz.z);
      g.scale.multiplyScalar(scale);
      g.position.sub(c.multiplyScalar(scale));
      g.rotation.x = -Math.PI / 2;
      g.position.y = 0.2;
      (g as any).initialY = 0.2;
      (g as any).baseRotationY = 0;
      (g as any).baseRotationX = -Math.PI / 2;
      modelRotationX = -Math.PI / 2;
      modelRotationY = 0;
      return g;
    }

    // Load GLB model - restored from working version
    // Configure GLTFLoader with DRACOLoader if available (for compressed models)
    const gltfLoader = new THREE.GLTFLoader();
    
    // Set up DRACOLoader if available (loaded from CDN in index.html)
    // This is needed for Draco-compressed GLB files (e.g. andatalogo.glb if compressed)
    if (THREE.DRACOLoader) {
      try {
        const dracoLoader = new THREE.DRACOLoader();
        // Use Google's CDN for Draco decoders (most reliable and fast)
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        gltfLoader.setDRACOLoader(dracoLoader);
        console.log('✅ DRACOLoader configured for GLTFLoader');
    } catch (error) {
        console.warn('⚠️ Could not configure DRACOLoader:', error);
      }
      } else {
      console.warn('⚠️ DRACOLoader not available - model may not load if compressed with Draco');
    }
    
    try {
      const gltf = await new Promise<any>((resolve, reject) => {
        gltfLoader.load(
          modelPath,
          (gltf: any) => {
            console.log('✅ 3D logo model loaded successfully');
            resolve(gltf);
          },
          (progress: any) => {
            // Optional: log loading progress
            if (progress && progress.lengthComputable) {
              const percentComplete = (progress.loaded / progress.total) * 100;
              console.log(`Loading 3D model: ${Math.round(percentComplete)}%`);
            }
          },
          (error: any) => {
            console.error('❌ Error loading 3D model:', error);
            // If error mentions DRACOLoader, try to configure it and retry
            if (error && error.message && error.message.includes('DRACOLoader')) {
              console.warn('⚠️ Model requires DRACOLoader, attempting to configure...');
              if (THREE.DRACOLoader) {
                try {
                  const dracoLoader = new THREE.DRACOLoader();
                  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
                  gltfLoader.setDRACOLoader(dracoLoader);
                  console.log('✅ DRACOLoader configured, retrying model load...');
                  // Retry loading
                  gltfLoader.load(
                    modelPath,
                    (gltf: any) => {
                      console.log('✅ 3D logo model loaded successfully (after DRACOLoader setup)');
                      resolve(gltf);
                    },
                    undefined,
                    (retryError: any) => {
                      console.error('❌ Error loading 3D model after DRACOLoader setup:', retryError);
                      reject(retryError);
                    }
                  );
                  return; // Don't reject on first attempt
                } catch (dracoError) {
                  console.error('❌ Failed to configure DRACOLoader:', dracoError);
                }
              }
            }
            reject(error);
          }
        );
      });

      model = gltf.scene;
      scene.add(model);

      // Debug: Log all mesh names to help identify LED screen
      logAllMeshNames(model);

      // Setup materials - Metallic/crystal material with metal texture
      model.traverse((child: any) => {
        if (child.isMesh) {
          // Skip LED screen - it will use video texture
          if (isLEDScreen(child)) {
            // Apply video texture if available, otherwise will be applied later
            if (videoTexture) {
              applyVideoTextureToLEDScreen(model);
            }
            return;
          }

          const mesh = child;
          if (mesh.material) {
            // Get existing material or create new one
            let originalMaterial = mesh.material;
            
            // If material is an array, use first one
            if (Array.isArray(originalMaterial)) {
              originalMaterial = originalMaterial[0];
            }
            
            // Material color will be set by MeshPhysicalMaterial
            
            // Create crystal/metal material using MeshPhysicalMaterial with vibrant colors
            if (THREE.MeshPhysicalMaterial) {
              const crystalMaterial = new THREE.MeshPhysicalMaterial({
                map: metalTexture || null,
                metalness: MATERIAL_BASE.metalness,
                roughness: MATERIAL_BASE.roughness,
                envMap: envMap,
                envMapIntensity: MATERIAL_BASE.envMapIntensity,
                clearcoat: MATERIAL_BASE.clearcoat,
                clearcoatRoughness: MATERIAL_BASE.clearcoatRoughness,
                transmission: MATERIAL_BASE.transmission,
                transparent: MATERIAL_BASE.transparent,
                opacity: MATERIAL_BASE.opacity,
                ior: MATERIAL_BASE.ior,
                // thickness removed - not a valid property in MeshPhysicalMaterial
                reflectivity: MATERIAL_BASE.reflectivity,
                color: new THREE.Color(MATERIAL_BASE.color),
                emissive: new THREE.Color(MATERIAL_BASE.emissive),
                emissiveIntensity: MATERIAL_BASE.emissiveIntensity,
                side: THREE.DoubleSide
              });
              mesh.material = crystalMaterial;
              originalMaterials.push(crystalMaterial);
          } else {
              // Fallback to enhanced standard material
              const material = originalMaterial;
              material.transparent = false; // Fully opaque
              material.opacity = 1.0; // Full opacity
              material.map = metalTexture;
              material.envMap = envMap;
              material.envMapIntensity = 2.0;
              material.roughness = 0.15;
              material.metalness = 0.9;
              material.needsUpdate = true;
              originalMaterials.push(material);
            }
          }
        }
      });

      // Apply video texture to LED screen if video is already loaded
      // Small delay to ensure texture is fully ready
      setTimeout(() => {
        if (videoTexture) {
          applyVideoTextureToLEDScreen(model);
        }
      }, 100);

      // Handle animations - restored from working version
      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip: any) => {
          mixer!.clipAction(clip).play();
        });
      }

      // Center and scale model - Front-facing orientation
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      // Scale model - smaller on mobile
      const isMobile = window.innerWidth <= 768;
      const baseScale = isMobile ? 1.3 : 1.8; // Smaller scale on mobile
      const scale = baseScale / maxDim;
      
      model.scale.multiplyScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      
      // Orient model to be front-facing and upright (vertical position)
      model.rotation.x = -Math.PI / 2; // Rotate 90 degrees on X axis to make it vertical
      model.rotation.y = 0;
      model.rotation.z = 0;
      
      // Set initial rotation state to match
      modelRotationX = -Math.PI / 2;
      modelRotationY = 0;
      
      // Position logo slightly above center for better visibility
      model.position.y = 0.2;
      
      // Store initial values for idle animation
      (model as any).initialY = model.position.y;
      (model as any).baseRotationY = 0;
      (model as any).baseRotationX = -Math.PI / 2; // Match initial vertical rotation
    } catch (error) {
      console.warn('3D model no cargó; mostrando logo de respaldo.', error);
      if (!model) {
        try {
          model = createFallbackLogo();
          scene.add(model);
        } catch (e2) {
          console.error('Fallback logo error:', e2);
        }
      }
    }
    // Si aún no hay modelo (GLB falló y fallback falló), intentar fallback una vez más
    if (!model) {
      try {
        model = createFallbackLogo();
        scene.add(model);
      } catch (_e) {}
    }

    clock = new THREE.Clock();

    // Handle resize - restored from working version
    function handleResize(): void {
      if (!container || !camera || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', handleResize);
    
    // Initial resize to ensure correct size
    handleResize();

    // Animation loop - Idle floating + camera orbit + glow mode
    let animationId: number | null = null;
    let time = 0;
    
    function animate(): void {
      animationId = requestAnimationFrame(animate);
      
      if (!renderer || !scene || !camera) return;
      
      const delta = clock.getDelta();
      time += delta;
      
      // Update video texture if it exists
      if (videoTexture && videoElement && videoElement.readyState >= 2) {
        videoTexture.needsUpdate = true;
      }
      
      // Update animation mixer if available
      if (mixer) mixer.update(delta);
      
      // Update gradient time uniform for subtle color swing
      if (gradientPlane && gradientPlane.material.uniforms) {
        gradientPlane.material.uniforms.time.value = time;
      }
      
      // Model rotation with auto-rotation and drag interaction
      if (model) {
        // Apply rotation velocities (always applies, model rotates on its own axis)
        modelRotationY += modelRotationVelocityY;
        modelRotationX += modelRotationVelocityX;
        
        // Apply auto-rotation if enabled (smooth continuous rotation)
        if (autoRotateEnabled) {
          modelRotationY += rotationSpeedValue * delta * 0.5; // Slow auto-rotation on Y axis
        }
        
        // Apply gravity/friction to slow down rotation after drag
        modelRotationVelocityY *= GRAVITY_DECAY;
        modelRotationVelocityX *= GRAVITY_DECAY;
        
        // Stop rotation when velocity is very small
        if (Math.abs(modelRotationVelocityY) < MIN_VELOCITY) {
          modelRotationVelocityY = 0;
        }
        if (Math.abs(modelRotationVelocityX) < MIN_VELOCITY) {
          modelRotationVelocityX = 0;
        }
        
        // Mouse-follow: smooth rotation toward cursor when not dragging
        if (!isPointerDown && Math.abs(modelRotationVelocityY) < 0.002 && Math.abs(modelRotationVelocityX) < 0.002) {
          modelRotationY += (targetRotationY - modelRotationY) * MOUSE_FOLLOW_STRENGTH;
          modelRotationX += (targetRotationX - modelRotationX) * MOUSE_FOLLOW_STRENGTH;
        }
        
        // Apply rotations to model (rotates on its own axis)
        model.rotation.y = modelRotationY;
        model.rotation.x = modelRotationX;
        
        // Gentle floating bob (up/down movement)
        if ((model as any).initialY !== undefined) {
          model.position.y = (model as any).initialY + Math.sin(time * 0.8) * 0.06;
        }
      }
      
      // Camera stays fixed, looking at center
      camera.position.set(0, 1.8, 6);
      camera.lookAt(0, 0, 0);
      
      // Glow mode animation (smooth transition)
      if (isGlowMode) {
        glowModeProgress = Math.min(1, glowModeProgress + delta * 2); // 0.5s to full glow
      } else {
        glowModeProgress = Math.max(0, glowModeProgress - delta * 2); // 0.5s to fade out
      }
      
      // Apply glow mode to materials
      const currentScale = 1.0 + (GLOW_MODE.scale - 1.0) * glowModeProgress;
      if (model) {
        model.scale.setScalar(currentScale);
      }
      
      originalMaterials.forEach((mat: any) => {
        if (mat) {
          mat.envMapIntensity = MATERIAL_BASE.envMapIntensity + 
            (GLOW_MODE.envMapIntensity - MATERIAL_BASE.envMapIntensity) * glowModeProgress;
          mat.roughness = MATERIAL_BASE.roughness + 
            (GLOW_MODE.roughness - MATERIAL_BASE.roughness) * glowModeProgress;
          mat.transmission = MATERIAL_BASE.transmission + 
            (GLOW_MODE.transmission - MATERIAL_BASE.transmission) * glowModeProgress;
          // Use base opacity for glass/transparency effect
          if (mat.opacity !== undefined) {
            mat.opacity = MATERIAL_BASE.opacity;
          }
          // Update emissive intensity for glow effect
          if (mat.emissiveIntensity !== undefined) {
            mat.emissiveIntensity = MATERIAL_BASE.emissiveIntensity + 
              (GLOW_MODE.emissiveIntensity - MATERIAL_BASE.emissiveIntensity) * glowModeProgress;
          }
        }
      });
      
      // Update gradient intensity based on glow mode
      // Gradient is updated on click via handleClick, no need to update here
      
      renderer.render(scene, camera);
    }
    
    // Start animation loop
    animate();
    
    // Store animation ID for cleanup
    if (animationId !== null) {
      (container as any).__animationId = animationId;
    }

    // Intersection Observer for performance - restored from working version
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          // Pause animation when not visible
          if (mixer) {
            mixer.timeScale = 0;
          }
          } else {
          if (mixer) {
            mixer.timeScale = 1;
          }
        }
      });
    }, { threshold: 0.1 });

    if (container) {
      observer.observe(container);
    }
  }

  function attachListeners(): void {
    // Mouse/touch interaction - Click for glow mode + spin, Drag for model rotation
    if (!container) return;
    
    let isMouseDown = false;
    let startX = 0;
    let startY = 0;
    let hasDragged = false;
    let isTouchSession = false;
    let tapJustHandled = false; // avoid double handleClick (touchend + click on mobile)
    let touchStartTime = 0;
    const DRAG_THRESHOLD = 5; // Pixels for mouse
    /** Por encima de esto se considera “arrastre” para rotar; taps reales suelen ser menores ~25px */
    const TOUCH_DRAG_THRESHOLD = 28;
    const TAP_MAX_PX = 44; // si el dedo se mueve menos que esto, es tap → home (móvil)
    const TAP_MAX_MS = 700;
    
    // Tap/click sin arrastre → volver al inicio de la landing (scroll arriba / index.html)
    const handleClick = () => {
      if (hasDragged) return;
      goLogoToLandingHome();
    };

    // Mouse events
    container.addEventListener('mousedown', (e) => {
      isPointerDown = true;
      isMouseDown = true;
      hasDragged = false;
      startX = e.clientX;
      startY = e.clientY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      container!.style.cursor = 'grabbing';
    });

    container.addEventListener('mousemove', (e) => {
      const rect = container!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width * 2 - 1; // -1..1
      const ny = (e.clientY - rect.top) / rect.height * 2 - 1;
      if (!isMouseDown) {
        container!.style.cursor = 'grab';
        targetRotationY = nx * MOUSE_FOLLOW_RANGE_Y;
        targetRotationX = -Math.PI / 2 + ny * MOUSE_FOLLOW_RANGE_X;
        return;
      }
      
      const deltaX = Math.abs(e.clientX - startX);
      const deltaY = Math.abs(e.clientY - startY);
      
      if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
        hasDragged = true;
        const deltaMouseX = e.clientX - lastMouseX;
        const deltaMouseY = e.clientY - lastMouseY;
        modelRotationVelocityY += deltaMouseX * DRAG_SENSITIVITY;
        modelRotationVelocityX -= deltaMouseY * DRAG_SENSITIVITY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    });

    container.addEventListener('mouseup', () => {
      if (isMouseDown) {
        isMouseDown = false;
        container!.style.cursor = 'grab';
      }
      isPointerDown = false;
    });

    container.addEventListener('mouseleave', () => {
      isPointerDown = false;
      isMouseDown = false;
      hasDragged = false;
      targetRotationY = 0;
      targetRotationX = -Math.PI / 2;
      container!.style.cursor = 'default';
    });
    
    // Touch events for mobile (tap = change color + glow, drag = rotate)
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isTouchSession = true;
        isPointerDown = true;
        const touch = e.touches[0];
        isMouseDown = true;
        hasDragged = false;
        touchStartTime = Date.now();
        startX = touch.clientX;
        startY = touch.clientY;
        lastMouseX = touch.clientX;
        lastMouseY = touch.clientY;
      }
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isMouseDown || e.touches.length !== 1) return;
      
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - startX);
      const deltaY = Math.abs(touch.clientY - startY);
      const threshold = isTouchSession ? TOUCH_DRAG_THRESHOLD : DRAG_THRESHOLD;
      
      if (deltaX > threshold || deltaY > threshold) {
        e.preventDefault();
        hasDragged = true;
        
        const deltaTouchX = touch.clientX - lastMouseX;
        const deltaTouchY = touch.clientY - lastMouseY;
        modelRotationVelocityY += deltaTouchX * DRAG_SENSITIVITY;
        modelRotationVelocityX -= deltaTouchY * DRAG_SENSITIVITY;
        lastMouseX = touch.clientX;
        lastMouseY = touch.clientY;
      }
    }, { passive: false });

    const resetTouchState = (): void => {
      isPointerDown = false;
      isMouseDown = false;
      hasDragged = false;
      isTouchSession = false;
    };

    container.addEventListener(
      'touchend',
      (e) => {
        const t = e.changedTouches[0];
        if (!t) {
          resetTouchState();
          return;
        }
        /* Tap real: distancia inicio→fin y tiempo corto. No usar solo hasDragged: un micro-movimiento
           activaba rotación y bloqueaba handleClick → en móvil no iba a la landing. */
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        const dist = Math.hypot(dx, dy);
        const elapsed = Date.now() - touchStartTime;
        const isTap = dist < TAP_MAX_PX && elapsed < TAP_MAX_MS;

        if (isTap) {
          goLogoToLandingHome();
          tapJustHandled = true;
          window.setTimeout(() => {
            tapJustHandled = false;
          }, 450);
        }
        resetTouchState();
      },
      { passive: true }
    );

    container.addEventListener('touchcancel', () => {
      resetTouchState();
    }, { passive: true });

    // Click (desktop): home — mouseup ya no llama handleClick para evitar doble disparo
    container.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (tapJustHandled) return;
      if (!hasDragged) handleClick();
    });

    container.setAttribute('role', 'link');
    container.setAttribute('tabindex', '0');
    container.setAttribute('aria-label', 'AIROLAX — Go to home');
    container.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goLogoToLandingHome();
      }
    });

    // Set initial cursor
    container.style.cursor = 'grab';
  }

  // Cleanup function available if needed
  function cleanup(): void {
    if (renderer) {
      renderer.dispose();
    }
    if (model && scene) {
      scene.remove(model);
      model.traverse((child: any) => {
        if (child.isMesh) {
          const mesh = child;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((mat: any) => {
              if (mat.dispose) {
                mat.dispose();
              }
            });
          }
        }
      });
    }
  }
  
  // Export cleanup for potential use
  (window as any).cleanupLogoScene = cleanup;

  // Initialize scene - restored from working version
  init().then(() => {
        attachListeners();
    console.log('✅ 3D Logo scene initialized successfully');
  }).catch((error) => {
    console.error('❌ Error initializing 3D scene:', error);
  });
}

function initLogoScenes(): void {
  // Logo 3D en desktop y móvil (mismo logo con animaciones)
  const checkAndInit = () => {
    const THREE = (window as any).THREE;
    if (!THREE) {
      setTimeout(checkAndInit, 100);
      return;
    }
    setupLogoScene({
      containerId: 'logo-3d-container',
      modelPath: '/videos/andatalogo.glb',
      envMapPath: './env/1.jpeg',
      cameraZ: 5,
      autoRotate: true,
      rotationSpeed: 0.3
    });
  };
  setTimeout(checkAndInit, 150);
}

// ==========================================
// TYPING LOGO ANIMATION
// ==========================================
function _initTypingLogo(): void {
  const logoElement = document.getElementById('logo-typing');
  if (!logoElement) return;

  const text = 'AIROLAX';
  let index = 0;

  function type() {
    if (index < text.length && logoElement) {
      logoElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 150);
    }
  }

  type();
}

// ==========================================
// PROJECT DETAILS PANEL
// ==========================================
function _updateSelectedProject(project: Project): void {
    selectedProject = project;
  renderProjectDetailsPanel();
}

function renderProjectDetailsPanel(): void {
  const panel = document.getElementById('project-details-panel');
  const scrollIndicator = document.querySelector('.scroll-down-indicator') as HTMLElement;
  if (!panel) return;
  
  if (!selectedProject) {
    // Smooth close animation
    panel.classList.remove('is-open', 'is-visible');
    setTimeout(() => {
      panel.innerHTML = '<p class="project-details-placeholder">Select a project to view details</p>';
    }, 300); // Wait for transition to complete
    // Show scroll down indicator
    if (scrollIndicator) {
      setTimeout(() => {
        scrollIndicator.style.opacity = '0.6';
        scrollIndicator.style.pointerEvents = 'auto';
      }, 200);
    }
    return;
  }

  // Add classes with smooth transition
  requestAnimationFrame(() => {
    panel.classList.add('is-open', 'is-visible');
  });
  // Hide scroll down indicator when project is selected
  if (scrollIndicator) {
    setTimeout(() => {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    }, 50);
  }
  updatePanelContentDirectly(panel, selectedProject);
}

function updatePanelContentDirectly(container: HTMLElement, project: Project): void {
  // Create gallery HTML with first item as hero
  const galleryHTML = project.galleryItems.map((item, index) => {
    const isFirst = index === 0;
    const heroClass = isFirst ? 'project-details-panel__gallery-item--hero' : '';
    
        if (item.type === 'video') {
          return `
        <div class="project-details-panel__gallery-item project-details-panel__gallery-item--video ${heroClass}">
          <video src="${item.src}" controls muted playsinline preload="metadata" loading="lazy"></video>
            </div>
          `;
        } else {
          return `
        <div class="project-details-panel__gallery-item project-details-panel__gallery-item--image ${heroClass}">
          <img src="${item.src}" alt="${item.alt || project.title}" loading="lazy" decoding="async" width="100%" height="auto" />
            </div>
          `;
        }
  }).join('');

  // Create technology tags HTML
  const tagsHTML = project.technologies.map(tech => 
    `<span class="project-details-panel__tech-tag">${tech}</span>`
  ).join('');

    container.innerHTML = `
    <button class="project-details-panel__close" aria-label="Close panel">×</button>
      <div class="project-details-panel__content">
          <h2 class="project-details-panel__title">${project.title}</h2>
      <p class="project-details-panel__tag">${project.tag}</p>
        <div class="project-details-panel__description">
        ${project.description.map(p => `<p>${p}</p>`).join('')}
        </div>
        ${project.technologies && project.technologies.length > 0 ? `
        <div class="project-details-panel__technologies">
          <div class="project-details-panel__tech-tags">
            ${tagsHTML}
          </div>
        </div>
        ` : ''}
      <div class="project-details-panel__gallery">
        ${galleryHTML}
      </div>
      <div class="project-details-panel__credits">
        <h3>Credits</h3>
        <p><strong>Direction:</strong> ${project.credits.direction}</p>
        <p><strong>Development:</strong> ${project.credits.development}</p>
        <p><strong>Exhibition:</strong> ${project.credits.exhibition}</p>
        <p><strong>Duration:</strong> ${project.credits.duration}</p>
      </div>
      </div>
    `;
    
  // Close button
  const closeBtn = container.querySelector('.project-details-panel__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      selectedProject = null;
      container.classList.remove('is-open', 'is-visible');
      container.innerHTML = '<p class="project-details-placeholder">Select a project to view details</p>';
      // Show scroll indicator again when panel is closed
      const scrollIndicator = document.querySelector('.scroll-down-indicator') as HTMLElement;
      // Show scroll down indicator
      if (scrollIndicator) {
        scrollIndicator.style.opacity = '0.6';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    });
  }
}

// Kept for backwards compatibility but it now just calls updatePanelContentDirectly
// function updatePanelContent(container: HTMLElement, project: Project): void {
//   updatePanelContentDirectly(container, project);
// }


// ==========================================
// HEADER SCROLL BEHAVIOR
// ==========================================
function initHeaderScrollBehavior(): void {
  const topbar = document.querySelector('.topbar') as HTMLElement;
  const heroVideo = document.querySelector('.hero-video') as HTMLElement;
  if (!topbar || !heroVideo) return;

  function updateHeaderState(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroRect = heroVideo.getBoundingClientRect();
    const heroBottom = heroRect.bottom + scrollTop;
    const isOverHero = scrollTop < heroBottom - 100; // 100px buffer before transition
    const isScrolled = scrollTop > 50;

    // Add/remove scrolled class for solid background
    if (isScrolled) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }

    // Add/remove hero-video-active class for white text
    if (isOverHero) {
      document.body.classList.add('hero-video-active');
    } else {
      document.body.classList.remove('hero-video-active');
    }
  }

  // Initial check
  updateHeaderState();

  // Update on scroll
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  
  // Update on resize (hero height might change)
  window.addEventListener('resize', updateHeaderState, { passive: true });
}

// ==========================================
// SCROLL TO TOP FUNCTIONALITY
// ==========================================
function initScrollToTop(): void {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (!scrollToTopBtn) return;

  function toggleScrollButton(): void {
    if (!scrollToTopBtn) return;
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }

  function scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  window.addEventListener('scroll', toggleScrollButton, { passive: true });
  scrollToTopBtn.addEventListener('click', scrollToTop);
}

// ==========================================
// HERO VIDEO — Brillo que sigue al mouse con delay (solo sección video)
// ==========================================
function initHeroShineEffect(): void {
  const container = document.querySelector('.hero-video__container') as HTMLElement;
  if (!container) return;

  const setVars = (x: number, y: number, x2: number, y2: number): void => {
    container.style.setProperty('--hero-mouse-x', `${x}%`);
    container.style.setProperty('--hero-mouse-y', `${y}%`);
    container.style.setProperty('--hero-mouse-x2', `${x2}%`);
    container.style.setProperty('--hero-mouse-y2', `${y2}%`);
  };

  let targetX = 50;
  let targetY = 50;
  let currentX = 50;
  let currentY = 50;
  let currentX2 = 50;
  let currentY2 = 50;
  /** Seguimiento suave (no “flash” al mover el mouse) */
  const easeLead = 0.09;
  /** Halo secundario más rezagado */
  const easeTrail = 0.034;
  let rafId: number | null = null;

  const tick = (): void => {
    currentX += (targetX - currentX) * easeLead;
    currentY += (targetY - currentY) * easeLead;
    currentX2 += (targetX - currentX2) * easeTrail;
    currentY2 += (targetY - currentY2) * easeTrail;

    setVars(currentX, currentY, currentX2, currentY2);

    const delta =
      Math.abs(targetX - currentX) +
      Math.abs(targetY - currentY) +
      Math.abs(targetX - currentX2) +
      Math.abs(targetY - currentY2);

    if (delta > 0.04) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  };

  const startLoop = (): void => {
    if (rafId === null) rafId = requestAnimationFrame(tick);
  };

  container.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const w = rect.width || 1;
    const h = rect.height || 1;
    targetX = ((e.clientX - rect.left) / w) * 100;
    targetY = ((e.clientY - rect.top) / h) * 100;
    startLoop();
  }, { capture: true });

  container.addEventListener('mouseleave', () => {
    targetX = 50;
    targetY = 50;
    startLoop();
  });
}

// ==========================================
// HERO VIDEO OPTIMIZATION - Fast load on mobile
// ==========================================
function initHeroVideoFastLoad(): void {
  const heroSection = document.querySelector('.hero-video') as HTMLElement;
  const heroVideo = document.querySelector('.hero-video__element') as HTMLVideoElement;
  if (!heroVideo) return;

  const heroSrc =
    heroVideo.dataset.videoSrc ||
    heroVideo.querySelector('source')?.getAttribute('src') ||
    '/videos/home_WEB.mp4';
  heroVideo.removeAttribute('data-video-src');
  heroVideo.innerHTML = '';
  heroVideo.src = mediaUrl(heroSrc);

  const revealHeroVideo = (): void => {
    if (heroSection?.classList.contains('is-ready')) return;
    heroSection?.classList.add('is-ready');
  };

  // Force immediate load on ALL devices for faster start
  heroVideo.setAttribute('fetchpriority', 'high');
  heroVideo.load();

  const tryPlay = (): void => {
    if (heroVideo.readyState >= 2) {
      heroVideo.play().catch(() => {});
    }
  };

  heroVideo.addEventListener('loadeddata', () => {
    tryPlay();
    revealHeroVideo();
  }, { once: true });

  heroVideo.addEventListener('canplay', () => {
    tryPlay();
    revealHeroVideo();
  }, { once: true });

  heroVideo.addEventListener('canplaythrough', () => {
    heroVideo.play().catch(() => {});
    revealHeroVideo();
  }, { once: true });

  heroVideo.addEventListener('loadedmetadata', tryPlay, { once: true });

  if (heroVideo.readyState >= 1) {
    tryPlay();
  }

  heroVideo.preload = 'auto';

  // Fallback: never leave hero black if video fails or is slow
  window.setTimeout(revealHeroVideo, 2200);

  if ('requestVideoFrameCallback' in heroVideo) {
    try {
      (heroVideo as HTMLVideoElement & { requestVideoFrameCallback: (cb: () => void) => void })
        .requestVideoFrameCallback(() => {
          tryPlay();
          revealHeroVideo();
        });
    } catch {
      // Fallback if not supported
    }
  }
}

// ==========================================
// INITIALIZATION
// ==========================================
// Function to initialize everything
function initializeApp(): void {
  console.log('🚀 Initializing application...');
  
  // Initialize hero video fast load FIRST (critical for mobile)
  initHeroVideoFastLoad();
  initHeroShineEffect();

  // Logo 3D disabled — AAAD header uses static mark (pairs with Andata Lab)
  // initLogoScenes();
  initScrollToTop();
  
  // Initialize section animations with GSAP + ScrollTrigger
  initHeroVideoAnimations();
  initProjectsIntroAnimations();
  initIntroAnimations();
  initSelectedWorkAnimations();
  initProcessSectionAnimations();
  initArtistBioAnimation();
  initArtistBioHoverBackground();
  initArtistBioMobileActive();
  initCapabilitiesAnimations();
  initAboutAnimations();
  initVisionAnimations();
  initContactAnimations();
  initScrollDownIndicator();
  initLiquidMetallicBackground();
  
  // Initialize other features
  initContactForm();
  initInfoBannerAnimation();
  initFloatingWhatsAppButton();
  initHeaderScrollBehavior();
  initMobileMenu();
  (window as any).toggleMobileMenu = toggleMobileMenu;
  console.log('✅ Application initialized');
}

// Execute immediately if DOM is already loaded, otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM is already loaded, execute immediately
  initializeApp();
}

// Initialize scroll to top if button exists
initScrollToTop();

// ==========================================
// HERO — Matrix typing (números + símbolos matemáticos/operadores)
// ==========================================
const MATRIX_DIGITS = '0123456789';
const MATRIX_OPERATORS = '+-*/=%<>^~|&!?()[]{}#@$';
const MATRIX_MATH_SYMBOLS = '∑∆√πλΩ∞≈≠≤≥∫∂∇⊕⊗';
const MATRIX_CHAR_POOL = `${MATRIX_DIGITS}${MATRIX_OPERATORS}${MATRIX_MATH_SYMBOLS}`;

function randomMatrixChar(): string {
  return MATRIX_CHAR_POOL[Math.floor(Math.random() * MATRIX_CHAR_POOL.length)]!;
}

type RunHeroMatrixLineOptions = {
  staggerMs?: number;
  onComplete?: () => void;
  lineClass?: string;
};

function runHeroMatrixLine(
  el: HTMLElement | null,
  raw: string,
  options: RunHeroMatrixLineOptions = {}
): void {
  const { staggerMs = 32, onComplete, lineClass = 'hero-video__title-line--matrix' } = options;

  if (!el) {
    onComplete?.();
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = raw;
    onComplete?.();
    return;
  }

  el.textContent = '';
  el.classList.add(lineClass);

  const chars = Array.from(raw);
  let remaining = chars.length;

  const finishOne = (): void => {
    remaining--;
    if (remaining <= 0) {
      onComplete?.();
    }
  };

  if (chars.length === 0) {
    onComplete?.();
    return;
  }

  chars.forEach((targetChar, i) => {
    const span = document.createElement('span');
    span.className = 'hero-video__matrix-char';
    span.setAttribute('aria-hidden', 'true');
    el.appendChild(span);
    const isSpace = targetChar === ' ';
    const stagger = i * staggerMs;
    const cycles = isSpace ? 1 : 8 + Math.floor(Math.random() * 8);
    window.setTimeout(() => {
      let n = 0;
      const tick = (): void => {
        if (n < cycles) {
          if (!isSpace) {
            span.textContent = randomMatrixChar();
          } else {
            span.innerHTML = '&nbsp;';
          }
          n++;
          window.setTimeout(tick, 26 + Math.random() * 20);
        } else {
          span.textContent = isSpace ? '\u00A0' : targetChar;
          span.classList.add('hero-video__matrix-char--locked');
          finishOne();
        }
      };
      tick();
    }, stagger);
  });
}

/** Título en 3 renglones (stack) o una sola línea legacy */
function runHeroTitleMatrix(onTitleComplete: () => void): void {
  const stack = document.querySelector('.hero-video__title-stack') as HTMLElement | null;
  const rows = stack?.querySelectorAll<HTMLElement>('.hero-video__title-row');

  if (rows && rows.length > 0) {
    let idx = 0;
    const runNextRow = (): void => {
      if (idx >= rows.length) {
        onTitleComplete();
        return;
      }
      const row = rows[idx];
      idx += 1;
      const raw = row.dataset.matrixText?.trim() || '';
      runHeroMatrixLine(row, raw, {
        staggerMs: 34,
        onComplete: runNextRow
      });
    };
    runNextRow();
    return;
  }

  const legacy = document.querySelector('.hero-video__title-line') as HTMLElement | null;
  const titleRaw =
    legacy?.dataset.matrixText?.trim() || 'ARGEL EREVAN AIROLA > MÉXICO > 1991';
  runHeroMatrixLine(legacy, titleRaw, {
    staggerMs: 34,
    onComplete: onTitleComplete
  });
}

// ==========================================
// HERO VIDEO CINEMATIC ANIMATIONS
// ==========================================
function initHeroVideoAnimations(): void {
  const heroSection = document.querySelector('.hero-video') as HTMLElement;
  const content = document.querySelector('.hero-video__content') as HTMLElement;
  const role = document.querySelector('.hero-video__role') as HTMLElement;
  const cta = document.querySelector('.hero-video__cta') as HTMLElement;

  if (!heroSection || !content) return;

  if (cta) {
    gsap.set(cta, { opacity: 0, y: 12 });
  }

  const revealCta = (): void => {
    if (!cta) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.to(cta, {
      opacity: 1,
      y: 0,
      duration: reduced ? 0.35 : 1.45,
      ease: 'power2.out',
      delay: reduced ? 0 : 0.2
    });
  };

  runHeroTitleMatrix(() => {
    if (role) {
      gsap.set(role, { opacity: 1, filter: 'blur(0px)' });
    }
    const roleRaw = role?.dataset.matrixText?.trim() || 'AI Content / Live Installations';
    runHeroMatrixLine(role, roleRaw, {
      staggerMs: 38,
      lineClass: 'hero-video__role--matrix',
      onComplete: revealCta
    });
  });

  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    /* Parallax mínimo al salir del hero (sin zoom del texto ni seguimiento del mouse) */
    gsap.fromTo(content,
      { yPercent: 0, transformOrigin: '50% 50%' },
      {
        yPercent: -1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.35,
          invalidateOnRefresh: true
        }
      }
    );
  });
}

// ==========================================
// PROJECTS INTRO ANIMATIONS - Elegant tech style
// ==========================================
function initProjectsIntroAnimations(): void {
  const projectsIntro = document.querySelector('.projects-intro') as HTMLElement;
  if (!projectsIntro) return;

  const name = projectsIntro.querySelector('.projects-intro__name') as HTMLElement;
  const description = projectsIntro.querySelector('.projects-intro__description') as HTMLElement;
  const secondary = projectsIntro.querySelector('.projects-intro__secondary') as HTMLElement;

  // Create timeline for elegant sequential animations
  const tl = gsap.timeline({ 
    defaults: { ease: 'power3.out' },
    delay: 0.5 // Start after hero content
  });

  // First make the container visible
  tl.to(projectsIntro, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  });

  // Name: Fade in + slide up with tech glow effect
  if (name) {
    gsap.set(name, { opacity: 0, y: 30, scale: 0.98 });
    tl.to(name, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.2');
  }

  // Description: Fade in + slide up (overlaps with name)
  if (description) {
    gsap.set(description, { opacity: 0, y: 25 });
    tl.to(description, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power2.out'
    }, '-=0.7');
  }

  // Secondary: Fade in (overlaps with description)
  if (secondary) {
    gsap.set(secondary, { opacity: 0, y: 20 });
    tl.to(secondary, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out'
    }, '-=0.5');
  }

  // Subtle continuous animation - tech pulse effect
  if (name) {
    gsap.to(name, {
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 255, 255, 0.1)',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2
    });
  }
}

// ==========================================
// INTRO SECTION ANIMATIONS
// ==========================================
function initIntroAnimations(): void {
  const section = document.querySelector('.intro-section') as HTMLElement;
  if (!section) return;

  const introText = section.querySelector('.intro-text');
  if (introText) {
    gsap.set(introText, { opacity: 0, y: 30 });
    gsap.to(introText, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
        start: 'top 80%',
      toggleActions: 'play none none none'
    }
    });
  }
}

// ==========================================
// SELECTED WORK SECTION ANIMATIONS - Readymag style
// ==========================================
function initSelectedWorkAnimations(): void {
  // Simplified - only animate the section label, don't touch the carousel cards
  // This prevents breaking the carousel layout
  const section = document.querySelector('.carousel-section') as HTMLElement;
  if (!section) return;

  const sectionLabel = section.querySelector('.section-label') as HTMLElement;

  // Only animate the label if it exists - don't touch carousel cards
  if (sectionLabel) {
    gsap.set(sectionLabel, { opacity: 0, y: 20, letterSpacing: '0.5px' });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
        start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

    tl.to(sectionLabel, {
      opacity: 1,
      y: 0,
      letterSpacing: '1.2px',
      duration: 0.9,
            ease: 'power2.out'
          });
        }
}

// ==========================================
// PROCESS SECTION ANIMATIONS (FROM IDEA TO IMMERSION)
// ==========================================
function initProcessSectionAnimations(): void {
  const section = document.querySelector('#process-section') as HTMLElement;
  if (!section) return;

  const processItems = section.querySelectorAll('.process-item');
  
  processItems.forEach((item, index) => {
    gsap.set(item, { opacity: 0, y: 30 });
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power2.out',
    scrollTrigger: {
        trigger: item,
        start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
  });
}

// ==========================================
// ARTIST BIO — MUSEUM-STYLE ENTRANCE ANIMATION
// ==========================================
function initArtistBioAnimation(): void {
  const section = document.querySelector('#process-section') as HTMLElement;
  if (!section) return;
  const nameBlock = section.querySelector('.artist-bio__name-block') as HTMLElement;
  const bodyEl = section.querySelector('.artist-bio__body') as HTMLElement;
  if (!nameBlock || !bodyEl) return;

  gsap.set([nameBlock, bodyEl], { opacity: 0, y: 14 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
  tl.to(nameBlock, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
    .to(bodyEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35');

  ScrollTrigger.refresh();
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) tl.play();
}

/** Artist Bio: glow follows mouse (desktop) o touch-and-drag (mobile); hue cycle + parallax tilt */
function initArtistBioHoverBackground(): void {
  const section = document.querySelector('#process-section') as HTMLElement;
  const bioEl = section?.querySelector('.artist-bio') as HTMLElement;
  if (!section) return;

  const isMobile = (): boolean => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  let _rafId: number | null = null;
  let active = false;
  let targetX = 50;
  let targetY = 50;
  let currentX = 50;
  let currentY = 50;
  let trailX = 50;
  let trailY = 50;
  const ease = 0.07;        /* suavidad del glow siguiendo al mouse */
  const trailEase = 0.012;   /* más delay en el trail (halo que va detrás) */
  const cycleMs = 4000;     /* ciclo de color más lento para que se vea el cambio */

  const tiltStrength = 8;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let tiltX = 0;
  let tiltY = 0;
  const tiltEase = 0.08;

  const loop = (): void => {
    if (!active) {
      _rafId = null;
      return;
    }
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    trailX += (currentX - trailX) * trailEase;
    trailY += (currentY - trailY) * trailEase;
    tiltX += (targetTiltX - tiltX) * tiltEase;
    tiltY += (targetTiltY - tiltY) * tiltEase;

    const t = Date.now() / cycleMs;
    const hue = Math.round((t * 360) % 360);

    section.style.setProperty('--mouse-x', `${currentX}%`);
    section.style.setProperty('--mouse-y', `${currentY}%`);
    section.style.setProperty('--trail-x', `${trailX}%`);
    section.style.setProperty('--trail-y', `${trailY}%`);
    section.style.setProperty('--glow-hue', String(hue));
    if (bioEl) {
      section.style.setProperty('--bio-tilt-x', String(tiltX));
      section.style.setProperty('--bio-tilt-y', String(tiltY));
    }

    _rafId = requestAnimationFrame(loop);
  };

  const startLoop = (): void => {
    if (active) return;
    active = true;
    _rafId = requestAnimationFrame(loop);
  };

  const setTargetFromPosition = (clientX: number, clientY: number): void => {
    const rect = section.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    targetX = Math.max(0, Math.min(100, (x / w) * 100));
    targetY = Math.max(0, Math.min(100, (y / h) * 100));
    const nx = (x / w) - 0.5;
    const ny = (y / h) - 0.5;
    targetTiltX = nx * tiltStrength * 2;
    targetTiltY = ny * tiltStrength * 2;
  };

  const snapToTarget = (): void => {
    currentX = targetX;
    currentY = targetY;
    trailX = targetX;
    trailY = targetY;
  };

  /* Desktop: mouse */
  const updateFromMouse = (e: MouseEvent): void => {
    setTargetFromPosition(e.clientX, e.clientY);
    startLoop();
  };

  if (!isMobile()) {
    section.addEventListener('mouseenter', (e: MouseEvent) => {
      section.classList.add('process-section--active');
      updateFromMouse(e);
    });
    section.addEventListener('mousemove', updateFromMouse);
    section.addEventListener('mouseleave', () => {
      section.classList.remove('process-section--active');
      targetTiltX = 0;
      targetTiltY = 0;
      setTimeout(() => { active = false; }, 520);
    });
  }

  /* Mobile: touch and drag — glow sigue el dedo; tap corto no activa glow (solo cycle color) */
  let touchActive = false;
  let touchDragStarted = false;
  let touchStartTimer: ReturnType<typeof setTimeout> | null = null;
  const TOUCH_DELAY_MS = 140;

  const clearTouchStartTimer = (): void => {
    if (touchStartTimer !== null) {
      clearTimeout(touchStartTimer);
      touchStartTimer = null;
    }
  };

  const deactivateTouch = (): void => {
    if (!touchActive) return;
    touchActive = false;
    clearTouchStartTimer();
    if (touchDragStarted) {
      touchDragStarted = false;
      section.classList.remove('process-section--touch-drag');
      section.classList.remove('process-section--active');
      targetTiltX = 0;
      targetTiltY = 0;
      setTimeout(() => { active = false; }, 420);
    }
  };

  section.addEventListener(
    'touchstart',
    (e: TouchEvent) => {
      if (!isMobile() || !e.touches.length) return;
      touchActive = true;
      touchDragStarted = false;
      const t = e.touches[0];
      setTargetFromPosition(t.clientX, t.clientY);
      snapToTarget();
      clearTouchStartTimer();
      touchStartTimer = setTimeout(() => {
        touchStartTimer = null;
        touchDragStarted = true;
        section.classList.add('process-section--active');
        section.classList.add('process-section--touch-drag');
        startLoop();
      }, TOUCH_DELAY_MS);
    },
    { passive: true }
  );

  section.addEventListener(
    'touchmove',
    (e: TouchEvent) => {
      if (!touchActive || !e.touches.length) return;
      const t = e.touches[0];
      setTargetFromPosition(t.clientX, t.clientY);
      if (!touchDragStarted) {
        clearTouchStartTimer();
        touchDragStarted = true;
        section.classList.add('process-section--active');
        section.classList.add('process-section--touch-drag');
        startLoop();
      }
      /* Do NOT preventDefault: allow page scroll on mobile */
    },
    { passive: true }
  );

  section.addEventListener('touchend', deactivateTouch, { passive: true });
  section.addEventListener('touchcancel', deactivateTouch, { passive: true });
}

/** About (Artist Bio): en móvil cada tap cicla color con delay; sombra dura */
const BIO_COLOR_CYCLE = 4; // 0 = default, 1 = violeta, 2 = azul, 3 = cálido

function initArtistBioMobileActive(): void {
  const section = document.querySelector('#process-section') as HTMLElement;
  const bioEl = section?.querySelector('.artist-bio') as HTMLElement;
  if (!section || !bioEl) return;

  const isMobile = (): boolean => window.matchMedia('(max-width: 768px)').matches;

  const setActive = (active: boolean): void => {
    if (active) {
      section.classList.add('process-section--active');
      section.style.setProperty('--mouse-x', '50%');
      section.style.setProperty('--mouse-y', '50%');
      section.style.setProperty('--trail-x', '50%');
      section.style.setProperty('--trail-y', '50%');
    } else {
      section.classList.remove('process-section--active');
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (!isMobile()) return;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setActive(false);
          section.removeAttribute('data-bio-color');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px' }
  );
  observer.observe(section);

  let colorIndex = 0;
  const TAP_DELAY_MS = 160;

  const cycleColorOnTap = (): void => {
    if (!isMobile()) return;
    bioEl.classList.add('artist-bio--tap');
    setTimeout(() => {
      colorIndex = (colorIndex + 1) % BIO_COLOR_CYCLE;
      if (colorIndex === 0) {
        section.removeAttribute('data-bio-color');
        setActive(false);
      } else {
        section.setAttribute('data-bio-color', String(colorIndex));
        setActive(true);
        section.style.setProperty('--mouse-x', '50%');
        section.style.setProperty('--mouse-y', '50%');
        section.style.setProperty('--trail-x', '50%');
        section.style.setProperty('--trail-y', '50%');
      }
    }, TAP_DELAY_MS);
  };

  bioEl.addEventListener('click', (e) => {
    if (isMobile()) {
      e.preventDefault();
      cycleColorOnTap();
    }
  });
  bioEl.addEventListener('touchstart', () => {
    if (isMobile()) bioEl.classList.add('artist-bio--tap');
  }, { passive: true });
  bioEl.addEventListener('touchend', () => {
    setTimeout(() => bioEl.classList.remove('artist-bio--tap'), TAP_DELAY_MS + 80);
  }, { passive: true });
}

// ==========================================
// CAPABILITIES SECTION ANIMATIONS (Old version - replaced by enhanced version in initCapabilitiesCarousel)
// ==========================================
// This function has been replaced by the enhanced version that uses IntersectionObserver
// The new version is called from initCapabilitiesCarousel after cards are rendered

// ==========================================
// SCROLL DOWN INDICATOR
// ==========================================
function initScrollDownIndicator(): void {
  const indicator = document.querySelector('.scroll-down-indicator');
  const arrow = document.querySelector('.scroll-down-arrow');
  if (!indicator) return;

  // Subtle floating animation for arrow only (museum-style, very slow, not distracting)
  if (arrow) {
    gsap.to(arrow, {
      y: 6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
  
  // Click handler - scroll to Expositions section
  indicator.addEventListener('click', () => {
    const presentationsSection = document.getElementById('presentations-section');
    if (presentationsSection) {
      presentationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  // Make it clickable
  (indicator as HTMLElement).style.cursor = 'pointer';
}

// ==========================================
// LIQUID METALLIC BACKGROUND
// ==========================================
function initLiquidMetallicBackground(): void {
  const bg = document.querySelector('.liquid-metallic-bg');
  if (!bg) return;

  gsap.to(bg, {
    backgroundPosition: '100% 100%',
    duration: 20,
    repeat: -1,
    ease: 'none'
  });
}

// ==========================================
// VISION SECTION ANIMATIONS
// ==========================================
function initVisionAnimations(): void {
  // Skip vision animations on mobile (section is hidden)
  const isMobile = window.innerWidth < 768;
  if (isMobile) return;
  
  const section = document.querySelector('#vision-section') as HTMLElement;
  if (!section) return;

  // const hint = section.querySelector('.hero__hint') as HTMLElement;
  // const caption = section.querySelector('.hero__caption') as HTMLElement;
  const logoCanvas = section.querySelector('.hero-logo');
  const aboutSection = document.querySelector('.about') as HTMLElement;

  // Create timeline for tagline animation - EXAGGERATED Readymag style
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  // Hint and caption now appear on hover via CSS, but we can still animate on scroll if needed
  // The CSS hover effect handles the main interaction

  // Animate 3D logo with subtle scale
  if (logoCanvas) {
    gsap.set(logoCanvas, { opacity: 0, scale: 0.92 });
    tl.to(logoCanvas, {
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: 'back.out(1.3)'
    }, '-=1.0');
  }

  // Animate about intro after tagline (if exists)
  if (aboutSection) {
    const aboutIntro = aboutSection.querySelector('.about__intro') as HTMLElement;
    if (aboutIntro) {
      gsap.set(aboutIntro, { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: aboutSection,
        start: 'top 80%',
        toggleActions: 'play none none none',
        animation: gsap.to(aboutIntro, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'back.out(1.3)',
          delay: 0.3
        })
      });
    }
  }

  // Keep existing word-by-word tagline animation
  const taglineWords = document.querySelectorAll('#vision-tagline .word');
  if (taglineWords.length > 0) {
    // Set initial state for word animations (will be overridden by scroll trigger)
    gsap.set(taglineWords, {
      opacity: 0,
      y: 30,
      scale: 0.8,
      rotationX: -90
    });

    // Create animation timeline with ScrollTrigger
    const wordTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    wordTimeline.to(taglineWords, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.3
    });
  }
}

// ==========================================
// ABOUT SECTION ANIMATIONS
// ==========================================
function initAboutAnimations(): void {
  const section = document.querySelector('.about') as HTMLElement;
  if (!section) return;

  const introLine = section.querySelector('.about__intro') as HTMLElement;
  const titleWords = section.querySelectorAll('.about__title .title-word');
  const paragraphs = section.querySelectorAll('.about__paragraph');
  const videoContainer = section.querySelector('.about__visual') as HTMLElement;

  // Create timeline for this section - cinematic entrance animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 75%', // Trigger when section enters viewport
      toggleActions: 'play none none none' // Play once, no replay
    }
  });

  // Animate intro line FIRST (top to bottom sequence) - faster fade in + slight upward motion
  if (introLine) {
    // Set initial hidden state to prevent flash
    introLine.style.opacity = '0';
    introLine.style.transform = 'translateY(10px)';
    gsap.set(introLine, { opacity: 0, y: 10 });
    tl.to(introLine, {
      opacity: 1,
      y: 0,
      duration: 0.5, // Faster: reduced from 0.8s to 0.5s
      ease: 'power2.out'
    });
  }

  // Animate main title SECOND - faster fade in + slight upward motion (overlaps with intro)
  if (titleWords.length > 0) {
    gsap.set(titleWords, { opacity: 0, y: 8 });
    tl.to(titleWords, {
      opacity: 1,
      y: 0,
      duration: 0.5, // Faster: reduced from 1.0s to 0.5s
      stagger: 0.08, // Faster stagger: reduced from 0.2s to 0.08s
      ease: 'power2.out'
    }, introLine ? '-=0.2' : 0); // Start overlapping with intro (0.2s before intro finishes)
  }

  // Animate paragraphs THIRD - faster fade in (overlaps with title)
  if (paragraphs.length > 0) {
    gsap.set(paragraphs, { opacity: 0, y: 15 });
    tl.to(paragraphs, {
      opacity: 1,
      y: 0,
      duration: 0.4, // Faster: reduced from 0.7s to 0.4s
      stagger: 0.08, // Faster stagger: reduced from 0.15s to 0.08s
      ease: 'power2.out'
    }, '-=0.3'); // Start overlapping with title animation
  }

  // Animate video container LAST (bottom) - faster fade in + scale effect (desktop only)
  if (videoContainer && window.innerWidth >= 1200) {
    gsap.set(videoContainer, { opacity: 0, scale: 1.05 });
    tl.to(videoContainer, {
      opacity: 1,
      scale: 1.0,
      duration: 0.5, // Faster: reduced from 1.0s to 0.5s
      ease: 'power2.out'
    }, '-=0.2'); // Start overlapping with paragraphs
  } else if (videoContainer) {
    // Mobile/tablet: simple fade in
    gsap.set(videoContainer, { opacity: 0 });
    tl.to(videoContainer, {
      opacity: 1,
      duration: 0.4, // Faster: reduced from 0.8s to 0.4s
      ease: 'power2.out'
    }, '-=0.2'); // Start overlapping with paragraphs
  }
}



// ==========================================
// INFO BANNER - FADE IN ON LOAD
// ==========================================
function initInfoBannerAnimation(): void {
  const infoBanner = document.querySelector('.info-banner');
  if (!infoBanner) return;

  gsap.set(infoBanner, { opacity: 0, y: 20 });
  gsap.to(infoBanner, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.3
  });
}

// ==========================================
// FLOATING WHATSAPP BUTTON (MOBILE ONLY)
// ==========================================
function initFloatingWhatsAppButton(): void {
  const floatingWhatsAppBtn = document.querySelector('.floating-whatsapp-btn');
  if (!floatingWhatsAppBtn) return;

  // Only animate on mobile
  if (window.innerWidth <= 768) {
    gsap.set(floatingWhatsAppBtn, { opacity: 0, scale: 0.8 });
    gsap.to(floatingWhatsAppBtn, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay: 0.8,
        onComplete: () => {
        floatingWhatsAppBtn.classList.add('is-visible');
      }
    });
  } else {
    floatingWhatsAppBtn.classList.remove('is-visible');
  }
}

// ==========================================
// AUDIO PLAYER
// ==========================================
// Initialize carousel on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initImmersiveIndex(
      projects.map((p) => ({
        id: p.id,
        title: p.title,
        tag: p.tag,
        poster: p.poster,
        galleryItems: p.galleryItems,
        technologies: p.technologies,
        credits: p.credits,
        slug: getProjectSlug(p),
      }))
    );
    initSelectedWorkCarousel();
    initPresentationsTimeline();
  }, 200);
});

