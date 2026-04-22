import { injectLayout, setContent } from './app.js';

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
          <label for="image">Event Image</label>
          <label class="upload-box" for="image">
            <div style="font-size:2rem; margin-bottom:0.75rem;">⤴</div>
            <div id="upload-label">Click to upload image</div>
            <small>PNG, JPG up to 10MB</small>
          </label>
          <input id="image" name="image" type="file" accept="image/*" hidden>
        </div>

        <button class="btn btn-primary full-width" type="submit">Submit Event</button>
        <p class="note">Event will be visible after approval</p>
      </form>
    </section>
  `);

  const imageInput = document.getElementById('image');
  const uploadLabel = document.getElementById('upload-label');

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

  imageInput.addEventListener('change', () => {
    uploadLabel.textContent = imageInput.files?.[0]?.name || 'Click to upload image';
  });

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

  document.getElementById('event-form').addEventListener('submit', (event) => {
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

    console.log({
      title: document.getElementById('title').value,
      startDate,
      endDate,
      startTime,
      endTime,
      location: document.getElementById('location').value,
      description: document.getElementById('description').value,
    });

    window.location.href = 'confirmation.html';
  });
}

init();