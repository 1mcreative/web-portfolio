// Loader — hides on window load, with a fallback ceiling for slow assets
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  function hide() {
    if (!loader.classList.contains('hidden')) loader.classList.add('hidden');
  }

  if (document.readyState === 'complete') {
    hide();
  } else {
    window.addEventListener('load', hide, { once: true });
  }
  setTimeout(hide, 2500);
}

// Mobile nav toggle
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.textContent = open ? 'Menu' : 'Close';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    });
  });
}

// Back to top button
function initBackToTop() {
  const btn = document.getElementById('back-to-top-button');
  if (!btn) return;

  let ticking = false;
  function check() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { check(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  check();

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Skip link — moves real focus to #main-content (requires tabindex="-1" there)
function initSkipLink() {
  const skip = document.querySelector('.skip-link');
  if (!skip) return;
  skip.addEventListener('click', (e) => {
    const target = document.getElementById('main-content');
    if (target) {
      e.preventDefault();
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Signature motion: work-index / project-reveal entries animate in on scroll
function initWorkReveal() {
  const entries = document.querySelectorAll('.work-entry, .project-reveal');
  if (!entries.length) return;

  if (!('IntersectionObserver' in window)) {
    entries.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((observed) => {
    observed.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  // Anything already on screen at load shouldn't fade in — only entries the
  // visitor has to scroll to reach get the reveal treatment.
  const viewportHeight = window.innerHeight;
  entries.forEach((el) => {
    if (el.getBoundingClientRect().top < viewportHeight) {
      el.classList.add('in-view');
    } else {
      observer.observe(el);
    }
  });
}

// Lazy-load every image except the first hero image on the page
function initLazyLoading() {
  const images = document.querySelectorAll('img');
  images.forEach((img, i) => {
    if (i > 0) img.loading = 'lazy';
  });
}

// Signature hero interaction: a network of points that connect into lines
// near the cursor -- "scattered pieces resolving into something legible" as
// a literal, playful echo of the hero copy. Desktop/mouse only (CSS hides
// the canvas on touch/narrow viewports); respects prefers-reduced-motion.
function initHeroNetwork() {
  const canvas = document.getElementById('hero-network');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const ctx = canvas.getContext('2d');
  const hero = canvas.closest('.hero');
  let points = [];
  let mouse = { x: -9999, y: -9999 };
  let raf = null;

  function resize() {
    const rect = hero.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    const count = Math.round((rect.width * rect.height) / 18000);
    points = Array.from({ length: count }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));
  }

  function step() {
    const rect = hero.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    points.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > rect.width) p.vx *= -1;
      if (p.y < 0 || p.y > rect.height) p.vy *= -1;
    });

    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      const distToMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      const near = distToMouse < 160;

      ctx.beginPath();
      ctx.arc(a.x, a.y, near ? 2.2 : 1.4, 0, Math.PI * 2);
      ctx.fillStyle = near ? 'rgba(43, 63, 224, 0.55)' : 'rgba(21, 20, 15, 0.15)';
      ctx.fill();

      if (!near) continue;

      for (let j = i + 1; j < points.length; j++) {
        const b = points[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(43, 63, 224, ${0.35 * (1 - d / 110)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(step);
  }

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener('resize', resize, { passive: true });
  resize();
  raf = requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavToggle();
  initBackToTop();
  initSkipLink();
  initWorkReveal();
  initLazyLoading();
  initHeroNetwork();
});
