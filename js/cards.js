/* ════════════════════════════════════════════════════════════════
   KASSY BAKES — SHARED PRODUCT CARD BUILDER
   One card template used by both the homepage featured grid and the
   full menu, so they never drift apart.
   ════════════════════════════════════════════════════════════════ */
window.KB_card = function (p, i) {
  const [a, b] = p.from;
  const delay = (i % 4) + 1;
  const orderUrl = `order.html?item=${encodeURIComponent(p.name)}&cat=${encodeURIComponent(p.cat)}`;
  return `
    <article class="pcard reveal" data-cat="${p.cat}" data-name="${p.name.toLowerCase()}" data-reveal-delay="${delay}">
      <div class="pcard-art" style="--a:${a};--b:${b}">
        <span class="pcard-emoji">${p.emoji}</span>
        <span class="chip chip-glass pcard-tag">${p.tag}</span>
      </div>
      <div class="pcard-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="pcard-foot">
          <span class="pcard-price">${p.price}</span>
          <a class="btn btn-primary btn-sm" href="${orderUrl}" aria-label="Order ${p.name}">Order</a>
        </div>
      </div>
    </article>`;
};
