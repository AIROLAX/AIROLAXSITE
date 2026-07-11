# AAAD Design System — ANDATA LAB × AIROLAX

A design system for an **ecosystem of two connected brands** that share one mark,
one typeface, and a strict, Apple-style architectural minimalism — but live in
opposite light/dark worlds.

```
        ┌──────────────────────┐        ┌──────────────────────┐
        │      ANDATA LAB*      │        │       AIROLAX         │
        │  Creative-tech studio │        │  Artist portfolio     │
        │  B2B · andatalab.art  │  ←══→  │  airolax.com          │
        │  STRICT LIGHT MODE    │        │  STRICT DARK MODE     │
        │  white · #F5F5F7      │        │  black · charcoal     │
        │  corporate, structural│        │  canvas for WebGL     │
        └──────────────────────┘        └──────────────────────┘
                    shared AAAD cross mark · shared Inter type
```

## The studio

One creative-technology practice presented through two faces, both based in
**Mexico, working worldwide**, both authored by **Argel Erevan Airola** (b. 1991).

- **AIROLAX** — the artist's portfolio. Argel Erevan Airola: *Multimedia Artist.
  Director. Producer.* Immersive installations, projection mapping, generative
  art and real-time experiences. The site is a near-black stage that lets vibrant,
  psychedelic real-time WebGL content do the talking. Links out to the studio as
  **LAB\***.
