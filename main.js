/* ================================================================
   NKOMO CUTZ — SHARED JAVASCRIPT
   Include this on every page: <script src="../assets/main.js"></script>
   ================================================================ */

(function () {
  'use strict';

  // ── Nav: sticky scroll state ─────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Nav: active link highlight ───────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.endsWith(currentPage))) {
      link.classList.add('active');
    }
  });

  // ── Mobile menu ──────────────────────────────────────────────
  const toggle = document.getElementById('navToggle');
  const mMenu  = document.getElementById('mobileMenu');

  if (toggle && mMenu) {
    toggle.addEventListener('click', () => {
      const open = mMenu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mMenu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll Reveal ────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ── Hero reveals: fire immediately ───────────────────────────
  setTimeout(() => {
    document.querySelectorAll('.hero-reveal').forEach(el => el.classList.add('visible'));
  }, 80);

  // ── Smooth anchor scroll (same-page links) ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Counter animation (for stats) ───────────────────────────
  function animateCounter(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(update);
  }

  const statEls = document.querySelectorAll('[data-target]');
  if (statEls.length && 'IntersectionObserver' in window) {
    const statIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          statIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => statIO.observe(el));
  }
})();
