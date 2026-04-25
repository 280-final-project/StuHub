import { injectLayout, setContent, escapeHTML } from './app.js';

async function init() {
  injectLayout('Events');

  const response = await fetch('https://studenthub-backend-rpn0.onrender.com/items');
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

              <div class="meta" style="display:flex; align-items:center; gap:8px;">
                <img
                  src="${event.pfp_url || 'https://via.placeholder.com/28'}"
                  alt="${escapeHTML(event.user_name || 'User')}"
                  style="width:28px; height:28px; border-radius:50%; object-fit:cover;"
                  onerror="this.src='https://via.placeholder.com/28'"
                />
                <span>Posted by ${escapeHTML(event.user_name || 'User')}</span>
              </div>

              <div class="meta">📅 <span>${escapeHTML(event.timeframe || 'TBA')}</span></div>
              <div class="meta">📍 <span>${escapeHTML(event.location || 'TBA')}</span></div>
            </div>
          </a>`).join('')}
      </div>
    </section>
  `);
}

init().catch(console.error);