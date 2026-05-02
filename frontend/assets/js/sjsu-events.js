import { injectLayout, setContent, escapeHTML } from './app.js';

const API_URL = "https://events.sjsu.edu/api/2/events";

async function init() {
  injectLayout('SJSU Events');

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const events = data.events || [];

    setContent(`
      <section class="container page-header">
        <h1 class="page-title">SJSU Official Events</h1>
        <p class="page-subtitle">Live from SJSU Events</p>
      </section>

      <section class="container section-tight">
        <div class="grid">
          ${events.slice(0, 20).map(event => `
            <div class="card">
              <h3>${escapeHTML(event.title)}</h3>
              <p>${escapeHTML(event.location || "No location")}</p>
              <p>${new Date(event.start).toLocaleString()}</p>
              <a href="${event.url}" target="_blank">View</a>
            </div>
          `).join("")}
        </div>
      </section>
    `);

  } catch (err) {
    console.error(err);
    setContent(`<p>Failed to load SJSU events</p>`);
  }
}

init();