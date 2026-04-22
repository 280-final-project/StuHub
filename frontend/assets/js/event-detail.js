import { injectLayout, setContent, escapeHTML } from './app.js';

function buildMapEmbedUrl(location) {
  if (!location) return '';
  return `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
}

async function loadPage() {
  injectLayout('Events');

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id') || 1);

  const eventRes = await fetch(`http://localhost:5000/items/${id}`);
  const event = await eventRes.json();

  if (!event || event.error) {
    setContent(`<p>Event not found</p>`);
    return;
  }

  const reviewsRes = await fetch(`http://localhost:5000/items/${id}/reviews`);
  const reviews = await reviewsRes.json();

  setContent(`
    <section class="container page-header">
      <a class="back-link" href="events.html">← Back to Events</a>
      <div class="detail-hero">
        <img class="detail-image" src="${event.image || 'https://via.placeholder.com/800x400'}" alt="${escapeHTML(event.title)}">
        <div class="detail-panel">
          <h1>${escapeHTML(event.title)}</h1>
          <div class="meta">📅 <span>${escapeHTML(event.timeframe || 'TBA')}</span></div>
          <div class="meta">📍 <span>${escapeHTML(event.location || 'TBA')}</span></div>
          <p style="margin-top:1.25rem;">${escapeHTML(event.description || '')}</p>
        </div>
      </div>
    </section>

    <section class="container section-tight">
      <h2>Location</h2>
      <iframe class="map-frame"
        src="${buildMapEmbedUrl(event.location)}">
      </iframe>
    </section>

    <section class="container section-tight">
      <h2>Reviews</h2>

      ${
        reviews.length === 0
          ? `<p>No reviews yet.</p>`
          : reviews.map(r => `
            <div class="card">
              <div class="card-body">
                <h3>${escapeHTML(r.review_header || 'Untitled')}</h3>
                <p>${escapeHTML(r.review_desc || '')}</p>
              </div>
            </div>
          `).join('')
      }

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

  // attach form handler AFTER rendering
  const form = document.getElementById("reviewForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const review_header = document.getElementById("reviewHeader").value;
    const review_desc = document.getElementById("reviewDesc").value;

    try {
      await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          review_header,
          review_desc,
          user_id: null,
          item_id: id
        })
      });

      // reload page to show new review
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  });
}

loadPage().catch(console.error);