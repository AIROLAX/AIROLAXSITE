# ANDATA LAB — UI Kit (Light)

The B2B creative-technology studio face. **Strict light mode** — pure white,
structural `#F5F5F7`, ink black. Clean, corporate, structural; generous negative
space; Inter throughout.

## Run
Open `index.html`. React + Babel are loaded from CDN; tokens come from
`../../colors_and_type.css` (the root carries `data-brand="andata"`).

## What it demonstrates
A single-page studio site with smooth in-page navigation and live interactions:
- **Top bar** — AAAD mark, live clock, nav (Work / Services / About / Contact) with
  active state, cross-link to the AIROLAX kit, frosted-glass on scroll.
- **Hero** — oversized display type (`Immersive / Living Art`), HUD meta row, CTAs.
- **What we do** — demo-reel media with play toggle, discipline pillars.
- **Services** — hover-reveal list (01–05) with sliding meta lines.
- **Selected work** — filterable project grid (All / Mapping / Interactive / Audio);
  cards lift on hover and open a detail modal.
- **Contact** — working (fake) form with a thank-you state.

## Files
| File | Role |
|---|---|
| `index.html` | Scaffold + CDN + script wiring |
| `data.js` | Nav, services, work + filter data (`window.ANDATA`) |
| `core.jsx` | `ATopBar`, `AHero`, `AWhatWeDo` |
| `work.jsx` | `AServices`, `AWork` |
| `app.jsx` | `AContact`, `AFooter`, `AModal`, `AApp` (root) |

## Notes
Components are intentionally cosmetic recreations, not production code. Project
imagery is real (from the AIROLAX repo). This kit reflects the **brief's intended
light-mode direction** — the live andatalab.art is currently a dark experimental
WebGL site (see root `README.md` › Caveats).
