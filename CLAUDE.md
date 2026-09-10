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
   matter as much as correctness. The existing signature touches (the glowing
   cursor/photo-proximity effect, the animated text loader) are intentional
   brand personality — don't flatten them out in the name of "cleanup" without
   asking first. If a real redesign or visual pass is wanted, treat it as its own
   scoped piece of work, not a side effect of a bug-fix pass.

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

- **`main`** is the stable branch — documentation and settled work.
- **The active in-progress branch** is `blank-canvas` (as of 2026-09-10) —
  in-progress fixes, responsiveness work, and polish land there first. Merge
  to `main` once verified rather than committing unreviewed changes straight
  to `main`. (`2026-06-26-r71q`, the previous enhancement branch, is already
  merged into `main` via PR #1 — don't confuse the two.)
- Before marking any layout/CSS change done, start a local server and check it
  in a browser at mobile, tablet, and desktop widths at minimum — see goal 1.
  `python3 -m http.server` from the repo root is enough; there's no build step.
- Images are currently hotlinked from `raw.githubusercontent.com/1mcreative/static`.
  That's a real fragility/performance risk for a production site (no CDN
  guarantees, GitHub can rate-limit it) but migrating hosting is a real
  architecture decision (where do assets live, repo size implications) — raise
  it with the user rather than silently re-hosting everything.
- The Google Analytics property (`G-MFQEMF55V1`) should be present on every
  page, not just `index.html` — it's how SEO/traffic progress against goal 3
  actually gets measured.

## Current status (last updated 2026-09-10)

### Branches
- `main` and `blank-canvas` are identical up through commit `1eda3e8` (the
  `2026-06-26-r71q` enhancement branch, merged via PR #1). `blank-canvas`
  then diverged and is now the active in-progress branch — **not yet merged
  into `main`.**
- `main` still has the **old** `index.html`: Poppins font, `#CD4A00` accent,
  custom mouse-pointer effect — the design `README.md` currently describes.
- On `blank-canvas`, `index.html` was blanked (`b416719`) and rebuilt from
  scratch as a new hand-authored single-file template (`6eeadd0`) — a full
  redesign, not an edit of the old page.

### Done on `blank-canvas` (as of commit `a85ac32`, 2026-09-10)
- New template for `index.html`: canvas-drawn torus hero animation,
  scroll-driven "Selected Work" carousel, ASCII-glyph scrambling name
  preloader, JetBrains Mono / Archivo type, sticky nav + scroll-progress bar,
  footer with live local time.
- Full rebrand: replaced the template's placeholder identity (name, initials,
  session-storage key, canvas wordmark, footer copyright, preloader text,
  runtime-assembled email) with Neha Paul's own (`60836c7`).
- Fixed the one thing the rebrand missed: the LinkedIn link pointed to the
  template author's profile; now points to
  `linkedin.com/in/neha-paul-b95605157/` (`a85ac32`).
- Both commits pushed to `origin/blank-canvas`.

### Not yet verified
- Goal 1's browser check (mobile/tablet/desktop widths, no horizontal
  scroll, touch targets) has **not** been run against the new template —
  do this before calling it done, per the working convention above.
- Whether the new JS (torus canvas, scroll carousel, preloader) respects
  `prefers-reduced-motion`, or degrades reasonably with JS off/slow.

### Known gaps (found reviewing `blank-canvas` on 2026-09-10)
- **No Google Analytics tag on `index.html`.** `G-MFQEMF55V1` is present on
  every `page/*.html` file but missing from the new `index.html` — the one
  page goal 3 cares about most for measuring traffic.
- **No SEO meta on `index.html` at all** — no `<title>`, meta description,
  canonical link, Open Graph/Twitter tags, or structured data. Every
  `page/*.html` case study has a proper unique title; only the new homepage
  is missing this. Regression against goal 3, introduced by the rebuild.
- **`index.html` is ~4.3MB** (vs. 6–16KB for `page/*.html` files) — it embeds
  ~22 images as base64 data URIs directly in the HTML instead of linking
  files. Not the `raw.githubusercontent.com` hotlinking risk above (no
  hotlinked images in the new template at all); it's arguably worse — the
  whole document must download before anything renders, and images can't be
  browser-cached separately. Treat as its own scoped fix (e.g. extract to
  real files) — don't silently rewrite a 4.3MB file as a side effect of
  something else.
- **New homepage doesn't link to the `page/*.html` case studies.** "Selected
  Work" links out to Figma/Behance instead. The six case-study pages plus
  `resume.html` still exist, are listed in `sitemap.xml`, and have working
  SEO — but nothing on the new homepage links to them anymore. See open
  decision #2 below.
- **The template's own file header says "GENERATED... do not edit... Rebuild
  with `cd dc-runtime && bun run build`"** — it was exported from a design
  tool, not hand-written (the custom `<x-dc>`/`<helmet>` tags and
  base64-eval'd bootstrap scripts near the top of the file are that tool's
  scaffold). There's no such build pipeline in this repo, so — consistent
  with the no-build-step convention for this project — all edits so far have
  been direct hand-edits to the static HTML, same as any other file here.
- **`README.md` still describes the *old* `main` design** (Poppins font,
  `#CD4A00` color, structured data/OG tags that don't exist in the new
  `index.html` yet). Rewrite it once the gaps above are settled, not before,
  so it doesn't describe content that's still in flux.

### Open decisions (not Claude's call — ask Bhavesh/Neha)
1. Is the `blank-canvas` template the accepted final direction, replacing the
   "glowing cursor/photo-proximity effect" and "animated text loader" that
   goal 2 currently names as signature touches? If so, goal 2 should be
   reworded to describe the new template's own signature touches instead.
2. Should the `page/*.html` case studies be linked from the new homepage, or
   are they superseded by the Figma/Behance links now?
3. When is `blank-canvas` ready to merge into `main`? Per the working
   convention above: once verified (goal 1 browser check + SEO gaps closed),
   not before.
