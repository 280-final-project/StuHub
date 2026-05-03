"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { fetchJSON, apiPost, apiPatch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { buildMapEmbedUrl } from "@/lib/utils";

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, token, isAdmin } = useAuth();

  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");

  const loadReviews = useCallback(async () => {
    try {
      const data = await fetchJSON(`/items/${id}/reviews`);
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      setReviews([]);
    }
  }, [id]);

  useEffect(() => {
    async function load() {
      try {
        const [ev] = await Promise.all([
          fetchJSON(`/items/${id}`),
          loadReviews(),
        ]);
        setEvent(ev);
      } catch {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, loadReviews]);

  const canManage = event && (isAdmin || user?.name === event.user_name);

  async function handleRemove() {
    try {
      await apiPatch(`/items/${id}/approval`, { approval_status: "rejected" });
      router.push("/events");
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await apiPost("/reviews", {
        review_header: reviewTitle,
        review_desc: reviewDesc,
        item_id: Number(id),
      });
      setReviewTitle("");
      setReviewDesc("");
      await loadReviews();
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <div className="container section"><p>Loading…</p></div>;
  if (!event) return <div className="container section"><p>Event not found.</p></div>;

  const mapUrl = buildMapEmbedUrl(event.loc_content);

  return (
    <div className="container section">
      <Link href="/events" className="back-link">← Back to Events</Link>

      <div className="detail-hero">
        {event.img_url && (
          <img src={event.img_url} alt={event.item_name} className="detail-image" />
        )}

        <div className="detail-panel">
          <h1>{event.item_name}</h1>

          <div className="meta">
            {event.pfp_url && (
              <img
                src={event.pfp_url}
                alt=""
                style={{ width: 28, height: 28, borderRadius: "50%" }}
              />
            )}
            <span>{event.user_name}</span>
          </div>

          {event.timeframe && <div className="meta" style={{ marginTop: "0.75rem" }}>📅 {event.timeframe}</div>}
          {event.loc_content && <div className="meta" style={{ marginTop: "0.5rem" }}>📍 {event.loc_content}</div>}

          {event.item_desc && (
            <p style={{ marginTop: "1.25rem", lineHeight: 1.7 }}>{event.item_desc}</p>
          )}

          {canManage && (
            <div className="event-actions">
              <Link
                href={`/events/${id}/edit`}
                className="btn btn-secondary event-btn"
              >
                ✏️ Edit
              </Link>
              <button
                className="btn btn-danger event-btn"
                onClick={() => setShowConfirm(true)}
              >
                🗑 Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {mapUrl && (
        <div className="section">
          <h2>Location</h2>
          <iframe
            src={mapUrl}
            className="map-frame"
            title="Event location"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}

      <div className="section">
        <h2>Reviews</h2>

        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((r, i) => (
              <div key={r.id || i} className="card" style={{ overflow: "visible" }}>
                <div className="card-body">
                  <div className="meta" style={{ marginBottom: "0.5rem" }}>
                    {r.pfp_url && (
                      <img
                        src={r.pfp_url}
                        alt=""
                        style={{ width: 24, height: 24, borderRadius: "50%" }}
                      />
                    )}
                    <strong>{r.user_name}</strong>
                  </div>
                  <h3 style={{ marginBottom: "0.5rem" }}>{r.review_header}</h3>
                  <p>{r.review_desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty">No reviews yet.</p>
        )}

        <h2 className="review-form-title">Leave a Review</h2>
        <form className="review-form" onSubmit={handleReviewSubmit}>
          <input
            className="review-input"
            type="text"
            placeholder="Review title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            required
          />
          <textarea
            className="review-textarea"
            placeholder="Write your review…"
            value={reviewDesc}
            onChange={(e) => setReviewDesc(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary review-submit-btn">
            Submit Review
          </button>
        </form>
      </div>

      {showConfirm && (
        <div className="modal" onClick={() => setShowConfirm(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowConfirm(false)}>×</button>
            <h2 style={{ marginTop: 0 }}>Remove Event</h2>
            <p>Are you sure you want to remove this event? This action cannot be undone.</p>
            <div className="actions" style={{ marginTop: "1.5rem" }}>
              <button className="btn btn-danger" style={{ padding: "0 1.5rem" }} onClick={handleRemove}>
                Yes, Remove
              </button>
              <button className="btn btn-secondary" style={{ padding: "0 1.5rem" }} onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
