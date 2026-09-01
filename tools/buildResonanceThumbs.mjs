/**
 * Resonancia de Contacto — WebP thumbs
 *
 * Drop the real files into public/projects/resonance-of-contact/:
 *   render_installation_wide.png   (~16:9 hero)
 *   render_pedestal_detail.png     (~4:5 detail)
 *   diagrama_tecnico.png           (signal-flow diagram)
 *
 * Then: node tools/buildResonanceThumbs.mjs
 * If a PNG is missing, a labeled placeholder is written so the page still layouts.
 */
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'public', 'projects', 'resonance-of-contact');

async function svgPng(svg, file, width, height) {
  await sharp(Buffer.from(svg)).png().toFile(file);
  const meta = await sharp(file).metadata();
  if (meta.width !== width || meta.height !== height) {
    await sharp(file).resize(width, height).png().toFile(file);
  }
}

function heroSvg(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <radialGradient id="g1" cx="38%" cy="48%" r="55%">
        <stop offset="0%" stop-color="#5b4dff" stop-opacity="0.9"/>
        <stop offset="45%" stop-color="#1a3a8a" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#050510" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="g2" cx="64%" cy="52%" r="50%">
        <stop offset="0%" stop-color="#9b5cff" stop-opacity="0.75"/>
        <stop offset="50%" stop-color="#2a1a6a" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#050510" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="#050510"/>
    <rect width="100%" height="100%" fill="url(#g1)"/>
    <rect width="100%" height="100%" fill="url(#g2)"/>
    <circle cx="${w * 0.38}" cy="${h * 0.5}" r="${h * 0.22}" fill="none" stroke="#7aa2ff" stroke-opacity="0.35" stroke-width="2"/>
    <circle cx="${w * 0.62}" cy="${h * 0.5}" r="${h * 0.22}" fill="none" stroke="#c9a6ff" stroke-opacity="0.35" stroke-width="2"/>
    <circle cx="${w * 0.5}" cy="${h * 0.5}" r="${h * 0.08}" fill="#dce6ff" fill-opacity="0.22"/>
    <text x="${w / 2}" y="${h - 48}" text-anchor="middle" fill="#ffffff" fill-opacity="0.45" font-family="Inter, system-ui, sans-serif" font-size="18" letter-spacing="0.18em">PLACEHOLDER — render_installation_wide.png</text>
  </svg>`;
}

function detailSvg(w, h) {
  const cx = w / 2;
  const pedW = w * 0.38;
  const pedH = h * 0.42;
  const pedX = (w - pedW) / 2;
  const pedY = h * 0.38;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <radialGradient id="glow" cx="50%" cy="42%" r="48%">
        <stop offset="0%" stop-color="#7b5cff" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#050510" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="#070712"/>
    <rect width="100%" height="100%" fill="url(#glow)"/>
    <rect x="${pedX}" y="${pedY}" width="${pedW}" height="${pedH}" rx="18" fill="#12121c" stroke="#8ec0ff" stroke-opacity="0.45" stroke-width="2"/>
    <circle cx="${cx - pedW * 0.22}" cy="${pedY + 36}" r="14" fill="#c9a06a"/>
    <circle cx="${cx + pedW * 0.22}" cy="${pedY + 36}" r="14" fill="#c9a06a"/>
    <text x="${cx}" y="${h - 40}" text-anchor="middle" fill="#ffffff" fill-opacity="0.45" font-family="Inter, system-ui, sans-serif" font-size="16" letter-spacing="0.14em">PLACEHOLDER — render_pedestal_detail.png</text>
  </svg>`;
}

function diagramSvg(w, h) {
  const box = (x, y, bw, bh, title, sub) => `
    <rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="10" fill="#ffffff" stroke="#d2d2d7" stroke-width="1.5"/>
    <text x="${x + bw / 2}" y="${y + bh / 2 - 6}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="600" fill="#111">${title}</text>
    <text x="${x + bw / 2}" y="${y + bh / 2 + 16}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#6e6e73">${sub}</text>`;
  const arrow = (x1, y1, x2) => `
    <line x1="${x1}" y1="${y1}" x2="${x2 - 10}" y2="${y1}" stroke="#111" stroke-width="1.5"/>
    <polygon points="${x2},${y1} ${x2 - 10},${y1 - 5} ${x2 - 10},${y1 + 5}" fill="#111"/>`;
  const bw = 220;
  const bh = 88;
  const y = 200;
  const gap = 36;
  const start = 70;
  const xs = [0, 1, 2, 3, 4].map((i) => start + i * (bw + gap));
  const mid = y + bh / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <text x="${w / 2}" y="72" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" letter-spacing="0.22em" fill="#8e8e93">SIGNAL FLOW</text>
    <text x="${w / 2}" y="108" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="28" font-weight="700" fill="#111">Physical contact → generative output</text>
    ${box(xs[0], y, bw, bh, 'Contact', 'Two people · handshake')}
    ${arrow(xs[0] + bw, mid, xs[1])}
    ${box(xs[1], y, bw, bh, 'Electrodes', 'Brass / copper handles')}
    ${arrow(xs[1] + bw, mid, xs[2])}
    ${box(xs[2], y, bw, bh, 'MPR121 + MCU', 'Capacitive sensing')}
    ${arrow(xs[2] + bw, mid, xs[3])}
    ${box(xs[3], y, bw, bh, 'TouchDesigner', 'GPU workstation')}
    ${arrow(xs[3] + bw, mid, xs[4])}
    ${box(xs[4], y, bw, bh, 'Light + sound', 'Projector · spatial audio')}
    <text x="${w / 2}" y="${h - 48}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" fill="#8e8e93">Duration · conductivity variance · grip pressure</text>
  </svg>`;
}

async function ensurePng(name, width, height, svg) {
  const file = join(DIR, name);
  if (existsSync(file)) {
    console.log('keep', name);
    return file;
  }
  await svgPng(svg, file, width, height);
  console.log('placeholder', name);
  return file;
}

async function writeSizes(src, stem, widths) {
  for (const width of widths) {
    const dest = join(DIR, `${stem}-${width}.webp`);
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);
    console.log('webp', `${stem}-${width}.webp`);
  }
}

await mkdir(DIR, { recursive: true });

const wide = await ensurePng('render_installation_wide.png', 1920, 1080, heroSvg(1920, 1080));
const detail = await ensurePng('render_pedestal_detail.png', 1024, 1280, detailSvg(1024, 1280));
const diagram = await ensurePng('diagrama_tecnico.png', 1600, 720, diagramSvg(1600, 720));

const wideMeta = await sharp(wide).metadata();
const wideWidths = [...new Set([800, Math.min(wideMeta.width || 1024, 1920)])];
await writeSizes(wide, 'render_installation_wide', wideWidths);
const detailMeta = await sharp(detail).metadata();
const detailWidths = [...new Set([400, 800, Math.min(detailMeta.width || 800, 1280)])];
await writeSizes(detail, 'render_pedestal_detail', detailWidths);
await writeSizes(diagram, 'diagrama_tecnico', [800, 1280, 1600]);
