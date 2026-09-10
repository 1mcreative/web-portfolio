# Neha Paul - Experience Designer Portfolio

![Portfolio Preview](https://raw.githubusercontent.com/1mcreative/static/main/project/profile/profile-photo.png)

## 🌟 Overview

A professional portfolio website showcasing the UX/UI design work of Neha Paul, an Experience Designer specializing in creating extraordinary user experiences. This portfolio demonstrates enterprise-level design solutions across multiple industries including travel, finance, healthcare, and sustainability.

## 🎯 Key Features

### ✨ **Signature Homepage**

- Canvas-drawn torus hero animation and a particle wordmark that assembles on load
- ASCII-glyph "scramble" preloader and text reveals throughout
- Horizontal scroll-driven "Selected Work" carousel with a live mobius-curve canvas backdrop
- JetBrains Mono / Archivo typography, sticky nav, scroll-progress bar, live local-time footer

### 🔍 **SEO Optimized**

- Unique title, meta description, and keyword targeting on every page
- Open Graph and Twitter Card support, canonical URLs, `robots` meta
- `Person` structured data (schema.org) with social profile links
- Google Analytics (`G-MFQEMF55V1`) on every page

### 📱 **Responsive Design**

- Mobile-first layout with dedicated overrides at 900px and 480px breakpoints
- Verified with no horizontal scroll at 320px, 375px, 768px, 1024px, and 1920px viewports
- Touch-friendly project carousel

## 📁 Project Structure

```
├── index.html                 # Main portfolio page — single-file template (canvas/JS-driven)
├── assets/
│   └── homepage/               # index.html's images (13 files, extracted from inline base64)
├── page/                      # Project case studies
│   ├── ibm.html               # IBM Enterprise Design
│   ├── chalo_chale.html       # Travel App Design (20 images)
│   ├── eq.html                # Emotional Intelligence Platform
│   ├── internship_at_finance_ops.html # Finance Operations (21 images)
│   ├── sustainable_banking_solutions.html # Green Banking + Video
│   ├── wca.html                # Enterprise Design (76 images)
│   └── resume.html            # Professional Resume
├── style/
│   └── styles.css             # Stylesheet used by page/*.html (index.html styles itself inline)
├── script/
│   └── script.js               # JavaScript used by page/*.html (index.html carries its own JS)
├── robots.txt                  # Crawler rules + sitemap pointer
├── sitemap.xml                  # Full page listing for search engines
├── CNAME                        # GitHub Pages custom domain (nehapaul.in)
├── CLAUDE.md                    # Project goals, conventions & current status for AI-assisted work
└── README.md                  # This file
```

`index.html` is self-contained: its `<head>` carries the page-level SEO/GA tags below, while fonts, page-scoped CSS, and the hero/carousel behavior live inline in the file itself rather than in `style/styles.css` or `script/script.js` (those two are used by the `page/*.html` case studies).

## 🎨 Design Philosophy

> "The quest to make the ordinary, extraordinary - and the impossible, possible!"

The portfolio reflects Neha's design philosophy of creating experiences that are:
- **Intuitive**: Easy to understand and use
- **Delightful**: Bring joy and satisfaction
- **Meaningful**: Solve real user problems
- **Professional**: Enterprise-grade quality

## 🛠️ Technical Stack

- **HTML5**: Semantic sectioning (`nav`, `section`, `footer`, `article`)
- **CSS3**: Flexbox/Grid layouts, `clamp()`-based fluid type, canvas-driven visuals
- **JavaScript**: Vanilla JS component system driving the hero canvas, scroll carousel, and text-scramble effects
- **Google Fonts**: Archivo + JetBrains Mono on the homepage; Poppins on the `page/*.html` case studies
- **Schema.org**: `Person` structured data for SEO

## 📊 SEO Features

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Neha Paul",
  "jobTitle": "Experience Designer",
  "knowsAbout": ["UX Design", "UI Design", "Interaction Design"]
}
```

### Meta Tags
- Open Graph for social sharing
- Twitter Cards for rich previews
- Canonical URLs for SEO
- Keyword targeting for both branded ("Neha Paul") and role searches (UX/UI/Experience/Product/Interaction Designer, UX/Experience Architect)

### Crawling
- `robots.txt` + `sitemap.xml` at the repo root, listing every page

## ♿ Accessibility

Current state, honestly: semantic HTML sectioning is in place, decorative canvases are marked `aria-hidden="true"`, the nav has `aria-label="Primary"`, there's a "Skip to main content" link as the first focusable element, and the homepage checks `prefers-reduced-motion` to skip the intro preloader for users who request it. It does **not** yet have screen-reader labeling for the scramble/reveal text animations, or `prefers-reduced-motion` coverage beyond that intro preloader — those are known gaps, not shipped features. Treat any accessibility claim beyond what's listed here as unverified until it's actually audited.

## 📱 Mobile Optimization

### Responsive Breakpoints (homepage)
- **≤480px**: phone-specific overrides (hero text position, card image heights, heading sizes)
- **≤900px**: tablet/phone shared overrides (nav padding, work-carousel layout, section type scale)
- **>900px**: desktop layout

### Verified
No horizontal scroll at 320px, 375px, 768px, 1024px, or 1920px viewport widths (checked via headless browser, `document.documentElement.scrollWidth` against `window.innerWidth`). Full manual/touch-device QA hasn't been done — see the "Not yet verified" section of `CLAUDE.md`.

## 🚀 Deployment

### Local Development
```bash
# Clone the repository
git clone [repository-url]
cd [project-directory]

# Serve locally (no build step)
python3 -m http.server
```

### Web Hosting
The site is deployed via GitHub Pages, using the `CNAME` file to serve `nehapaul.in`.

## 📈 Performance

### What's already in place
- **`index.html` is 210KB**, not 4.3MB — the homepage's images used to be embedded as base64 data URIs directly in the HTML; they're now real files under `assets/homepage/`, loaded in parallel and mostly lazily instead of blocking the whole document on one inline payload. (The marquee section turned out to embed the same 9 photos twice for its infinite-scroll loop — deduped down to 13 unique files, 2.0MB total.)
- **Lazy loading**: homepage and `page/*.html` images load as needed
- **Deferred scripts**: `page/*.html` JS doesn't block initial render
- **Caching/Compression**: Handled by the hosting platform (GitHub Pages) — not configured at the repo level

## 🔧 Customization

### Colors (homepage)
```css
--bg: #f7f5ef;
--text: #15171e;
--accent-teal: #0a8d6f;
--accent-purple: #6a5be0;
```

### Typography
- Homepage: Archivo (weight/width variable) + JetBrains Mono
- `page/*.html` case studies: Poppins (300, 400, 500, 600)

## 📞 Contact & Social

- **Portfolio**: [nehapaul.in](https://nehapaul.in/)
- **LinkedIn**: [Neha Paul](https://www.linkedin.com/in/neha-paul-b95605157/)
- **Behance**: [Neha Paul](https://www.behance.net/nehapaul1610)
- **Medium**: [@nehapaul1610](https://medium.com/@nehapaul1610)
- **Instagram**: [@amibhalaasi](https://www.instagram.com/amibhalaasi)

## 📄 License

This project is part of Neha Paul's professional portfolio. All design work and case studies are protected under copyright.

## 🙏 Acknowledgments

Special thanks to the mentors, clients, and users who contributed to the development of these design projects and the continuous improvement of this portfolio.

---

**Built with ❤️ by Neha Paul** | *Experience Designer & UX/UI Enthusiast*
