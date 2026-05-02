import { injectLayout, setContent, escapeHTML } from './app.js';

const BACKEND_URL = 'https://studenthub-backend-rpn0.onrender.com';
const SJSU_EVENTS_API = 'https://events.sjsu.edu/api/2/events';

const DEFAULT_EVENT_IMAGE = '../assets/images/event-placeholder.png';
const SJSU_LOGO = '../assets/images/sjsu-logo.png';

function mapLocalEvent(event) {
  const eventId = event.id || event.item_id;

  return {
    source: 'local',
    id: eventId,
    title: event.title || event.item_name || 'Untitled Event',
    image: event.image || event.img_url || DEFAULT_EVENT_IMAGE,
    user_name: event.user_name || 'User',
    pfp_url: event.pfp_url || '',
    timeframe: event.timeframe || 'TBA',
    location: event.location || event.loc_content || 'TBA',
    href: `event.html?id=${eventId}`
  };
}

function mapSjsuEvent(wrapper) {
  const event = wrapper.event || wrapper;

  const title = event.title || 'SJSU Event';

  // ✅ REAL DATE FIX
  const start =
    event.event_instances?.[0]?.start ||
    event.first_date ||
    '';

  const image =
    event.photo_url ||
    DEFAULT_EVENT_IMAGE;

  const location =
    event.location_name ||
    event.room_number ||
    event.geo?.street ||
    'SJSU Campus';

  const detailUrl = event.url || 'https://events.sjsu.edu/';

  const externalId = event.id || title;

  return {
    source: 'sjsu',
    id: `sjsu-${externalId}`,
    title,
    image,
    user_name: 'SJSU',
    pfp_url: SJSU_LOGO,
    timeframe: start || 'TBA',
    location,
    href: `event.html?source=sjsu&url=${encodeURIComponent(detailUrl)}&title=${encodeURIComponent(title)}&time=${encodeURIComponent(start || 'TBA')}&location=${encodeURIComponent(location)}&image=${encodeURIComponent(image)}`
  };
}

async function fetchLocalEvents() {
  const response = await fetch(`${BACKEND_URL}/items`);
  const events = await response.json();

  const approvedEvents = events.filter(
    (event) =>
      event.status === 'approved' ||
      event.approval_status === 'approved'
  );

  return approvedEvents.map(mapLocalEvent);
}

async function fetchSjsuEvents() {
  try {
    const response = await fetch(SJSU_EVENTS_API);
    const data = await response.json();

    const rawEvents = data.events || data || [];

    return rawEvents.map(mapSjsuEvent);
  } catch (err) {
    console.error('Failed to fetch SJSU events:', err);
    return [];
  }
}

function renderEventCard(event) {
  return `
    <a class="card" href="${event.href}">
      <img
        class="card-image"
        src="${event.image}"
        alt="${escapeHTML(event.title)}"
        onerror="this.src='${DEFAULT_EVENT_IMAGE}'"
      >

      <div class="card-body">
        <h3>${escapeHTML(event.title)}</h3>

        <div class="meta" style="display:flex; align-items:center; gap:8px;">
          ${
            event.pfp_url
              ? `
                <img
                  src="${event.pfp_url}"
                  alt="${escapeHTML(event.user_name)}"
                  style="width:28px; height:28px; border-radius:50%; object-fit:cover;"
                  onerror="this.remove()"
                />
              `
              : ''
          }
          <span>Posted by ${escapeHTML(event.user_name)}</span>
        </div>

        <div class="meta">📅 <span>${escapeHTML(event.timeframe)}</span></div>
        <div class="meta">📍 <span>${escapeHTML(event.location)}</span></div>

        <div class="meta">
          <span style="font-weight:600;">
            ${event.source === 'sjsu' ? 'Official SJSU Event' : 'CampusHub Event'}
          </span>
        </div>
      </div>
    </a>
  `;
}

async function init() {
  injectLayout('Events');

  const [localEvents, sjsuEvents] = await Promise.all([
    fetchLocalEvents(),
    fetchSjsuEvents()
  ]);

  const allEvents = [...localEvents, ...sjsuEvents];

  setContent(`
    <section class="container page-header">
      <h1 class="page-title">Events</h1>
      <p class="page-subtitle">Browse campus and official SJSU events</p>
    </section>

    <section class="container section-tight">
      <div class="grid">
        ${
          allEvents.length === 0
            ? `
              <div class="info-card" style="grid-column: 1 / -1;">
                <h3>No events yet</h3>
                <p>Check back later for upcoming events.</p>
              </div>
            `
            : allEvents.map(renderEventCard).join('')
        }
      </div>
    </section>
  `);
}

init().catch(console.error);