import { injectLayout, setContent } from './app.js';
import { SJSU_LOCATIONS } from './data/sjsu-locations.js';

// if (!requireLogin()) return;

const BACKEND_URL = 'https://studenthub-backend-rpn0.onrender.com';

function getLocationOptions() {
  return SJSU_LOCATIONS.map(
    (location) => `<option value="${location}">${location}</option>`
  ).join('');
}

function init() {
  injectLayout('Add Event');

  setContent(`
    <section class="container page-header">
      <h1 class="page-title">Add Event</h1>
      <p class="page-subtitle">Submit your event for review</p>
    </section>

    <section class="container section-tight">
      <form class="form-card" id="event-form">
        <div class="form-group">
          <label for="title">Event Title</label>
          <input id="title" name="title" type="text" placeholder="Enter event title" required>
        </div>

        <div class="form-group">
          <label for="eventDate">Event Date</label>
          <input id="eventDate" name="eventDate" type="date" required>
          <small class="error-text" id="event-date-error"></small>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="locationBuilding">Building</label>
            <select id="locationBuilding" name="locationBuilding" required>
              <option value="">Select a building</option>
              ${getLocationOptions()}
            </select>
          </div>

          <div class="form-group">
            <label for="locationRoom">Room No.</label>
            <input
              id="locationRoom"
              name="locationRoom"
              type="text"
              placeholder="Enter room number"
            >
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" name="description" placeholder="Enter event description" required></textarea>
        </div>

        <div class="form-group">
          <label for="imageUrl">Event Image URL</label>
          <input id="imageUrl" name="imageUrl" type="text" placeholder="Paste image URL">
        </div>

        <button class="btn btn-primary full-width" type="submit">Submit Event</button>
        <p class="form-note">Event will be visible after approval (may take up to 48 hours).</p>
      </form>
    </section>
  `);

  const eventDateInput = document.getElementById('eventDate');
  const eventDateError = document.getElementById('event-date-error');

  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 3);
  const minDateStr = minDate.toISOString().split('T')[0];

  eventDateInput.setAttribute('min', minDateStr);

  eventDateInput.addEventListener('change', () => {
    if (eventDateInput.value && eventDateInput.value < minDateStr) {
      eventDateError.textContent = 'Event date must be at least 3 days from today.';
      eventDateInput.classList.add('invalid');
    } else {
      eventDateError.textContent = '';
      eventDateInput.classList.remove('invalid');
    }
  });

  document.getElementById('event-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please log in with Google before submitting an event.');
      window.location.href = 'login.html';
      return;
    }

    const title = document.getElementById('title').value.trim();
    const eventDate = document.getElementById('eventDate').value;
    const building = document.getElementById('locationBuilding').value;
    const room = document.getElementById('locationRoom').value.trim();
    const description = document.getElementById('description').value.trim();
    const imageUrl = document.getElementById('imageUrl').value.trim();

    if (eventDate < minDateStr) {
      alert('Event date must be at least 3 days from today.');
      return;
    }

    const location = room ? `${building}, Room ${room}` : building;

    try {
      const response = await fetch(`${BACKEND_URL}/items/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          item_name: title,
          item_desc: description,
          is_timed: false,
          timeframe: eventDate,
          loc_content: location,
          img_url: imageUrl || null
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert(data.error || 'Failed to submit event');
        return;
      }

      window.location.href = 'confirmation.html';
    } catch (err) {
      console.error(err);
      alert('Failed to submit event');
    }
  });
}

init();