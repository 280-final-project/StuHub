import { injectLayout, setContent } from './app.js';

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const isAdmin = localStorage.getItem('isAdmin') === 'true';

if (!isLoggedIn || !isAdmin) {
  window.location.href = 'login.html';
}

function init() {
  injectLayout('Admin');

  setContent(`
    <div class="container section">
      <h1 class="page-title">Admin Dashboard</h1>
      <p class="page-subtitle">Manage CampusHub content</p>

      <div class="grid">
        <div class="info-card">
          <h3>Add Resource</h3>
          <p>Create new campus resource</p>
        </div>

        <div class="info-card">
          <h3>Add Event</h3>
          <p>Create new event</p>
        </div>

        <div class="info-card">
          <h3>Manage Items</h3>
          <p>Edit or delete existing data</p>
        </div>
      </div>
    </div>
  `);
}

init();