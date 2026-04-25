import { injectLayout, setContent, requireLogin } from './app.js';

// if (!requireLogin()) return;

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

        <div class="form-row">
          <div class="form-group">
            <label for="start-date">Start Date</label>
            <input id="start-date" name="start-date" type="date" required>
            <small class="error-text" id="start-date-error"></small>
          </div>

          <div class="form-group">
            <label for="end-date">End Date</label>
            <input id="end-date" name="end-date" type="date" required>
            <small class="error-text" id="end-date-error"></small>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="start-time">Start Time</label>
            <input id="start-time" name="start-time" type="time" required>
            <small class="error-text" id="start-time-error"></small>
          </div>

          <div class="form-group">
            <label for="end-time">End Time</label>
            <input id="end-time" name="end-time" type="time" required>
            <small class="error-text" id="end-time-error"></small>
          </div>
        </div>

        <div class="form-group">
          <label for="location">Location</label>
          <input id="location" name="location" type="text" placeholder="Enter event location" required>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" name="description" placeholder="Enter event description" required></textarea>
        </div>

        <div class="form-group">
          <label for="image">Event Image URL</label>
          <input id="image-url" name="image-url" type="text" placeholder="Paste image URL">
        </div>

        <button class="btn btn-primary full-width" type="submit">Submit Event</button>
        <p class="note">Event will be visible after approval</p>
      </form>
    </section>
  `);

  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const startTimeInput = document.getElementById('start-time');
  const endTimeInput = document.getElementById('end-time');

  const startDateError = document.getElementById('start-date-error');
  const endDateError = document.getElementById('end-date-error');
  const endTimeError = document.getElementById('end-time-error');

  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 3);
  const minDateStr = minDate.toISOString().split('T')[0];

  startDateInput.setAttribute('min', minDateStr);
  endDateInput.setAttribute('min', minDateStr);

  startDateInput.addEventListener('change', () => {
    if (startDateInput.value && startDateInput.value < minDateStr) {
      startDateError.textContent = 'Start date must be at least 3 days from today.';
      startDateInput.classList.add('invalid');
    } else {
      startDateError.textContent = '';
      startDateInput.classList.remove('invalid');
    }

    if (endDateInput.value && endDateInput.value < startDateInput.value) {
      endDateError.textContent = 'End date cannot be before start date.';
      endDateInput.classList.add('invalid');
    } else {
      endDateError.textContent = '';
      endDateInput.classList.remove('invalid');
    }
  });

  endDateInput.addEventListener('change', () => {
    if (endDateInput.value && endDateInput.value < startDateInput.value) {
      endDateError.textContent = 'End date cannot be before start date.';
      endDateInput.classList.add('invalid');
    } else {
      endDateError.textContent = '';
      endDateInput.classList.remove('invalid');
    }
  });

  endTimeInput.addEventListener('change', () => {
    if (
      startDateInput.value &&
      endDateInput.value &&
      startTimeInput.value &&
      endTimeInput.value &&
      startDateInput.value === endDateInput.value &&
      endTimeInput.value <= startTimeInput.value
    ) {
      endTimeError.textContent = 'End time must be after start time.';
      endTimeInput.classList.add('invalid');
    } else {
      endTimeError.textContent = '';
      endTimeInput.classList.remove('invalid');
    }
  });

  document.getElementById('event-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    if (startDate < minDateStr) {
      alert('Start date must be at least 3 days from today.');
      return;
    }

    if (endDate < startDate) {
      alert('End date must be after start date.');
      return;
    }

    if (endDate === startDate && endTime <= startTime) {
      alert('End time must be after start time.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please log in with Google before submitting an event.');
      window.location.href = 'login.html';
      return;
    }

    const title = document.getElementById('title').value.trim();
    const location = document.getElementById('location').value.trim();
    const description = document.getElementById('description').value.trim();
    const imageUrl = document.getElementById('image-url').value.trim();

    const timeframe = `${startDate} ${startTime} - ${endDate} ${endTime}`;

    try {
      const response = await fetch('http://localhost:5001/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          item_name: title,
          item_desc: description,
          is_timed: true,
          timeframe,
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