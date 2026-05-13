/* ========================================
   KASSY BAKES — Shared HTML Components
   ======================================== */

const NAV_HTML = `
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <a href="index.html" class="nav-logo" aria-label="Kassy Bakes home">
    <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Cat face logo mark -->
      <circle cx="19" cy="20" r="13" fill="#7B4A22"/>
      <!-- ears -->
      <polygon points="7,11 3,3 13,9" fill="#7B4A22"/>
      <polygon points="31,11 35,3 25,9" fill="#7B4A22"/>
      <polygon points="8,10 5,5 13,9" fill="#C8844A"/>
      <polygon points="30,10 33,5 25,9" fill="#C8844A"/>
      <!-- face -->
      <circle cx="14.5" cy="19" r="2.2" fill="#F5ECD7"/>
      <circle cx="23.5" cy="19" r="2.2" fill="#F5ECD7"/>
      <circle cx="15" cy="19.3" r="1.1" fill="#2C1A0E"/>
      <circle cx="24" cy="19.3" r="1.1" fill="#2C1A0E"/>
      <!-- nose -->
      <ellipse cx="19" cy="23" rx="1.3" ry="0.9" fill="#C8844A"/>
      <!-- mouth -->
      <path d="M17 24.5 Q19 26 21 24.5" stroke="#7B4A22" stroke-width="0.9" fill="none" stroke-linecap="round"/>
      <!-- whiskers -->
      <line x1="6" y1="22" x2="14" y2="23" stroke="#F5ECD7" stroke-width="0.8" opacity="0.7"/>
      <line x1="6" y1="24" x2="14" y2="23.8" stroke="#F5ECD7" stroke-width="0.8" opacity="0.7"/>
      <line x1="32" y1="22" x2="24" y2="23" stroke="#F5ECD7" stroke-width="0.8" opacity="0.7"/>
      <line x1="32" y1="24" x2="24" y2="23.8" stroke="#F5ECD7" stroke-width="0.8" opacity="0.7"/>
    </svg>
    Kassy Bakes
  </a>

  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>

  <ul class="nav-links" role="list">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="cats.html">The Cats</a></li>
    <li><a href="menu.html">Menu</a></li>
    <li><a href="gallery.html">Gallery</a></li>
    <li><a href="order.html" class="nav-order-btn">Order Now 🐾</a></li>
  </ul>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-logo">Kassy Bakes</div>
  <div class="footer-tagline">Handmade with love & a little cat chaos 🐾</div>

  <nav class="footer-links" aria-label="Footer navigation">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="cats.html">The Cats</a>
    <a href="menu.html">Menu</a>
    <a href="gallery.html">Gallery</a>
    <a href="order.html">Order</a>
  </nav>

  <div class="footer-social" aria-label="Social media links">
    <!-- Instagram -->
    <a href="#" aria-label="Instagram" target="_blank" rel="noopener">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    </a>
    <!-- Facebook -->
    <a href="#" aria-label="Facebook" target="_blank" rel="noopener">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    </a>
    <!-- WhatsApp -->
    <a href="#" aria-label="WhatsApp" target="_blank" rel="noopener">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    </a>
  </div>

  <hr class="footer-divider"/>
  <p class="footer-copy">© 2025 Kassy Bakes. All rights reserved.</p>
  <p class="footer-cats">Supervised by Rico &amp; Sam 🐱🐱</p>
</footer>

<button class="back-top" aria-label="Back to top">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
</button>
`;

// Inject into DOM
document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('nav-root');
  const footEl = document.getElementById('footer-root');
  if (navEl) navEl.innerHTML = NAV_HTML;
  if (footEl) footEl.innerHTML = FOOTER_HTML;
});
