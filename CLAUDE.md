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
   matter as much as correctness. The current signature touches (the canvas-drawn
   torus hero, the particle wordmark, the ASCII-glyph scramble preloader and text
   reveals — adopted from this branch onto `main` on 2026-09-10, see Current
   status below) are intentional brand personality — don't flatten them out in
   the name of "cleanup" without asking first. If a real redesign or visual pass
   is wanted, treat it as its own scoped piece of work, not a side effect of a
   bug-fix pass.

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
- **`blank-canvas` is now frozen** (as of 2026-09-10) — its homepage redesign
  was ported to `main` and hardened there. Further in-progress work should
  happen on `main` directly (or a fresh branch cut from it), not here.
  (`2026-06-26-r71q`, the enhancement branch before this one, was merged into
  `main` via PR #1 earlier — don't confuse the two.)
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

**This branch is now frozen as a reference/experimental snapshot.** Its
`index.html` was ported to `main` and hardened there (GA tag, full SEO meta,
case-study footer links, README rewrite) on 2026-09-10 — see `main`'s
`CLAUDE.md` for the current, actively-maintained status. Nothing on this
branch was touched as part of that port; everything below describes this
branch's own history, which stays accurate for what's actually still here.

### What happened on this branch
- `index.html` was blanked (`b416719`) and rebuilt from scratch as a new
  hand-authored single-file template (`6eeadd0`) — a full redesign, not an
  edit of the old page.
- New template: canvas-drawn torus hero animation, scroll-driven "Selected
  Work" carousel, ASCII-glyph scrambling name preloader, JetBrains Mono /
  Archivo type, sticky nav + scroll-progress bar, footer with live local
  time.
- Full rebrand: replaced the template's placeholder identity (name,
  initials, session-storage key, canvas wordmark, footer copyright,
  preloader text, runtime-assembled email, LinkedIn URL) with Neha Paul's
  own (`60836c7`, `a85ac32`).
- On 2026-09-10 this design was reviewed, found to be missing GA/SEO meta
  and homepage links to the case studies (listed below) — and rather than
  fixing those here, the template was ported to `main` and fixed there
  instead. This branch was deliberately left as-is.

### What's still missing here (by design — not fixed on this branch)
- No Google Analytics tag on `index.html`.
- No SEO meta at all — no `<title>`, meta description, canonical link, OG/
  Twitter tags, or structured data.
- `index.html` is ~4.3MB (22 images embedded as base64 data URIs) — this
  gap is also still open on `main`, not unique to this branch.
- No links from the homepage to the `page/*.html` case studies.
- `README.md` here still describes the pre-`blank-canvas` (`main`'s old)
  design — also not fixed here.
- No skip-link or ARIA labeling (also still true on `main`).
- The template's own file header says "GENERATED... do not edit... Rebuild
  with `cd dc-runtime && bun run build`" — exported from a design tool, not
  hand-written. There's no such build pipeline in this repo, so this file
  was always going to be hand-edited directly regardless of that header.

**Don't "fix" the items above on this branch** — that work already happened
on `main`. If you're picking up homepage work, check out `main`, not
`blank-canvas`.
