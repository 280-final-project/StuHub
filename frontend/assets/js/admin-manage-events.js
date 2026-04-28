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
      <div class="actions" style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
        <button
          class="approve"
          data-id="${e.id}"
          style="padding:10px 16px; border:none; border-radius:10px; cursor:pointer; background:#2563eb; color:white; font-weight:600;"
        >
          Approve
        </button>
        <button
          class="reject"
          data-id="${e.id}"
          style="padding:10px 16px; border:none; border-radius:10px; cursor:pointer; background:#dc2626; color:white; font-weight:600;"
        >
          Reject
        </button>
      </div>
    `
    : e.approval_status === 'rejected'
      ? `
        <div class="actions" style="display:flex; gap:10px; margin-top:12px; flex-wrap:wrap;">
          <button
            class="restore"
            data-id="${e.id}"
            style="padding:10px 16px; border:none; border-radius:10px; cursor:pointer; background:#2563eb; color:white; font-weight:600;"
          >
            Restore
          </button>
          <button
            class="delete-forever"
            data-id="${e.id}"
            style="padding:10px 16px; border:none; border-radius:10px; cursor:pointer; background:#dc2626; color:white; font-weight:600;"
          >
            Delete Permanently
          </button>
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

async function deleteEvent(id) {
  const res = await fetch(`${BACKEND_URL}/items/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-admin': 'true'
    }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to delete event');
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
          <p class="page-subtitle">Review, restore, and manage submitted events.</p>
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

    if (e.target.classList.contains('restore')) {
      try {
        await updateStatus(Number(e.target.dataset.id), 'approved');
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to restore event');
      }
    }

    if (e.target.classList.contains('delete-forever')) {
    showDeleteModal(Number(e.target.dataset.id));
}
  });
}

function showDeleteModal(id) {
  const existingModal = document.getElementById('adminDeleteModal');
  if (existingModal) existingModal.remove();

  document.body.insertAdjacentHTML('beforeend', `
    <div
      id="adminDeleteModal"
      style="
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      "
    >
      <div
        style="
          background: white;
          width: min(90%, 430px);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        "
      >
        <h2 style="margin:0 0 10px 0;">Delete Event Permanently</h2>
        <p style="margin:0 0 18px 0; line-height:1.5;">
          Are you sure you want to permanently delete this event? This cannot be undone.
        </p>

        <div style="display:flex; justify-content:flex-end; gap:12px;">
          <button
            id="cancelAdminDeleteBtn"
            type="button"
            style="
              padding:10px 16px;
              border:1px solid #d1d5db;
              border-radius:10px;
              background:white;
              cursor:pointer;
              font-weight:600;
            "
          >
            Cancel
          </button>

          <button
            id="confirmAdminDeleteBtn"
            type="button"
            style="
              padding:10px 16px;
              border:none;
              border-radius:10px;
              background:#dc2626;
              color:white;
              cursor:pointer;
              font-weight:600;
            "
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  `);

  const modal = document.getElementById('adminDeleteModal');
  const cancelBtn = document.getElementById('cancelAdminDeleteBtn');
  const confirmBtn = document.getElementById('confirmAdminDeleteBtn');

  const closeModal = () => {
    modal?.remove();
  };

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  cancelBtn?.addEventListener('click', closeModal);

  confirmBtn?.addEventListener('click', async () => {
    try {
      await deleteEvent(id);
      closeModal();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to permanently delete event');
    }
  });
}

init().catch((err) => {
  console.error(err);
  alert(err.message || 'Failed to load manage events page');
});