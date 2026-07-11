# AIROLAX — UI Kit (Dark)

The artist's portfolio — **Argel Erevan Airola**, Multimedia Artist. **Strict dark
mode**: a pure-black canvas that lets vibrant real-time / WebGL content carry the
color. Inter throughout; chrome stays monochrome, with the spectrum accent used at
hairline scale only.

## Run
Open `index.html`. React + Babel from CDN; tokens from `../../colors_and_type.css`
(root carries `data-brand="airolax"`).

## What it demonstrates
- **Fixed top bar** — live clock, centered AAAD mark, nav (Work / About / Contact)
  + cross-link to the studio as **LAB\***, frosted over content.
- **Full-bleed hero** — installation media behind a stacked name matrix
  (`ARGEL EREVAN AIROLA / MÉXICO / 1991`), role line, `Artworks` CTA, subtle
  RGB-grain overlay (the house style for hero media).
- **Selected work carousel** — horizontally scrollable cards with ‹ › controls; the
  active card lights up and gets a 1px spectrum bar; a detail panel below updates.
- **Immersive Index** — the full archive as a **drag-to-pan canvas**. Grab and
  throw the wall around in 2D (pointer + touch, with inertia and an edge
  vignette); project + technique facets, chips with per-set counts, a sliding
  active indicator, a live `NNN / NNN` counter, a micro-ficha (tag + year) that
  flashes on select, and a staggered exit→enter on every filter that also
  recomposes + recenters the wall. Everything is **derived from the same `work`
  array** (no duplicated lists), scattered deterministically so no project
  clusters. Tiles are web-optimized stills (`assets/thumbs/*.jpg`, ~1000px) so a
  big wall stays snappy; a couple of tiles per project are empty `<image-slot>`
  drop zones to keep loading your own images in.
- **Expositions** — editorial year/title/venue timeline.
- **Contact footer** — `Let's collaborate` form (fake submit) + artist identity and
  channels.

## Files
| File | Role |
|---|---|
| `index.html` | Scaffold + CDN + script wiring |
| `data.js` | Hero, work, expositions, channels + derived `gallery`/`discs` (`window.AIROLAX`) |
| `core.jsx` | `XTopBar`, `XHero` |
| `work.jsx` | `XWork` (carousel + detail) |
| `gallery.jsx` | `XGallery` (Immersive Index — filterable masonry) |
| `app.jsx` | `XExpos`, `XContact`, `XApp` (root) |
| `image-slot.js` | User-fillable drop targets for the Index drop zones |

## Notes
Cosmetic recreation, not production code. The live site uses a hero **video**; this
kit substitutes a real installation still (`img-immersive-booth.jpg`) for a static,
shareable artboard. Swap in a video or an `<image-slot>` for live use.

The Index tiles reuse each project's still under varied crops + tonal treatments to
stand in for a multi-image set — replace them (and fill the drop slots) with the
artist's real frames. `<image-slot>` drops persist via a project-root sidecar, so
for reliable persistence run a copy of this page from the project root.
