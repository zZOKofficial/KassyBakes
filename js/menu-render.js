/* ════════════════════════════════════════════════════════════════
   KASSY BAKES — MENU RENDERER
   Builds category filters + product cards from js/data.js.
   Features: filter chips, live search, result count, "order this" deep-link.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const grid = document.getElementById('menuGrid');
  const filterBar = document.getElementById('menuFilters');
  const search = document.getElementById('menuSearch');
  const count = document.getElementById('menuCount');
  if (!grid || typeof KB === 'undefined') return;

  let active = 'all';
  const cardHtml = window.KB_card;

  function render(list) {
    grid.innerHTML = list.map(cardHtml).join('') ||
      `<p class="menu-empty">No treats match that — but Rico says try a different search. 🐾</p>`;
    if (count) {
      const n = list.length;
      count.textContent = `${n} ${n === 1 ? 'treat' : 'treats'}`;
    }
    document.dispatchEvent(new CustomEvent('kb:content-rendered'));
  }

  function apply() {
    const q = (search && search.value.trim().toLowerCase()) || '';
    let list = KB.products;
    if (active !== 'all') list = list.filter(p => p.cat === active);
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q));
    render(list);
  }

  /* Build filter chips */
  if (filterBar) {
    const chips = [['all', 'All Treats', '🍽️'], ...KB.categories.map(c => [c.id, c.label, c.icon])];
    filterBar.innerHTML = chips.map(([id, label, icon], i) =>
      `<button class="filter-chip${i === 0 ? ' active' : ''}" data-filter="${id}">${icon} ${label}</button>`
    ).join('');
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-chip');
      if (!btn) return;
      active = btn.dataset.filter;
      filterBar.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c === btn));
      apply();
    });
  }

  if (search) search.addEventListener('input', apply);

  /* Initial render */
  render(KB.products);
})();
