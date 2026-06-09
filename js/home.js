/* ════════════════════════════════════════════════════════════════
   KASSY BAKES — HOMEPAGE FEATURED GRID
   Renders featured products from data into #featuredGrid.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const grid = document.getElementById('featuredGrid');
  if (!grid || typeof KB === 'undefined' || !window.KB_card) return;
  grid.innerHTML = KB.featured().slice(0, 8).map(window.KB_card).join('');
  document.dispatchEvent(new CustomEvent('kb:content-rendered'));
})();
