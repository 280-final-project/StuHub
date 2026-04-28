import { injectLayout, setContent } from './app.js';

const BACKEND_URL = 'https://studenthub-backend-rpn0.onrender.com';
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const isAdmin = localStorage.getItem('isAdmin') === 'true';
const token = localStorage.getItem('token');

if (!isLoggedIn || !isAdmin) {
  window.location.href = 'login.html';
}

let events = [];

async function fetchEvents() {
    
  const res = await fetch(`${BACKEND_URL}/items/admin/all`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(data.error || 'Failed to load events');
  }

  events = data;
}

function renderStats() {
  const statsRow = document.querySelector('.manage-stats');
  if (!statsRow) return;

  statsRow.innerHTML = `
    <div class="manage-stat-card">
      <span class="manage-stat-label">Pending</span>
      <span class="manage-stat-value">${events.filter(e => e.approval_status === 'pending').length}</span>
    </div>
    <div class="manage-stat-card">
      <span class="manage-stat-label">Approved</span>
      <span class="manage-stat-value">${events.filter(e => e.approval_status === 'approved').length}</span>
    </div>
    <div class="manage-stat-card">
      <span class="manage-stat-label">Rejected</span>
      <span class="manage-stat-value">${events.filter(e => e.approval_status === 'rejected').length}</span>
    </div>
  `;
}

function renderCards(filter) {
  const container = document.getElementById('events-container');
  if (!container) return;

  const filtered = filter === 'all'
    ? events
    : events.filter((e) => e.approval_status === filter);

  if (filtered.length === 0) {
    container.innerHTML = `<p class="empty">No events in this section.</p>`;
    return;
  }

  container.innerHTML = filtered.map((e) => `
    <div class="admin-event-card">
      <div class="admin-event-thumb">
        <img src="${e.image || 'https://via.placeholder.com/160x110'}" alt="${e.title}" />
      </div>
      <div class="admin-event-content">
        <h3>${e.title}</h3>
        <p>${e.description || ''}</p>
        <span class="status ${e.approval_status}">${e.approval_status}</span>
        ${
          e.approval_status === 'pending'
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

async function updateStatus(id, status) {
  const res = await fetch(`${BACKEND_URL}/items/${id}/approval`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      approval_status: status
    })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to update event');
  }

  await fetchEvents();
  renderStats();
  renderCards(getActiveFilter());
}

async function init() {
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

  await fetchEvents();
  renderStats();
  renderCards('all');

  document.querySelectorAll('.tabs button').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tabs button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.filter);
    });
  });

  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('approve')) {
      try {
        await updateStatus(Number(e.target.dataset.id), 'approved');
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to approve event');
      }
    }

    if (e.target.classList.contains('reject')) {
      try {
        await updateStatus(Number(e.target.dataset.id), 'rejected');
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to reject event');
      }
    }
  });
}

init().catch((err) => {
  console.error(err);
  alert(err.message || 'Failed to load manage events page');
});