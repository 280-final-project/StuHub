import { injectLayout, setContent, fetchJSON, renderModalShell, openModal, escapeHTML } from './app.js';

async function init() {
  injectLayout('Resources');
  renderModalShell();
  const resources = await fetchJSON('./data/resources.json');
  setContent(`
    <section class="container page-header">
      <h1 class="page-title">Academic Resources</h1>
      <p class="page-subtitle">Find helpful student resources</p>
    </section>
    <section class="container section-tight">
      <div class="grid">
        ${resources.map((item) => `
          <button class="info-card" data-resource-id="${item.id}">
            <span class="icon-chip blue">${item.icon}</span>
            <h3>${escapeHTML(item.name)}</h3>
            <p>${escapeHTML(item.description)}</p>
          </button>`).join('')}
      </div>
    </section>
  `);

  document.querySelectorAll('[data-resource-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = resources.find((entry) => entry.id === Number(button.dataset.resourceId));
      if (item) openModal(item);
    });
  });
}

init().catch(console.error);
