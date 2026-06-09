/* ════════════════════════════════════════════════════════════════
   KASSY BAKES — ORDER FLOW
   Populates the category select from data, prefills from ?item= deep-links,
   shows a live order summary, and composes a WhatsApp message on submit.
   No backend — Website → WhatsApp → owner, per the brand brief.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const form = document.getElementById('orderForm');
  if (!form || typeof KB === 'undefined') return;

  const $ = (id) => document.getElementById(id);
  const productSel = $('of-product');
  const flavour = $('of-flavour');
  const summary = $('orderSummary');

  /* Build the product dropdown grouped by category */
  if (productSel) {
    const groups = KB.categories.map(c => {
      const opts = KB.byCategory(c.id)
        .map(p => `<option value="${p.name}">${p.name}</option>`).join('');
      return `<optgroup label="${c.icon} ${c.label}">${opts}</optgroup>`;
    }).join('');
    productSel.insertAdjacentHTML('beforeend', groups +
      `<option value="Not sure yet — need help!">🤔 Not sure yet — need help!</option>`);
  }

  /* Prefill from deep-link (?item=Name) */
  const params = new URLSearchParams(location.search);
  const wantItem = params.get('item');
  if (wantItem && productSel) {
    const match = [...productSel.options].find(o => o.value === wantItem);
    if (match) {
      productSel.value = wantItem;
      const prod = KB.products.find(p => p.name === wantItem);
      if (prod && flavour && !flavour.value) flavour.placeholder = `e.g. ${prod.tag}`;
      if (window.KB_toast) window.KB_toast(`🎂 Pre-filled <b>${wantItem}</b> for you`);
    }
  }

  /* Live summary */
  function fields() {
    return {
      name: $('of-name')?.value.trim() || '',
      product: productSel?.value || '',
      flavour: flavour?.value.trim() || '',
      size: $('of-size')?.value.trim() || '',
      date: $('of-date')?.value || '',
      message: $('of-message')?.value.trim() || '',
    };
  }

  function updateSummary() {
    if (!summary) return;
    const f = fields();
    const rows = [];
    if (f.product) rows.push(['Treat', f.product]);
    if (f.flavour) rows.push(['Flavour', f.flavour]);
    if (f.size) rows.push(['Size / Qty', f.size]);
    if (f.date) rows.push(['Needed by', f.date]);
    summary.innerHTML = rows.length
      ? rows.map(([k, v]) => `<div class="sum-row"><span>${k}</span><strong>${v}</strong></div>`).join('')
      : `<p class="sum-empty">Your order summary will appear here as you fill it in. ✨</p>`;
  }
  form.addEventListener('input', updateSummary);
  form.addEventListener('change', updateSummary);
  updateSummary();

  /* Submit → WhatsApp */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = fields();
    const lines = [
      'Hi Kassy Bakes! 🐾 I’d like to place an order:',
      '',
      `• Name: ${f.name}`,
      `• Treat: ${f.product}`,
    ];
    if (f.flavour) lines.push(`• Flavour: ${f.flavour}`);
    if (f.size) lines.push(`• Size/Qty: ${f.size}`);
    if (f.date) lines.push(`• Needed by: ${f.date}`);
    if (f.message) lines.push(`• Notes: ${f.message}`);
    lines.push('', 'Could you share the price & availability? Thank you! 🍰');

    const url = `https://wa.me/${KB.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
    if (window.KB_toast) window.KB_toast('💬 Opening WhatsApp with your order…');
    window.open(url, '_blank', 'noopener');
  });
})();
