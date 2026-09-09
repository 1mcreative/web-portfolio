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

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavToggle();
  initBackToTop();
  initSkipLink();
  initWorkReveal();
  initLazyLoading();
});
