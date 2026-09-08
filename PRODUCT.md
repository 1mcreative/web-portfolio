# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no framework or build step. Existing project convention (see `CLAUDE.md`), reconfirmed for this redesign.

## Users

Three audiences the site needs to work for simultaneously, confirmed by the user (not narrowed to one): enterprise/agency clients evaluating Neha for contract or full-time UX/product design work, startups/founders looking for a designer who can own product decisions end to end, and recruiters screening for full-time roles. All three are evaluating the same evidence (case studies, craft, resume) — the site isn't tailored to pitch differently per audience, it needs to read as credible to all three.

## Product Purpose

A personal portfolio for Neha Paul (Experience Designer) that wins client/employer trust and ranks in search for both her name and adjacent role terms (UX Designer, Experience Designer, UX/Experience Architect). See `CLAUDE.md` for the full standing goals this repo works toward.

## Positioning

Not confirmed beyond the existing mission-statement copy ("The quest to make the ordinary, extraordinary - and the impossible, possible!"). No specific differentiating angle (industry vertical, design philosophy, methodology) has been established — undecided, do not invent one.

## Operating Context

Static site deployed via GitHub Pages at nehapaul.in (custom domain via `CNAME`). No CMS/backend — content is hand-edited HTML, updated directly in the repo.

## Capabilities and Constraints

- No build tooling/framework, by project convention
- Clean URLs required (no `.html` in any route) — GitHub Pages needs folder + `index.html` per route to achieve this, since it can't do server-side redirects
- Google Analytics (gtag, `G-MFQEMF55V1`) must be present on every page
- Images are currently hotlinked from `raw.githubusercontent.com/1mcreative/static` — known fragility (no CDN guarantees), not being fixed in this redesign pass

## Brand Commitments

None currently binding. The prior visual identity (orange `#CD4A00` accent, Poppins typeface, "@inmydreamyland" handle) is being explicitly retired, not evolved — this redesign starts from a fresh visual identity by the user's own direction.

## Evidence on Hand

Real, confirmed — carry forward as-is:
- Name: Neha Paul. Title: Experience Designer.
- Mission/bio copy: "The quest to make the ordinary, extraordinary - and the impossible, possible!" plus the existing "Let's ignite a spark of delight..." paragraph.
- Social links: LinkedIn (`linkedin.com/in/neha-paul-b95605157`), Behance (`behance.net/nehapaul1610`), Medium (`@nehapaul1610`), Instagram (`@amibhalaasi`)
- 6 real projects: IBM, EQ, Chalo Chale, Finance Ops (internship), Sustainable Banking Solutions, WCA
- Existing hosted assets (profile photo, project cover images, resume image, social icons) at `raw.githubusercontent.com/1mcreative/static`

Explicitly placeholder for this pass — labeled as such, never fabricated as fact:
- Full case-study bodies (problem/process/outcome detail)
- Extended About-page bio beyond the existing quote/paragraph
- Public contact email (none exists today)
- Any new photography/imagery beyond what's already hosted

## Product Principles

1. Original design, genre-inspired only — not a copy of any reference site.
2. Content honesty: real data stays real; unbuilt content is clearly labeled placeholder, never invented as fact.
3. The design itself is part of the pitch (it demonstrates Neha's taste), so craft quality matters as much as content completeness.
4. Fully responsive at every breakpoint, not just a couple of tested sizes.
5. SEO-legible: unique per-page metadata, clean URLs, sitemap coverage.

## Accessibility & Inclusion

No formally required standard stated by the user. The prior site targeted WCAG 2.1 AA-style practices (skip links, ARIA labels, focus management, reduced-motion support, 44px touch targets) — carried forward as a baseline by convention, not an explicit mandate.
