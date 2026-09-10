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
   reveals — adopted from `blank-canvas` onto `main` on 2026-09-10, see Current
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
- **Commit messages must not include a "Co-Authored-By: Claude" (or any
  other AI-attribution) trailer.** Use the git user already configured on
  the machine — don't add or change git identity, just don't append an AI
  co-author line to the message. This overrides any general Claude Code
  default to the contrary, specifically for this repo.

## Current status (last updated 2026-09-10)

### Branches — now diverged in purpose, not just content
- `main` now carries the redesigned homepage, ported from `blank-canvas` and
  hardened for production (see "Done on `main`" below).
- `blank-canvas` is **frozen as a snapshot of the original experiment**, with
  one explicit exception: the base64-image extraction now lives there
  instead of `main` (moved 2026-09-10 at request — see resolved decision #4
  below). Otherwise it still has the pre-hardening gaps (no GA, no SEO meta,
  no case-study links) — intentional, not an oversight. Don't do other
  work there without checking first; the image-extraction move was a
  one-off exception, not a sign this branch is generally back in play.
- This was a **manual port** (`git checkout blank-canvas -- index.html` +
  hand-edits on `main`), not a `git merge` — `blank-canvas` is not an
  ancestor of `main`'s current tip. Don't `git merge blank-canvas` into
  `main` later expecting a clean/fast-forward merge; it would reintroduce
  the unhardened `<head>` and footer. Cherry-pick specific future
  `blank-canvas` commits instead, or treat it as reference-only.
- Further homepage work should happen on `main` directly (or a fresh branch
  cut from `main`) — not on `blank-canvas`.

### Done on `main` (as of commit `446eb44`, 2026-09-10)
- Adopted `blank-canvas`'s redesigned `index.html` — canvas-drawn torus hero,
  scroll-driven "Selected Work" carousel, ASCII-glyph scramble preloader,
  JetBrains Mono / Archivo type — replacing the old Poppins/`#CD4A00` design.
  Rebrand to Neha Paul's identity (carried over from `blank-canvas`) intact.
- Added to the real `<head>` — the template's `<helmet>` element lives in
  `<body>` and doesn't affect document metadata, so these couldn't go there:
  title, meta description, canonical, OG/Twitter tags, `robots` meta,
  `Person` structured data, `lang="en"`.
- Added the Google Analytics tag (`G-MFQEMF55V1`) — present on every page
  again.
- Restored links to the six `page/*.html` case studies + `resume.html` via a
  new footer row (the "Selected Work" carousel links out to Figma/Behance
  instead, so these pages had no path in from the homepage without this).
- Rewrote `README.md` to describe this design instead of the old one.

### Verified
- No horizontal overflow at 320/375/768/1024/1920px viewport widths
  (headless browser: `document.documentElement.scrollWidth` vs.
  `window.innerWidth`).
- No console errors on load.
- Title, GA tag, canonical, JSON-LD, and all 7 footer case-study links
  confirmed present in the live DOM, served via `python3 -m http.server`
  (`.claude/launch.json` now has this wired up for one-command preview).

### Not yet verified
- Manual/touch-device QA — the check above is headless-browser layout only.
- Whether `prefers-reduced-motion` is honored beyond skipping the intro
  preloader (`this.reduced` gates `preload()`; whether it also tones down
  the torus/carousel animations elsewhere hasn't been audited).
- Cross-browser rendering (only checked in the one engine available here).

### Known gaps still open on `main`
- **`index.html` is ~4.3MB again** — the base64-image extraction (see
  resolved decision #4 below) was reverted 2026-09-10 (`7bd6084`) and moved
  to `blank-canvas` instead, per request. Don't re-extract on `main` without
  checking first — this has now gone back and forth once already.
- **Full accessibility coverage is still incomplete**, even after the basic
  pass in commit `8df8ad1` (2026-09-10): that commit added a skip-link,
  `aria-hidden` on the three decorative canvases, and `aria-label="Primary"`
  on the nav — but the scramble/reveal text animations aren't labeled for
  screen readers, and `prefers-reduced-motion` only gates the intro
  preloader, not the torus/carousel animations elsewhere. Those are bigger,
  separate pieces of work, not folded into that pass.
- The template's file header still says "GENERATED... do not edit... Rebuild
  with `cd dc-runtime && bun run build`" — there's no such pipeline in this
  repo, so it remains a hand-edited static file like any other here.

### Known gaps on `blank-canvas` (deliberately left as-is)
`index.html` there is still the pre-hardening version: no GA tag, no SEO
meta, no case-study links; `README.md` there still describes the
pre-blank-canvas design too. This is intentional — `blank-canvas` is frozen
as the original experiment record (see Branches above), not being iterated
on. Don't treat its lack of these fixes as something to go fix.

### Resolved decisions
1. ~~Is the `blank-canvas` template the accepted final direction?~~ **Yes** —
   promoted to `main` 2026-09-10; goal 2's "signature touches" wording now
   describes it.
2. ~~Should `page/*.html` case studies be linked from the homepage?~~ **Yes**
   — restored via the footer "CASE STUDIES" row.
3. ~~Is a basic accessibility pass wanted (skip-link, ARIA labeling)?~~
   **Done**, `8df8ad1` 2026-09-10 — see "Known gaps still open on `main`"
   above for what that pass didn't cover.
4. ~~Where should the 4.3MB embedded-image bloat go?~~ **Extracted to
   `blank-canvas`, not `main`.** First tried on `main` by default (commit
   `c36af31`, extracted to `assets/homepage/`, 22 base64 data URIs → 13
   deduped real files, `index.html` 4.3MB → 210KB) — then reverted there
   (`7bd6084`) and redone on `blank-canvas` instead, per explicit request
   2026-09-10. `main`'s `index.html` is back to embedded base64 / 4.3MB.
   See `blank-canvas`'s own `CLAUDE.md` for that branch's current state.
