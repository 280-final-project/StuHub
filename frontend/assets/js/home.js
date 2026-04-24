import { injectLayout, setContent, fetchJSON, renderModalShell, openModal, escapeHTML, setupCarousel } from './app.js';

//import { injectLayout, setContent, requireLogin } from './app.js';

//if (!requireLogin()) return;

function eventCard(event) {
  return `
    <a class="card" href="event.html?id=${event.id}">
      <img class="card-image" src="${event.image}" alt="${escapeHTML(event.title)}">
      <div class="card-body">
        <h3>${escapeHTML(event.title)}</h3>
        <div class="meta">📅 <span>${escapeHTML(event.date)}</span></div>
        <div class="meta">🕒 <span>${escapeHTML(event.time)}</span></div>
      </div>
    </a>`;
}

function infoCard(item, tone) {
  const title = item.name || item.title;
  const description = item.description || item.offer;
  const toneClass = tone === 'yellow' ? 'yellow' : 'blue';
  return `
    <button class="info-card" data-modal-id="${item.id}" data-type="${tone}">
      ${item.isFeatured ? '<span class="badge featured">Featured</span>' : ''}
      <span class="icon-chip ${toneClass}">${item.icon || (tone === 'yellow' ? '🏷️' : '📘')}</span>
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(description)}</p>
    </button>`;
}

async function init() {
  injectLayout('Home');
  renderModalShell();
  const [events, resources, deals] = await Promise.all([
    fetchJSON('./data/events.json'),
    fetchJSON('./data/resources.json'),
    fetchJSON('./data/deals.json')
  ]);

  setContent(`
    <section class="container section-tight"><div class="hero-copy lead">Discover events, resources, and exclusive deals for university students</div></section>
    <section class="container section">
      <div class="section-head"><h2>Featured Events</h2></div>
        <div class="carousel-section">
        <button class="carousel-btn left hidden" aria-label="Scroll left">&#10094;</button>
        <div class="carousel-track" id="events-row">${events.filter((e) => e.featured).map(eventCard).join('')}</div>
        <button class="carousel-btn right" aria-label="Scroll right">&#10095;</button>
        </div>
    </section>
    <section class="container section">
      <div class="section-head"><h2>Academic Resources</h2></div>
      <div class="carousel-section">
      <button class="carousel-btn left hidden" aria-label="Scroll left">&#10094;</button>
      <div class="carousel-track" id="resources-row">${resources.map((item) => infoCard(item, 'blue')).join('')}</div>
      <button class="carousel-btn right" aria-label="Scroll right">&#10095;</button>
      </div>
    </section>
    <section class="container section">
      <div class="section-head"><h2>Deals & Discounts</h2></div>
      <div class="carousel-section">
        <button class="carousel-btn left hidden" aria-label="Scroll left">&#10094;</button>
      <div class="carousel-track" id="deals-row">${deals.map((item) => infoCard(item, 'yellow')).join('')}</div>
          <button class="carousel-btn right" aria-label="Scroll right">&#10095;</button>
      </div>
    </section>
  `);

  setupCarousel('events-row');
  setupCarousel('resources-row');
  setupCarousel('deals-row');

  document.querySelectorAll('[data-modal-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.modalId);
      const type = button.dataset.type;
      const pool = type === 'yellow' ? deals : resources;
      const selected = pool.find((entry) => entry.id === id);
      if (selected) openModal(selected);
    });
  });
}

init().catch(console.error);
