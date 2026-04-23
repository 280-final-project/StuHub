import { injectLayout, setContent, escapeHTML } from './app.js';

async function init() {
  injectLayout('Events');

  const response = await fetch('http://localhost:5000/items');
  const events = await response.json();

  setContent(`
    <section class="container page-header">
      <h1 class="page-title">Events</h1>
      <p class="page-subtitle">Browse all upcoming events</p>
    </section>
    <section class="container section-tight">
      <div class="grid">
        ${events.map((event) => `
          <a class="card" href="event.html?id=${event.id}">
            <img class="card-image" src="${event.image || 'https://via.placeholder.com/400x200'}" alt="${escapeHTML(event.title)}">
            <div class="card-body">
              <h3>${escapeHTML(event.title)}</h3>
              <div class="meta">📅 <span>${escapeHTML(event.timeframe || 'TBA')}</span></div>
              <div class="meta">📍 <span>${escapeHTML(event.location || 'TBA')}</span></div>
            </div>
          </a>`).join('')}
      </div>
    </section>
  `);
}

init().catch(console.error);