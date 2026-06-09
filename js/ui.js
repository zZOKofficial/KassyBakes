/* ════════════════════════════════════════════════════════════════
   KASSY BAKES — INTERACTION LAYER
   Theme toggle + persistence · scroll progress · reveal-on-scroll ·
   parallax · nav behaviour · magnetic buttons · toasts · back-to-top.
   Respects prefers-reduced-motion throughout.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* ── Theme ── (initial theme set pre-paint inline; this handles toggling) */
  const THEME_KEY = 'kb-theme';
  function setTheme(t, persist = true) {
    root.setAttribute('data-theme', t);
    if (persist) { try { localStorage.setItem(THEME_KEY, t); } catch (e) {} }
    const tg = document.getElementById('themeToggle');
    if (tg) tg.setAttribute('aria-label', t === 'night' ? 'Switch to Rico’s daylight' : 'Switch to Sam’s midnight');
  }
  window.KB_toast = null; // assigned below

  /* ── Toasts ── */
  function toast(msg) {
    const host = document.getElementById('toastHost');
    if (!host) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = msg;
    host.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .4s, transform .4s';
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      setTimeout(() => el.remove(), 420);
    }, 3200);
  }
  window.KB_toast = toast;

  /* ── Reveal on scroll ── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  }

  /* ── Parallax (data-parallax="0.15") ── */
  function initParallax() {
    if (reduce) return;
    const items = [...document.querySelectorAll('[data-parallax]')];
    if (!items.length) return;
    let ticking = false;
    function update() {
      const vh = window.innerHeight;
      items.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
      });
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ── Magnetic buttons (data-magnetic) ── */
  function initMagnetic() {
    if (reduce || window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ── Nav: scroll state, progress, burger, theme toggle ── */
  function initNav() {
    const nav = document.querySelector('.nav');
    const progress = document.getElementById('navProgress');
    const burger = document.getElementById('navBurger');
    const links = document.getElementById('navLinks');
    const toggle = document.getElementById('themeToggle');
    const toTop = document.getElementById('toTop');

    function onScroll() {
      const y = window.scrollY;
      if (nav) nav.classList.toggle('scrolled', y > 18);
      if (progress) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      }
      if (toTop) toTop.classList.toggle('show', y > 480);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger && links) {
      burger.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        burger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      });
      links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }));
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'night' ? 'day' : 'night';
        setTheme(next);
        toast(next === 'night'
          ? `🌙 <b>Midnight café</b> — Sam’s favourite hour`
          : `☀️ <b>Daylight bakery</b> — Rico’s wide awake`);
      });
    }

    if (toTop) toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ── Count-up (data-countup) ── */
  function initCountup() {
    const els = document.querySelectorAll('[data-countup]');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(el => el.textContent = el.dataset.countup);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = el.dataset.countup;
        const num = parseInt(target.replace(/\D/g, ''), 10);
        const suffix = target.replace(/[0-9]/g, '');
        if (isNaN(num)) { el.textContent = target; io.unobserve(el); return; }
        const dur = 1400; const start = performance.now();
        function step(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(num * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(el => io.observe(el));
  }

  /* ── Preloader dismiss ── */
  function dismissPreloader() {
    const pre = document.getElementById('preloader');
    if (!pre) return;
    const hide = () => { pre.classList.add('done'); setTimeout(() => pre.remove(), 700); };
    if (document.readyState === 'complete') setTimeout(hide, reduce ? 0 : 420);
    else window.addEventListener('load', () => setTimeout(hide, reduce ? 0 : 420));
  }

  /* ── Boot ── */
  function boot() {
    initReveal();
    initParallax();
    initMagnetic();
    initNav();
    initCountup();
    dismissPreloader();
  }

  if (document.getElementById('navLinks')) boot();
  else document.addEventListener('kb:chrome-ready', boot, { once: true });

  // Re-scan reveals if a page renders content async (e.g. menu)
  document.addEventListener('kb:content-rendered', () => { initReveal(); initParallax(); });
})();
