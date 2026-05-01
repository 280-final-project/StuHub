import { injectLayout, setContent, escapeHTML } from './app.js';

const BACKEND_URL = 'https://studenthub-backend-rpn0.onrender.com';

async function init() {
  injectLayout('Events');

  const response = await fetch(`${BACKEND_URL}/items`);
  const events = await response.json();

  // console.log(events);

  // After backend is updated 
  // const approvedEvents = events.filter(
  //   (event) => event.status === 'approved'
  // );
const approvedEvents = events.filter(
  (event) =>
    event.status === 'approved' ||
    event.approval_status === 'approved'
);

  setContent(`
    <section class="container page-header">
      <h1 class="page-title">Events</h1>
      <p class="page-subtitle">Browse all upcoming events</p>
    </section>

    <section class="container section-tight">
      <div class="grid">
        ${
          approvedEvents.length === 0
            ? `
              <div class="info-card" style="grid-column: 1 / -1;">
                <h3>No approved events yet</h3>
                <p>Check back later for upcoming events.</p>
              </div>
            `
            : approvedEvents.map((event) => `
              <a class="card" href="event.html?id=${event.id}">
                <img
                  class="card-image"
                  src="${event.image || 'https://via.placeholder.com/400x200'}"
                  alt="${escapeHTML(event.title)}"
                >

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
              </a>
            `).join('')
        }
      </div>
    </section>
  `);
}

init().catch(console.error);