- **ANDATA LAB** — the B2B creative-technology studio (*"Immersive & Creative
  Technology Studio"*). Architectural & large-scale projection mapping, generative
  content & 3D systems, immersive audio, sensor-driven interactive experiences.
  This is the corporate / commissioning face: clean, structural, light.

Selected work spanning both: *Biointerface* (AI + interactive art), *Whispers of
the Lake* (projection mapping), *MUSEO DESCUBRE* (interactive museum, Nissan),
*OHM* (laser sound sculpture), *EDZNA Video Mapping*, *ThermoSense*, *Breathing
Space*, *AI Mirror — Día de Muertos*.

## The mark — AAAD

The logo is a **cross / plus built from four "A" letterforms** rotated 90° around a
central node — it reads as **A·A·A·D**, the seed of both AND­ATA and AIRO­LAX. Rounded
pill terminals, monospace-even stroke, perfectly rotationally symmetric. It is
rendered three canonical ways:

| Variant | File | Use |
|---|---|---|
| Flat black mark | `assets/logo-mark-black.png` | ANDATA LAB (light) |
| Flat white mark | `assets/logo-mark-white.png` | AIROLAX (dark) |
| Neon render | `assets/logo-neon.png` | AIROLAX hero / brand moments (the source of the spectrum accent) |
| Liquid-chrome render | `assets/logo-chrome.png` | premium / 3D brand moments |
| Simplified vector | `assets/logo-mark-simple.svg` | favicons, tiny sizes |

---

## CONTENT FUNDAMENTALS

**Voice.** Confident, spare, curatorial. Sentences are short and declarative.
Marketing fluff is avoided — the work is the argument. Two distinct registers:

- **ANDATA LAB (studio) → "we".** Plural, capability-led, slightly technical.
  *"What we do." "Services." "Architectural & Large-Scale Mapping."* Reads like a
  capabilities deck for commissioners and partners.
- **AIROLAX (artist) → "I".** First person, personal, warm. *"Let's collaborate.
  Send a message. I reply within 24–48h." "Let's Create Something Amazing."*

**Casing.**
- Section / nav labels and "system" lines are **UPPERCASE with wide tracking**:
  `SELECTED WORK`, `WHAT WE DO`, `SERVICES`, `ARTIST CHANNELS`, `BASED IN — MEXICO`.
- Titles use **Title Case**: *Architectural & Large-Scale Mapping*, *Immersive
  Audio Design*.
- Descriptive sub-lines are **lowercase, slash-separated** fragments:
  *"selected projects / case studies"*, *"sensor systems / real-time behavior"*,
  *"high-lumen staging / media integration"*.

**Punctuation & rhythm.** The middot `·` and slash `/` are the connective tissue
between disciplines: *"Architectural mapping · Generative Art · Audiovisual AI /
Interactive Design · Spatial Sound."* The asterisk in **LAB\*** is a brand tic
(superscript), nodding to a footnote / R&D arm.

**Language.** Primary copy is **English** (global clients); the codebase comments
are Spanish (Mexican team). Place identity matters: *"Based in Mexico. Working
worldwide."*

**Emoji.** None in product UI. (Marketing/contact pages occasionally use a
WhatsApp glyph, but emoji are not part of the brand voice — do not introduce them.)

**Numbers.** Years and clock/HUD readouts appear as monospaced figures
(`00:00:00`, `1991`, `© 2025`). Use tabular figures.

**Examples to imitate**
- Studio hero: `ANDATA LAB*` / `IMMERSIVE` / `LIVING ART`
- Studio nav: `Work` · `About` · `Contact` · `LAB*`
- Artist hero: `ARGEL EREVAN AIROLA` / `MÉXICO` / `1991` — `Multimedia Artist`
- CTA: `Artworks` · `Send Message` · `Start Chat`

---

## VISUAL FOUNDATIONS

**The single most important rule:** ANDATA LAB is *pure light*, AIROLAX is *pure
dark*, and they share everything else. Switching brand = switching the
`data-brand` attribute; layout, type and spacing are identical.

**Color.**
- ANDATA LAB: `#FFFFFF` page, `#F5F5F7` structural gray for panels/cards, `#111111`
  ink, `#6E6E73` secondary, `#D2D2D7` hairlines. Accent is **monochrome black**.
  No chroma — ever.
- AIROLAX: `#000000` canvas, `#0C0C0E`/`#161617` charcoal surfaces, `#FFFFFF` ink,
  `#A1A1A6` secondary, white-alpha hairlines. Accent is **monochrome white**.
- **Spectrum accent** (`cyan #3CDCFF → magenta #FF2E8A → orange #FF8A3C`) is lifted
  from the neon logo render. It is the *only* chromatic accent in the entire
  system and is reserved for **AIROLAX** moments — focus rings, 1px gradient
  hairlines, an active underline — used at hairline scale, never as a fill or a
  background wash. Real color in AIROLAX comes from the **content** (video / WebGL),
  not the chrome.

**Type.** A single family — **Inter** — at weights 400/500/600/700/800. Big text is
set tight (`-0.02em` to `-0.03em`) and quiet; body is 16px / 1.6; "system" labels
are 11–12px uppercase with `0.22em` tracking and tabular figures. The live sites
mix Syne, Space Grotesk and JetBrains Mono — **this system deliberately collapses
all of them into Inter** per the brand brief (see Caveats).

**Spacing & layout.** Strict 8pt grid. Generous negative space is a feature, not a
gap to fill. Layouts are highly organized: full-bleed media sections alternating
with tightly-set text columns; left rails of mono labels; high-contrast type over
quiet ground. Fixed top bar (clock left, nav right). Content is centered or set in
clean editorial columns.

**Backgrounds.** No gradients-as-decoration, no illustration, no texture in the
chrome. ANDATA: flat white / `#F5F5F7` blocks. AIROLAX: flat black with full-bleed
**video / WebGL** as the only "imagery". A subtle digital-grain / RGB-shift overlay
is part of AIROLAX's house style for hero video (use sparingly).

**Imagery vibe.** Documentary photography of installations — control booths, laser
sculptures, projection-mapped architecture, interactive museums. Cool-to-vivid,
high-saturation light against dark rooms (AIROLAX) and clean, bright gallery
interiors (ANDATA). Never stocky. Media is shown full-bleed or in 16:9 / 4:5 cards.

**Radii.** `6 / 10 / 14 / 20 / 28px` scale; pill `999px` for buttons, chips and the
logo terminals. Media cards: `14–20px`. Keep corners crisp and consistent.

**Borders & dividers.** 1px hairlines do the structural work: `#D2D2D7` on light,
`rgba(255,255,255,.14)` on dark. Borders define structure more than shadows do.

**Shadows & elevation.** Light mode uses soft, low, neutral shadows
(`0 8px 28px rgba(0,0,0,.06)`) for lifted cards. Dark mode barely uses shadow —
elevation is signalled by a lighter charcoal surface and a 1px inset white hairline.
Avoid heavy drop shadows.

**Transparency & blur.** Frosted glass (`backdrop-filter: blur(8–12px)`) on the
fixed nav and floating chips, especially over video. Used for chrome that floats
over moving content, not as decoration.

**Animation.** Calm and precise. Easing is `cubic-bezier(.16,1,.3,1)` (a soft
overshoot-free ease-out) for reveals; `.22s` ease for hovers. Staggered
character/line reveals on hero type. No bounces, no spinners-as-style. Reduced-
motion is respected.

**Hover / press.**
- Hover: subtle lift (`translateY(-2px)`), hairline brightens to ink/white, or a
  thin underline grows from 0→100%. On dark, text picks up a faint white glow.
- Press: scale down slightly (`scale(.98)`) and/or accent fill. No color flips.

**Corners of the experience.** Custom dot cursor + ring on desktop (AIROLAX),
a live clock in the top bar, a floating `2025©` and WhatsApp button. These are
signature flourishes — optional, never required.

---

## ICONOGRAPHY

The brands are **near-iconless** by design — typography and the AAAD mark carry the
identity. Where icons appear they are **thin-stroke line icons** (~1.5–2px,
rounded caps/joins) drawn inline as SVG: chevrons for nav/scroll, a hamburger,
arrows. Brand glyphs (WhatsApp, social) appear as filled-path SVGs on contact
surfaces only.

- **No icon font, no sprite sheet** in the codebases — icons are hand-rolled inline
  SVGs at 12–28px.
- For new work, match that language with **[Lucide](https://lucide.dev)** (1.5–2px
  stroke, rounded) loaded from CDN — it is the closest match to the existing
  hand-drawn chevrons/arrows. *(Substitution — flagged: the source uses bespoke
  inline SVGs, not a named set.)*
- Brand/social marks (WhatsApp, Instagram, Behance) keep their **official filled
  glyphs**.
- **Emoji and unicode dingbats are not used** as icons. The asterisk in `LAB*`
  and the middot `·` are typographic, not iconographic.
- The favicon / tiny-size logo is `assets/logo-mark-simple.svg`.

---

## Sources

This system was reverse-engineered from the studio's own repositories. Explore them
to build with higher fidelity:

- **ANDATA LAB site** — https://github.com/AIROLAX/andatalabweb
  (single-file kinetic WebGL scrollytelling site; live: https://www.andatalab.art)
- **AIROLAX portfolio** — https://github.com/AIROLAX/AIROLAXSITE
  (Vite + TS, video carousel portfolio; live: https://airolax.com)
- Related: https://github.com/AIROLAX/tula-inmersiva-pitch (a pitch deck repo)

Brand renders (neon, liquid-chrome) and the master logo were supplied directly by
the client and live in `assets/`.

---

## Index — what's in this system

| Path | What |
|---|---|
| `README.md` | This file — context, content + visual foundations, iconography, sources |
| `colors_and_type.css` | Design tokens: Inter type scale + dual-brand color/spacing/radius vars |
| `SKILL.md` | Agent-Skill manifest (for use in Claude Code) |
| `assets/` | Logo variants (black/white/neon/chrome/svg) + real project imagery |
| `preview/` | Design-system cards (type, color, spacing, components) shown in the DS tab |
| `ui_kits/andata-lab/` | ANDATA LAB UI kit — light-mode studio site recreation |
| `ui_kits/airolax/` | AIROLAX UI kit — dark-mode artist portfolio recreation |

### Caveats / divergences from the live sites
1. **Typography unified to Inter.** The live sites mix Syne + Space Grotesk +
   JetBrains Mono. The brand brief mandates a single geometric sans, so this system
   uses Inter everywhere and renders "mono/HUD" labels as tracked uppercase Inter.
2. **ANDATA LAB re-cast as strict light mode.** The live `andatalabweb` is currently
   a dark, experimental WebGL experience. The brief defines ANDATA as clean light-mode
   corporate, so the UI kit reflects that intended direction, not the current site.
3. Inter is loaded from Google Fonts CDN (no local font files bundled).
