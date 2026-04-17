import { injectLayout, setContent, fetchJSON, renderModalShell, openModal, escapeHTML } from './app.js';

async function init() {
  injectLayout('Deals');
  renderModalShell();
  const deals = await fetchJSON('./data/deals.json');
  setContent(`
    <section class="container page-header">
      <h1 class="page-title">Deals & Discounts</h1>
      <p class="page-subtitle">Student savings and limited-time offers</p>
    </section>
    <section class="container section-tight">
      <div class="grid">
        ${deals.map((item) => `
          <button class="info-card" data-deal-id="${item.id}">
            ${item.isFeatured ? '<span class="badge featured">Featured</span>' : ''}
            <span class="icon-chip yellow">${item.icon}</span>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.offer)}</p>
          </button>`).join('')}
      </div>
    </section>
  `);

  document.querySelectorAll('[data-deal-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = deals.find((entry) => entry.id === Number(button.dataset.dealId));
      if (item) openModal(item);
    });
  });
}

init().catch(console.error);
