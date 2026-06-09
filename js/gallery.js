/* ════════════════════════════════════════════════════════════════
   KASSY BAKES — GALLERY RENDERER
   Builds a masonry of stylised dessert "photo" tiles (gradient + emoji
   + caption) at varied heights. Decorative — no real photography needed,
   but trivially swappable for <img> tiles later.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  // [emoji, caption, [c1,c2], heightUnits]
  const tiles = [
    ['🍫', 'Ganache, mid-pour', ['#3D2208', '#1A0E08'], 1.3],
    ['🧁', 'Buttercream swirls', ['#F5ECD7', '#D4A843'], 1.0],
    ['🍓', 'Fresh strawberry layers', ['#8B2635', '#B5384A'], 1.15],
    ['☕', 'Coffee & cocoa, golden hour', ['#4A2C17', '#A0622A'], 1.0],
    ['🎀', 'Gift-ready & ribboned', ['#C8844A', '#EDD9B4'], 1.25],
    ['🍪', 'Biscoff crumble close-up', ['#A0622A', '#D4A843'], 0.95],
    ['🥛', 'Tres leches, soaked soft', ['#EDD9B4', '#D9C49A'], 1.1],
    ['🐱', 'Sam, supervising packaging', ['#1A0E08', '#3D2208'], 1.35],
    ['🍮', 'Caramel drizzle, slow', ['#D4A843', '#C4732A'], 1.0],
    ['🎂', 'Candles, just lit', ['#5C3317', '#7B4A22'], 1.2],
    ['🍰', 'A clean cross-section', ['#8B2635', '#F5ECD7'], 1.0],
    ['🐾', 'Rico “inspecting” brownies', ['#C8844A', '#A0622A'], 1.15],
  ];

  function tileSvg([emoji, cap, [a, b], h]) {
    const H = Math.round(220 * h);
    return `
      <figure class="tile reveal">
        <svg viewBox="0 0 300 ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${cap}">
          <defs><radialGradient id="g${cap.length}${H}" cx="30%" cy="20%" r="90%">
            <stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/>
          </radialGradient></defs>
          <rect width="300" height="${H}" fill="url(#g${cap.length}${H})"/>
          <text x="150" y="${H / 2 + 18}" font-size="56" text-anchor="middle" opacity="0.95">${emoji}</text>
          <circle cx="58" cy="46" r="26" fill="#fff" opacity="0.05"/>
          <circle cx="248" cy="${H - 50}" r="40" fill="#000" opacity="0.06"/>
        </svg>
        <figcaption class="tile-cap">${cap}</figcaption>
      </figure>`;
  }

  grid.innerHTML = tiles.map(tileSvg).join('');
  document.dispatchEvent(new CustomEvent('kb:content-rendered'));
})();
