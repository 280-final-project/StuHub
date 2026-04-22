import { injectLayout, setContent, fetchJSON, escapeHTML } from './app.js';

async function init() {
  injectLayout('Events');
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id') || 1);
  const events = await fetchJSON('./data/events.json');
  const event = events.find((item) => item.id === id) || events[0];

  setContent(`
    <section class="container page-header">
      <a class="back-link" href="events.html">← Back to Events</a>
      <div class="detail-hero">
        <img class="detail-image" src="${event.image}" alt="${escapeHTML(event.title)}">
        <div class="detail-panel">
          <h1>${escapeHTML(event.title)}</h1>
          <div class="meta">📅 <span>${escapeHTML(event.date)}</span></div>
          <div class="meta">🕒 <span>${escapeHTML(event.time)}</span></div>
          <div class="meta">📍 <span>${escapeHTML(event.location)}</span></div>
          <p style="margin-top:1.25rem;">${escapeHTML(event.description)}</p>
        </div>
      </div>
    </section>
    <section class="container section-tight">
      <h2 style="margin-top:0;">Location</h2>
      <iframe class="map-frame" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${event.mapEmbedUrl}"></iframe>
    </section>
  `);
}

init().catch(console.error);
