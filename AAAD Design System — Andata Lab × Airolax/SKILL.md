---
name: aaad-design
description: Use this skill to generate well-branded interfaces and assets for the AAAD ecosystem — ANDATA LAB (B2B creative-technology studio, strict light mode) and AIROLAX (artist portfolio, strict dark mode) — for production or throwaway prototypes/mocks. Contains design guidelines, dual-brand color + Inter type tokens, the AAAD logo set, and React UI-kit components for both brands.
user-invocable: true
---

Read `README.md` in this skill first — it carries the full context: the two-brand
architecture, content fundamentals (voice, casing, the `·` / `/` motifs), visual
foundations (the strict light/dark split, the spectrum accent, spacing, motion),
and iconography. Then explore the other files.

**Core rule:** one ecosystem, two surfaces. ANDATA LAB = pure white / `#F5F5F7` /
ink black, corporate & structural. AIROLAX = pure black / charcoal / white ink, a
canvas for vibrant WebGL. A single typeface — **Inter** — across both; never mix
fonts. Switching brand = switching the `data-brand` attribute (`andata` | `airolax`)
on a root that loads `colors_and_type.css`.

**Files**
- `colors_and_type.css` — design tokens (Inter scale + both color themes + spacing,
  radius, spectrum). Import it and set `data-brand` on your scope.
- `assets/` — logo variants (`logo-mark-black/white.png`, neon, chrome, svg) + real
  project imagery. Copy these out; never redraw the mark.
- `ui_kits/andata-lab/` and `ui_kits/airolax/` — React component recreations of each
  product (top bars, heroes, services/work, carousels, forms). Lift components and
  patterns from here.
- `preview/` — small reference cards for type, color, spacing and components.

**When building:** for visual artifacts (slides, mocks, throwaway prototypes), copy
assets out and produce static HTML for the user to view. For production code, copy
assets and apply the rules here to design natively in-brand. If invoked with no
direction, ask what they want to build — for which brand (ANDATA LAB or AIROLAX) —
ask a few focused questions, then act as an expert designer outputting HTML
artifacts or production code as needed.
