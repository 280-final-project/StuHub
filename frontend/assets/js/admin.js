import { injectLayout, setContent } from './app.js';

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const isAdmin = localStorage.getItem('isAdmin') === 'true';

if (!isLoggedIn || !isAdmin) {
  window.location.href = 'login.html';
}

function init() {
  injectLayout('Admin');

  setContent(`
    <section class="container section">
      <div class="page-header">
        <h1 class="page-title">Admin Dashboard</h1>
        <p class="page-subtitle">Manage CampusHub content and review event submissions.</p>
      </div>

      <div class="admin-grid">
        <a class="info-card admin-card" href="admin-add-event.html">
          <div class="icon-chip blue">📅</div>
          <h3>Add Event</h3>
          <p>Create and publish an event directly from the admin dashboard.</p>
        </a>

        <a class="info-card admin-card" href="admin-manage-events.html">
          <div class="icon-chip blue">🛠️</div>
          <h3>Manage Events</h3>
          <p>Review pending event requests and track approved or rejected events.</p>
        </a>

        <a class="info-card admin-card" href="events.html">
          <div class="icon-chip blue">👀</div>
          <h3>View Public Events</h3>
          <p>Open the public Events page and see what students see.</p>
        </a>
      </div>
    </section>
  `);
}

init();