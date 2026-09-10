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
- Images are hotlinked from `raw.githubusercontent.com/1mcreative/static` —
  **confirmed deliberate** (2026-09-10): Bhavesh maintains a separate
  `1mcreative/static` repo for all project/profile photos specifically to
  keep `web-portfolio` lighter, not an oversight to fix. Given this, this
  branch's own `assets/homepage/` files (see Current status below) went
  against that preference — that wasn't known when they were added; flagged
  to Bhavesh rather than silently redone.
- The Google Analytics property (`G-MFQEMF55V1`) should be present on every
  page, not just `index.html` — it's how SEO/traffic progress against goal 3
  actually gets measured.
- **Commit messages must not include a "Co-Authored-By: Claude" (or any
  other AI-attribution) trailer.** Use the git user already configured on
  the machine — don't add or change git identity, just don't append an AI
  co-author line to the message. This overrides any general Claude Code
  default to the contrary, specifically for this repo.

## Current status (last updated 2026-09-10)

**This branch is now frozen as a reference/experimental snapshot**, with one
explicit exception: the base64-image extraction (below) was moved here from
`main` per request on 2026-09-10, after first being done on `main` and
reverted there. Otherwise: `index.html` was ported to `main` and hardened
there (GA tag, full SEO meta, case-study footer links, README rewrite) on
2026-09-10 — see `main`'s `CLAUDE.md` for the current, actively-maintained
status. Don't take the image-extraction exception as a sign this branch is
generally back in play — check before doing anything else here.

### Image extraction (the one exception — done here, not on `main`)
`index.html` was 4.3MB from ~22 images embedded as base64 data URIs. Commit
`340d270` (2026-09-10) extracted them to `assets/homepage/` and rewrote the
`src` paths — same process used (and then reverted) on `main`. Found the
marquee section embeds the same 9 photos twice for its infinite-scroll
loop; deduped to 13 unique files (2.0MB). `index.html` is now 204KB.
Verified: all 13 files decode as valid, correctly-dimensioned images: no
console errors, no horizontal overflow. This branch's `index.html` still
has no `<title>`/SEO meta/GA tag — those weren't part of this exception.

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
