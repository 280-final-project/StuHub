import { injectLayout, setContent } from './app.js';
import { SJSU_LOCATIONS } from './data/sjsu-locations.js';

const BACKEND_URL = 'https://studenthub-backend-rpn0.onrender.com';
const token = localStorage.getItem('token');
const isAdmin = localStorage.getItem('isAdmin') === 'true';

if (!token) {
  window.location.href = 'login.html';
}

function splitTimeframe(timeframe = '') {
  const [datePart = '', timePart = ''] = timeframe.split(' • ');
  let startTime = '';
  let endTime = '';

  if (timePart.includes(' - ')) {
    const parts = timePart.split(' - ');
    startTime = parts[0] || '';
    endTime = parts[1] || '';
  } else {
    startTime = timePart || '';
  }

  return {
    eventDate: datePart,
    startTime,
    endTime
  };
}

function splitLocation(location = '') {
  const match = location.match(/^(.*?)(?:,\s*Room\s*(.*))?$/i);

  return {
    building: match?.[1]?.trim() || '',
    room: match?.[2]?.trim() || ''
  };
}

function getLocationOptions(selectedBuilding = '') {
  return SJSU_LOCATIONS.map((location) => `
    <option value="${location}" ${location === selectedBuilding ? 'selected' : ''}>
      ${location}
    </option>
  `).join('');
}

async function loadPage() {
  injectLayout('Events');

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));

  if (!id) {
    setContent('<p>Invalid event ID.</p>');
    return;
  }

  const res = await fetch(`${BACKEND_URL}/items/${id}`);
  const event = await res.json();

  if (!res.ok || !event || event.error) {
    setContent('<p>Event not found.</p>');
    return;
  }

  const { eventDate, startTime, endTime } = splitTimeframe(event.timeframe);
  const { building, room } = splitLocation(event.location || '');

  setContent(`
    <section class="container page-header">
      <a class="back-link" href="event.html?id=${id}">← Back to Event</a>
      <h1 class="page-title">Edit Event</h1>
      <p class="page-subtitle">Update your event details</p>
    </section>

    <section class="container section-tight">
      <form class="form-card admin-event-form" id="editEventForm">
        <div class="form-group">
          <label for="eventTitle">Event Title</label>
          <input type="text" id="eventTitle" value="${event.title || ''}" required />
        </div>

        <div class="form-group">
          <label for="eventDate">Event Date</label>
          <input type="date" id="eventDate" value="${eventDate || ''}" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="startTime">Start Time</label>
            <input type="time" id="startTime" value="${startTime || ''}" />
          </div>

          <div class="form-group">
            <label for="endTime">End Time</label>
            <input type="time" id="endTime" value="${endTime || ''}" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="locationBuilding">Building</label>
            <select id="locationBuilding" required>
              <option value="">Select a building</option>
              ${getLocationOptions(building)}
            </select>
          </div>

          <div class="form-group">
            <label for="locationRoom">Room No.</label>
            <input
              type="text"
              id="locationRoom"
              placeholder="Enter room number"
              value="${room || ''}"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="eventImage">Event Image URL</label>
          <input type="url" id="eventImage" value="${event.image || ''}" />
        </div>

        <div class="form-group">
          <label for="eventDetails">Event Details</label>
          <textarea id="eventDetails" required>${event.description || ''}</textarea>
        </div>

        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button type="submit" class="btn btn-primary">Save Changes</button>
          <button type="button" class="btn" id="cancelEditBtn">Cancel</button>
        </div>
      </form>
    </section>
  `);

  document.getElementById('cancelEditBtn')?.addEventListener('click', () => {
    window.location.href = `event.html?id=${id}`;
  });

  document.getElementById('editEventForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const eventDateValue = document.getElementById('eventDate').value;
    const startTimeValue = document.getElementById('startTime').value;
    const endTimeValue = document.getElementById('endTime').value;
    const buildingValue = document.getElementById('locationBuilding').value;
    const roomValue = document.getElementById('locationRoom').value.trim();

    const timeframe = [
      eventDateValue,
      startTimeValue && endTimeValue
        ? `${startTimeValue} - ${endTimeValue}`
        : startTimeValue
    ]
      .filter(Boolean)
      .join(' • ');

    const location = roomValue
      ? `${buildingValue}, Room ${roomValue}`
      : buildingValue;

    const payload = {
      item_name: document.getElementById('eventTitle').value.trim(),
      item_desc: document.getElementById('eventDetails').value.trim(),
      timeframe,
      loc_content: location,
      img_url: document.getElementById('eventImage').value.trim() || null
    };

    try {
      const updateRes = await fetch(`${BACKEND_URL}/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-admin': isAdmin ? 'true' : 'false'
        },
        body: JSON.stringify(payload)
      });

      const data = await updateRes.json();

      if (!updateRes.ok) {
        throw new Error(data.error || 'Failed to update event');
      }

      window.location.href = `event.html?id=${id}`;
    } catch (err) {
      console.error(err);
    }
  });
}

loadPage().catch(console.error);