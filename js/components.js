/* ════════════════════════════════════════════════════════════════
   KASSY BAKES — SHARED COMPONENTS
   Injects: preloader, nav (theme toggle + scroll progress), footer,
   toast host, back-to-top. Sets the active nav link automatically.
   Theme is applied pre-paint by an inline <head> script to avoid FOUC.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* Cat-face logo mark — redrawn to match the doodle Rico/Sam art:
     pointed ears w/ rose inner, happy closed eyes, tiger forehead stripes,
     whiskers. Theme-adaptive via brand CSS vars; dependency-free. */
  const LOGO = `
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M8.5 13.5 L11.5 4 L16.5 11 Z" fill="var(--c-walnut)"/>
      <path d="M31.5 13.5 L28.5 4 L23.5 11 Z" fill="var(--c-walnut)"/>
      <path d="M11 12 L12.4 6 L15 10.6 Z" fill="#E3A39B"/>
      <path d="M29 12 L27.6 6 L25 10.6 Z" fill="#E3A39B"/>
      <circle cx="20" cy="21" r="13" fill="var(--c-honey)"/>
      <path d="M20 8.6 Q20 11 20 13 M16.6 10 Q17.1 12 16.8 13.6 M23.4 10 Q22.9 12 23.2 13.6" stroke="var(--c-cocoa)" stroke-width="0.9" fill="none" stroke-linecap="round" opacity="0.75"/>
      <path d="M11.2 20.6 Q14.8 23.6 18.4 20.6" stroke="var(--c-cocoa)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M21.6 20.6 Q25.2 23.6 28.8 20.6" stroke="var(--c-cocoa)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M18.7 23.9 L21.3 23.9 L20 25.5 Z" fill="var(--c-walnut)"/>
      <path d="M20 25.5 L20 26.4 M20 26.4 Q18.8 27.3 17.9 26.6 M20 26.4 Q21.2 27.3 22.1 26.6" stroke="var(--c-walnut)" stroke-width="0.9" fill="none" stroke-linecap="round"/>
      <path d="M6.5 21.8 L13 22.6 M6.5 24.6 L13 23.8" stroke="var(--c-cream)" stroke-width="0.9" opacity="0.7" stroke-linecap="round"/>
      <path d="M33.5 21.8 L27 22.6 M33.5 24.6 L27 23.8" stroke="var(--c-cream)" stroke-width="0.9" opacity="0.7" stroke-linecap="round"/>
    </svg>`;

  const NAV_LINKS = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['cats.html', 'The Cats'],
    ['menu.html', 'Menu'],
    ['gallery.html', 'Gallery'],
  ];

  const ICON = {
    sun:  `<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/></svg>`,
    moon: `<svg class="i-moon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
    ig:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    fb:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    wa:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    up:   `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  };

  const page = (location.pathname.split('/').pop() || 'index.html');

  const navLinksHtml = NAV_LINKS.map(([href, label]) => {
    const current = (href === page || (page === '' && href === 'index.html')) ? ' aria-current="page"' : '';
    return `<li><a href="${href}"${current}>${label}</a></li>`;
  }).join('');

  const social = (cls = 'footer-social') => `
    <div class="${cls}">
      <a href="${KB.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
      <a href="${KB.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a>
      <a href="https://wa.me/${KB.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.wa}</a>
    </div>`;

  const NAV_HTML = `
    <nav class="nav" role="navigation" aria-label="Main">
      <div class="nav-inner">
        <a href="index.html" class="brand" aria-label="Kassy Bakes — home">${LOGO}<span>Kassy <b>Bakes</b></span></a>
        <ul class="nav-links" id="navLinks" role="list">
          ${navLinksHtml}
          <li class="nav-cta-mobile"><a href="order.html" class="btn btn-primary btn-sm">Order Now 🐾</a></li>
        </ul>
        <div class="nav-actions">
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle day / night theme" title="Toggle Rico’s day ⇄ Sam’s night">${ICON.sun}${ICON.moon}</button>
          <a href="order.html" class="btn btn-primary nav-cta nav-cta-desktop">Order 🐾</a>
          <button class="nav-burger" id="navBurger" aria-label="Menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
        </div>
      </div>
      <div class="nav-progress" id="navProgress"></div>
    </nav>`;

  const year = 2025; // brand established
  const FOOTER_HTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="display">Kassy Bakes</div>
            <p>Handmade desserts with a little cat chaos. Baked fresh to order, supervised by Rico &amp; Sam.</p>
            ${social()}
            <div class="sam-scene sam-rim-on" style="max-width:150px;margin:1.6rem 0 0" aria-hidden="true">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 56 Q81 38 90 34 Q99 45 106 56 Z" fill="#1A0E08"/>
                <path d="M132 56 Q131 38 122 34 Q113 45 106 56 Z" fill="#1A0E08"/>
                <path d="M66 92 C 66 68 86 50 106 50 C 126 50 146 68 146 92 C 146 116 126 130 106 131 C 86 130 66 116 66 92 Z" fill="#1A0E08"/>
                <path d="M84.1 53.5 L90.7 39 L101.2 53.5 Z" fill="#E3A39B"/>
                <path d="M127.9 53.5 L121.3 39 L110.8 53.5 Z" fill="#E3A39B"/>
                <path d="M76 92 Q90 104 104 92" stroke="#F4C84A" stroke-width="6" fill="none" stroke-linecap="round"/>
                <path d="M108 92 Q122 104 136 92" stroke="#F4C84A" stroke-width="6" fill="none" stroke-linecap="round"/>
                <path d="M100 104 L112 104 L106 110 Z" fill="#6B3F1E"/>
                <path d="M106 110 L106 115 M106 115 Q100 120 96 116 M106 115 Q112 120 116 116" stroke="#F7EFDD" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M94 109 L62 105" stroke="#F7EFDD" stroke-width="1.7" opacity="0.85" stroke-linecap="round"/>
                <path d="M94 113 L62 116" stroke="#F7EFDD" stroke-width="1.7" opacity="0.85" stroke-linecap="round"/>
                <path d="M118 109 L150 105" stroke="#F7EFDD" stroke-width="1.7" opacity="0.85" stroke-linecap="round"/>
                <path d="M118 113 L150 116" stroke="#F7EFDD" stroke-width="1.7" opacity="0.85" stroke-linecap="round"/>
                <path d="M106 170 C 92 158 78 150 78 140 C 78 132 86 128 94 130 C 100 131 104 135 106 140 C 108 135 112 131 118 130 C 126 128 134 132 134 140 C 134 150 120 158 106 170 Z" fill="#F7EFDD" stroke="#1A0E08" stroke-width="3"/>
                <ellipse cx="82" cy="146" rx="14" ry="11" fill="#1A0E08"/>
                <ellipse cx="130" cy="146" rx="14" ry="11" fill="#1A0E08"/>
                <path d="M77 140 L77 148 M86 140 L86 148" stroke="#F7EFDD" stroke-width="1.6" opacity="0.7" stroke-linecap="round"/>
                <path d="M125 140 L125 148 M134 140 L134 148" stroke="#F7EFDD" stroke-width="1.6" opacity="0.7" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <a href="index.html">Home</a>
            <a href="about.html">Our Story</a>
            <a href="cats.html">The Cats</a>
            <a href="menu.html">Full Menu</a>
            <a href="gallery.html">Gallery</a>
          </div>
          <div class="footer-col">
            <h4>Order &amp; Visit</h4>
            <a href="order.html">Place an Order</a>
            <a href="https://wa.me/${KB.whatsapp}" target="_blank" rel="noopener">WhatsApp Us</a>
            <a href="${KB.instagram}" target="_blank" rel="noopener">Instagram</a>
            <li>Delivery city-wide</li>
            <li>Reply daily · 10am–9pm</li>
          </div>
        </div>
        <div class="footer-base">
          <span>© ${year} Kassy Bakes · Made with love &amp; flour</span>
          <span>Supervised by Rico &amp; Sam 🐱🐱</span>
        </div>
      </div>
    </footer>`;

  const PRELOADER_HTML = `
    <div class="preloader" id="preloader" role="status" aria-live="polite">
      <div class="preloader-inner">
        ${LOGO.replace('viewBox="0 0 40 40"', 'viewBox="0 0 40 40" class="anim-float"')}
        <div class="preloader-bar"><i></i></div>
        <p>Warming the oven…</p>
      </div>
    </div>`;

  const TOTOP_HTML = `<button class="to-top" id="toTop" aria-label="Back to top">${ICON.up}</button>`;
  const TOAST_HTML = `<div class="toast-host" id="toastHost" aria-live="polite" aria-atomic="true"></div>`;

  /* ── Inject ── */
  function mount(id, html, where = 'afterbegin') {
    const el = document.getElementById(id);
    if (el) { el.innerHTML = html; return el; }
    return null;
  }

  // Preloader goes first, directly in <body>
  document.body.insertAdjacentHTML('afterbegin', PRELOADER_HTML);

  document.addEventListener('DOMContentLoaded', () => {
    mount('nav-root', NAV_HTML);
    mount('footer-root', FOOTER_HTML);
    document.body.insertAdjacentHTML('beforeend', TOTOP_HTML + TOAST_HTML);
    // Signal to ui.js that chrome is ready
    document.dispatchEvent(new CustomEvent('kb:chrome-ready'));
  });

  // Expose icons/logo for other scripts if needed
  window.KB_UI = { ICON, LOGO, social };
})();
