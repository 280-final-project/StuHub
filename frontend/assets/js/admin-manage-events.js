import { injectLayout, setContent } from './app.js';

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const isAdmin = localStorage.getItem('isAdmin') === 'true';

if (!isLoggedIn || !isAdmin) {
  window.location.href = 'login.html';
}

const events = [
  {
    id: 1,
    title: 'Hackathon 2026',
    desc: 'Join us for a 24-hour coding challenge.',
    img: 'https://via.placeholder.com/160x110',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Career Fair',
    desc: 'Meet top companies hiring students.',
    img: 'https://via.placeholder.com/160x110',
    status: 'approved'
  },
  {
    id: 3,
    title: 'Music Fest',
    desc: 'Live performances on campus.',
    img: 'https://via.placeholder.com/160x110',
    status: 'rejected'
  }
];

function renderStats() {
  const statsRow = document.querySelector('.manage-stats');
  if (!statsRow) return;

  statsRow.innerHTML = `
    <div class="manage-stat-card">
      <span class="manage-stat-label">Pending</span>
      <span class="manage-stat-value">${events.filter(e => e.status === 'pending').length}</span>
    </div>
    <div class="manage-stat-card">
      <span class="manage-stat-label">Approved</span>
      <span class="manage-stat-value">${events.filter(e => e.status === 'approved').length}</span>
    </div>
    <div class="manage-stat-card">
      <span class="manage-stat-label">Rejected</span>
      <span class="manage-stat-value">${events.filter(e => e.status === 'rejected').length}</span>
    </div>
  `;
}

function renderCards(filter) {
  const container = document.getElementById('events-container');
  if (!container) return;

  const filtered = filter === 'all'
    ? events
    : events.filter((e) => e.status === filter);

  if (filtered.length === 0) {
    container.innerHTML = `<p class="empty">No events in this section.</p>`;
    return;
  }

  container.innerHTML = filtered.map((e) => `
    <div class="admin-event-card">
      <div class="admin-event-thumb">
        <img src="${e.img}" alt="${e.title}" />
      </div>

      <div class="admin-event-content">
        <h3>${e.title}</h3>
        <p>${e.desc}</p>

        <span class="status ${e.status}">${e.status}</span>

        ${
          e.status === 'pending'
            ? `
              <div class="actions">
                <button class="approve" data-id="${e.id}">Approve</button>
                <button class="reject" data-id="${e.id}">Reject</button>
              </div>
            `
            : ''
        }
      </div>
    </div>
  `).join('');
}

function getActiveFilter() {
  const active = document.querySelector('.tabs button.active');
  return active ? active.dataset.filter : 'all';
}

function init() {
  injectLayout('Manage Events');

  setContent(`
    <section class="container section manage-events-section">
      <div class="manage-header">
        <div class="manage-header-copy">
          <h1 class="page-title">Manage Events</h1>
          <p class="page-subtitle">Review and approve submitted events.</p>
        </div>

        <div class="manage-stats"></div>
      </div>

      <div class="tabs manage-tabs">
        <button data-filter="all" class="active">All</button>
        <button data-filter="pending">Pending</button>
        <button data-filter="approved">Approved</button>
        <button data-filter="rejected">Rejected</button>
      </div>

      <div id="events-container"></div>
    </section>
  `);

  renderStats();
  renderCards('all');

  document.querySelectorAll('.tabs button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tabs button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.filter);
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('approve')) {
      const id = Number(e.target.dataset.id);
      const event = events.find((item) => item.id === id);
      if (event) {
        event.status = 'approved';
        renderStats();
        renderCards(getActiveFilter());
      }
    }

    if (e.target.classList.contains('reject')) {
      const id = Number(e.target.dataset.id);
      const event = events.find((item) => item.id === id);
      if (event) {
        event.status = 'rejected';
        renderStats();
        renderCards(getActiveFilter());
      }
    }
  });
}

init();