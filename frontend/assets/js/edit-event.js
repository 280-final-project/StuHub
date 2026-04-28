import { injectLayout, setContent } from './app.js';

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

  setContent(`
    <section class="container page-header">
      <a class="back-link" href="event-detail.html?id=${id}">← Back to Event</a>
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

        <div class="form-group">
          <label for="eventLocation">Location</label>
          <input type="text" id="eventLocation" value="${event.location || ''}" required />
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
    window.location.href = `event-detail.html?id=${id}`;
  });

  document.getElementById('editEventForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const eventDate = document.getElementById('eventDate').value;
    const startTimeValue = document.getElementById('startTime').value;
    const endTimeValue = document.getElementById('endTime').value;

    const timeframe = [
      eventDate,
      startTimeValue && endTimeValue
        ? `${startTimeValue} - ${endTimeValue}`
        : startTimeValue
    ]
      .filter(Boolean)
      .join(' • ');

    const payload = {
      item_name: document.getElementById('eventTitle').value.trim(),
      item_desc: document.getElementById('eventDetails').value.trim(),
      timeframe,
      loc_content: document.getElementById('eventLocation').value.trim(),
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

      window.location.href = `event-detail.html?id=${id}`;
    } catch (err) {
      console.error(err);
    }
  });
}

loadPage().catch(console.error);