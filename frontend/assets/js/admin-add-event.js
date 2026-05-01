import { injectLayout, setContent } from './app.js';

const BACKEND_URL = 'https://studenthub-backend-rpn0.onrender.com';
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const isAdmin = localStorage.getItem('isAdmin') === 'true';
const token = localStorage.getItem('token');

if (!isLoggedIn || !isAdmin) {
  window.location.href = 'login.html';
}

function init() {
  injectLayout('Admin');

  setContent(`
    <section class="container section">
      <div class="page-header">
        <h1 class="page-title">Add Event</h1>
        <p class="page-subtitle">Create and publish a new event directly to CampusHub.</p>
      </div>

      <form class="form-card admin-event-form" id="adminEventForm">
        <div class="form-group">
          <label for="eventTitle">Event Title</label>
          <input type="text" id="eventTitle" placeholder="Enter event title" required />
        </div>

        <div class="form-group">
          <label for="eventDate">Event Date</label>
          <input type="date" id="eventDate" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="startTime">Start Time</label>
            <input type="time" id="startTime" />
          </div>

          <div class="form-group">
            <label for="endTime">End Time</label>
            <input type="time" id="endTime" />
          </div>
        </div>

        <div class="form-group">
          <label for="eventLocation">Location</label>
          <input type="text" id="eventLocation" placeholder="Enter event location" required />
        </div>

        <div class="form-group">
          <label for="eventImage">Upload Image</label>
          <input type="file" id="eventImage" accept="image/png, image/jpeg" />
        </div>

        <div class="form-group">
          <label for="eventDetails">Event Details</label>
          <textarea id="eventDetails" placeholder="Write event details..." required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Publish Event</button>
      </form>
    </section>
  `);

  const form = document.getElementById('adminEventForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const eventDate = document.getElementById('eventDate').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    const timeframe = [
      eventDate,
      startTime && endTime ? `${startTime} - ${endTime}` : startTime
    ]
      .filter(Boolean)
      .join(' • ');

    const formData = new FormData();

    formData.append("item_name", document.getElementById('eventTitle').value.trim());
    formData.append("item_desc", document.getElementById('eventDetails').value.trim());
    formData.append("is_timed", startTime || endTime ? "true" : "false");
    formData.append("timeframe", timeframe);
    formData.append("loc_content", document.getElementById('eventLocation').value.trim());

    const file = document.getElementById("eventImage").files[0];
    if (file) {
      formData.append("image", file);
    }

    try {
      const res = await fetch(`${BACKEND_URL}/items`, {
        method: 'POST',
       headers: {
          Authorization: `Bearer ${token}`,
          'x-admin': 'true'
        },
        body: formData
      });

      const data = await res.json();
      console.log('ADD EVENT RESPONSE:', data);

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create event');
      }

      console.log('REDIRECTING NOW');
      //alert('Event published successfully.');
      window.location.href = 'confirmation.html';
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to create event');
    }
  });
}

init();