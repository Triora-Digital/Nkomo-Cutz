/* ================================================================
   NKOMO CUTZ v3 — SHARED JS (main.js)
   ================================================================ */
(function () {
  'use strict';

  // ── Nav scroll state ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const tick = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  // ── Active nav link ──────────────────────────────────────────
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const h = a.getAttribute('href') || '';
    if (h === page || h.endsWith('/' + page) || (page === 'index.html' && (h === './' || h === '../' || h === ''))) {
      a.classList.add('active');
    }
  });

  // ── Mobile menu ──────────────────────────────────────────────
  const toggle = document.getElementById('navToggle');
  const mmenu  = document.getElementById('mobileMenu');
  if (toggle && mmenu) {
    toggle.addEventListener('click', () => {
      const open = mmenu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mmenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mmenu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll reveal ────────────────────────────────────────────
  const revEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    revEls.forEach(el => io.observe(el));
  } else {
    revEls.forEach(el => el.classList.add('visible'));
  }

  // ── Hero reveals — fire on load ──────────────────────────────
  setTimeout(() => {
    document.querySelectorAll('.hero-reveal').forEach(el => el.classList.add('visible'));
  }, 80);

  // ── Smooth anchor scroll ─────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ── Counter animate ──────────────────────────────────────────
  function countUp(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const dur = 1800, start = performance.now();
    const upd = now => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(e * target) + suffix;
      if (p < 1) requestAnimationFrame(upd);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(upd);
  }
  const counters = document.querySelectorAll('[data-target]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  }
})();
