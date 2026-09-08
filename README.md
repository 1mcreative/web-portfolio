# Neha Paul — Experience Designer Portfolio

Personal portfolio for Neha Paul, an Experience Designer. Static HTML/CSS/JS, no framework or build step, deployed via GitHub Pages at [nehapaul.in](https://nehapaul.in/).

See [CLAUDE.md](CLAUDE.md) for the standing goals this project works toward, and [PRODUCT.md](PRODUCT.md) for the fuller product/audience context behind the current design.

## Status

This is a fresh redesign (structure + visual system rebuilt from scratch). Content is intentionally partial right now: real project names, cover images, bio, and social links are in place; full case-study write-ups are placeholders, clearly labeled as such on each project page, being filled in incrementally.

## Project structure

Every route is a folder with its own `index.html`, so URLs never show `.html`:

```
├── index.html                        # Home
├── work/
│   ├── index.html                    # Work index (all 6 projects)
│   ├── ibm/index.html
│   ├── eq/index.html
│   ├── chalo-chale/index.html
│   ├── finance-ops/index.html
│   ├── sustainable-banking/index.html
│   └── wca/index.html
├── about/index.html
├── resume/index.html
├── assets/
│   ├── css/styles.css                # Design tokens + all page styles
│   └── js/script.js                  # Loader, nav, scroll-reveal, a11y behavior
├── robots.txt
├── sitemap.xml
├── CNAME                              # GitHub Pages custom domain
├── PRODUCT.md
└── CLAUDE.md
```

Images (profile photo, project covers, resume, social icons) are hosted externally at `raw.githubusercontent.com/1mcreative/static` — a known fragility (no CDN guarantees), tracked in `CLAUDE.md` rather than fixed here.

## Design system

- **Type**: Bricolage Grotesque (variable, via Google Fonts) for both display and body text, at different weights/optical sizes.
- **Color**: warm paper (`#F5F1E7`) and ink (`#15140F`) base, one accent — cobalt blue (`#2B3FE0`) — used deliberately rather than scattered.
- **Motion**: one signature moment — work-index entries reveal on scroll — plus standard hover/focus states. Respects `prefers-reduced-motion`.
- Tokens live at the top of `assets/css/styles.css` as CSS custom properties (color, type scale, spacing scale).

## Accessibility

- Skip-to-content link that actually moves focus (`tabindex="-1"` on `#main-content`, verified — this exact bug existed and was fixed in the previous design)
- Visible `:focus-visible` outlines, 44px minimum touch targets, semantic HTML/ARIA landmarks
- `prefers-reduced-motion` support throughout

## SEO

- Unique title/description/canonical/Open Graph per page
- JSON-LD structured data (`Person` on home, `CreativeWork` per case study)
- `robots.txt` + `sitemap.xml` listing every real route
- Google Analytics (`gtag`, `G-MFQEMF55V1`) on every page

## Local development

No build step — just serve the directory:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`. GitHub Pages needs the folder+`index.html` structure above to serve clean URLs; a plain local file server (`open index.html`) won't resolve `/work/` the same way a real server does, so use the command above rather than opening files directly.

## Contact

- [LinkedIn](https://www.linkedin.com/in/neha-paul-b95605157/)
- [Behance](https://www.behance.net/nehapaul1610)
- [Medium](https://medium.com/@nehapaul1610)
- [Instagram](https://www.instagram.com/amibhalaasi)
