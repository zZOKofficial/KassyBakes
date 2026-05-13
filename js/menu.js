/* ========================================
   KASSY BAKES — Menu Tab Filter
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.menu-tab');
  const cats = document.querySelectorAll('.menu-category');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.cat;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show/hide categories
      cats.forEach(cat => {
        if (target === 'all' || cat.dataset.cat === target) {
          cat.classList.remove('hidden');
        } else {
          cat.classList.add('hidden');
        }
      });

      // Smooth scroll to first visible category
      const firstVisible = document.querySelector('.menu-category:not(.hidden)');
      if (firstVisible) {
        const offset = 160; // tabs bar + nav height
        const top = firstVisible.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
