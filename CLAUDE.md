# web-portfolio — project goals

Personal portfolio site for Neha Paul, an Experience Designer. Static HTML/CSS/JS,
no build step, no framework. Canonical URLs point at `https://nehapaul.in/`.

## Goals (in priority order)

1. **Fully responsive, mobile-first and desktop-first.** The site has to look and
   work correctly at every width, not just the two or three breakpoints someone
   happened to test — small phones, tablets, in-between laptop widths, and large
   desktop monitors all count. No horizontal scroll, no clipped/overflowing
   content, touch targets ≥44×44px on anything tappable. When you change layout
   or spacing CSS, verify in a real browser at several widths (not just reasoning
   from the CSS) before calling it done — this codebase has had bugs (undefined
   CSS variables, conflicting rules of equal specificity in different media
   queries) that were invisible from reading the CSS alone and only showed up
   when actually rendered.

2. **Attractive enough to win client work.** This site's job is to make visitors
   want to hire Neha. Visual polish, smooth interactions, and a professional feel
   matter as much as correctness. As of the 2026-09 redesign, the visual identity
   is: warm paper (`#F5F1E7`) / ink (`#15140F`) base, one cobalt accent
   (`#2B3FE0`), Bricolage Grotesque throughout, numbered work-index entries with
   a scroll-reveal as the one signature motion moment. The prior identity
   (orange `#CD4A00`, Poppins, the glowing cursor effect, "@inmydreamyland"
   handle) was explicitly retired, not evolved — don't resurrect it by default.
   Treat this current identity the same way: it's intentional, not a draft: if a
   real redesign or visual pass is wanted, treat it as its own scoped piece of
   work, not a side effect of a bug-fix pass.

3. **SEO: rank for both branded and role searches.** People should find this site
   searching "Neha Paul", "Neha Paul UX", "Neha Paul Experience Designer", etc.,
   *and* searching for the roles she works in — UX Designer, UI Designer,
   Experience Designer/Architect, Product Designer, Interaction Designer.
   Be realistic about this: on-page technical SEO (unique per-page titles/
   descriptions, structured data, working canonical URLs, analytics on every
   page, fast/clean-loading pages) improves the *conditions* for ranking, but
   ranking first for a single generic word like "UX" or "Architect" alone is an
   extremely competitive, long-term goal that on-page work can't win by itself —
   it needs backlinks, content depth, and domain authority over time. Don't
   overstate what a metadata pass accomplishes. Also: "architect" here means UX
   Architect / Experience Architect (a real, adjacent design title) — Neha is
   not a building architect; never add copy that implies otherwise.

## Working conventions for this repo

- **`redesign-simki-inspired` is what's actually live at nehapaul.in** —
  confirmed via `gh api repos/1mcreative/web-portfolio/pages` on 2026-09-10:
  GitHub Pages source is `{"branch":"redesign-simki-inspired","path":"/"}`,
  not `main`. This directly contradicts the "`main` is the stable branch"
  framing that used to be here (and still appears in `main`'s and
  `blank-canvas`'s own copies of this file, written before this was
  checked) — don't trust that framing without re-verifying the Pages API,
  since the deployed branch can change. Practically: a push to this branch
  goes live essentially immediately (GitHub Pages rebuilds automatically),
  so treat changes here with the same care as a production deploy — verify
  before pushing, not just before merging somewhere else later.
- Every route is a folder + `index.html` (`/work/ibm/index.html`, not
  `/work/ibm.html`) so URLs never show `.html` — GitHub Pages needs that
  pattern to hide the extension, since it can't do server-side redirects.
  Keep this when adding new pages.
- Before marking any layout/CSS change done, start a local server and check it
  in a browser at mobile, tablet, and desktop widths at minimum — see goal 1.
  `python3 -m http.server` from the repo root is enough; there's no build step.
- Images are hotlinked from `raw.githubusercontent.com/1mcreative/static` —
  **confirmed deliberate** (2026-09-10): Bhavesh maintains a separate
  `1mcreative/static` repo for all project/profile photos specifically to
  keep `web-portfolio` lighter, not an oversight to fix. Keep using that
  pattern for new images (e.g. `project/<name>/01.png`, `project/cover/
  <name>.png`) rather than committing binary assets into this repo. The
  fragility risk (no CDN guarantees, GitHub can rate-limit raw.githubusercontent.com)
  is accepted, known, and intentional — don't silently "fix" it by moving
  images into this repo either.
- The Google Analytics property (`G-MFQEMF55V1`) should be present on every
  page, not just `index.html` — it's how SEO/traffic progress against goal 3
  actually gets measured.
