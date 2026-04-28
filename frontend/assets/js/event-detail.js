import { injectLayout, setContent, escapeHTML } from './app.js';

const BACKEND_URL = 'https://studenthub-backend-rpn0.onrender.com';

function buildMapEmbedUrl(location) {
  if (!location) return '';
  return `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
}

async function loadPage() {
  injectLayout('Events');

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id') || 1);

  const eventRes = await fetch(`${BACKEND_URL}/items/${id}`);
  const event = await eventRes.json();

  if (!event || event.error) {
    setContent(`<p>Event not found</p>`);
    return;
  }

  const reviewsRes = await fetch(`${BACKEND_URL}/items/${id}/reviews`);
  const reviews = await reviewsRes.json();

  const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const canManage =
    isAdmin ||
    (currentUser &&
      event.user_name &&
      currentUser.user_name &&
      currentUser.user_name === event.user_name);

  setContent(`
    <section class="container page-header">
      <a class="back-link" href="events.html">← Back to Events</a>
      <div class="detail-hero">
        <img class="detail-image" src="${event.image || 'https://via.placeholder.com/800x400'}" alt="${escapeHTML(event.title)}">
        <div class="detail-panel">
          <h1>${escapeHTML(event.title)}</h1>

          <div class="meta" style="display:flex; align-items:center; gap:10px; margin-top:8px;">
            <img
              src="${event.pfp_url || 'https://via.placeholder.com/32'}"
              alt="${escapeHTML(event.user_name || 'User')}"
              style="width:32px; height:32px; border-radius:50%; object-fit:cover;"
              onerror="this.src='https://via.placeholder.com/32'"
            />
            <span>Posted by ${escapeHTML(event.user_name || 'User')}</span>
          </div>

          <div class="meta">📅 <span>${escapeHTML(event.timeframe || 'TBA')}</span></div>
          <div class="meta">📍 <span>${escapeHTML(event.location || 'TBA')}</span></div>
          <p style="margin-top:1.25rem;">${escapeHTML(event.description || '')}</p>

          ${
            canManage
              ? `
                <div style="display:flex; gap:12px; margin-top:1.25rem;">
                  <button id="editBtn" class="btn btn-primary" type="button">Edit Event</button>
                  <button id="deleteBtn" class="btn" type="button">Delete Event</button>
                </div>
              `
              : ''
          }
        </div>
      </div>
    </section>

    <section class="container section-tight">
      <h2>Location</h2>
      <iframe class="map-frame" src="${buildMapEmbedUrl(event.location)}"></iframe>
    </section>

    <section class="container section-tight">
      <h2>Reviews</h2>
      <div class="reviews-list">
        ${
          reviews.length === 0
            ? `<p>No reviews yet.</p>`
            : reviews.map((r) => `
              <div class="card">
                <div class="card-body">
                  <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                    <img
                      src="${escapeHTML(r.pfp_url || 'https://via.placeholder.com/40')}"
                      alt="${escapeHTML(r.user_name || 'User')}"
                      style="width:40px; height:40px; border-radius:50%; object-fit:cover;"
                      onerror="this.src='https://via.placeholder.com/40'"
                    />
                    <strong>${escapeHTML(r.user_name || 'User')}</strong>
                  </div>
                  <h3>${escapeHTML(r.review_header || 'Untitled')}</h3>
                  <p>${escapeHTML(r.review_desc || '')}</p>
                </div>
              </div>
            `).join('')
        }
      </div>

      <h3 style="margin-top:2rem;">Add a Review</h3>

      <form id="reviewForm">
        <input
          type="text"
          id="reviewHeader"
          placeholder="Review title"
          required
          style="width:100%; margin-bottom:10px; padding:8px;"
        />

        <textarea
          id="reviewDesc"
          placeholder="Write your review..."
          required
          style="width:100%; margin-bottom:10px; padding:8px;"
        ></textarea>

        <button type="submit">Submit Review</button>
      </form>
    </section>
  `);

  const editBtn = document.getElementById('editBtn');
  const deleteBtn = document.getElementById('deleteBtn');

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      window.location.href = `edit-event.html?id=${id}`;
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
      const confirmed = window.confirm('Delete this event?');
      if (!confirmed) return;

      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = 'login.html';
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/items/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'x-admin': isAdmin ? 'true' : 'false'
          }
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to delete event');
        }

        window.location.href = 'events.html';
      } catch (err) {
        console.error(err);
      }
    });
  }

  const form = document.getElementById('reviewForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const review_header = document.getElementById('reviewHeader').value;
    const review_desc = document.getElementById('reviewDesc').value;
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = 'login.html';
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          review_header,
          review_desc,
          item_id: id
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit review');
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  });
}

loadPage().catch(console.error);