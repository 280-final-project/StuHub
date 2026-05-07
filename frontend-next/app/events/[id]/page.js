"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { fetchJSON, apiPost, apiPatch, apiDelete } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { buildMapEmbedUrl } from "@/lib/utils";
import SummaryBadge from "@/components/ai/SummaryBadge";
import ReviewList from "@/components/reviews/ReviewList";
import ReviewForm from "@/components/reviews/ReviewForm";
import RegistrationPanel from "@/components/events/RegistrationPanel";
import { toast } from "sonner";

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, token, isAdmin } = useAuth();

  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

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
      toast.success("Event removed.");
      router.push("/events");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleReviewSubmit({ rating, review_header, review_desc }) {
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      await apiPost("/reviews", {
        rating,
        review_header,
        review_desc,
        item_id: Number(id),
      });
      toast.success("Review posted.");
      await loadReviews();
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  }

  async function handleReviewDelete(reviewId) {
    try {
      const headers = isAdmin ? { "x-admin": "true" } : {};
      await apiDelete(`/reviews/${reviewId}`, headers);
      toast.success("Review deleted.");
      await loadReviews();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleRegisterToggle() {
    if (!token) {
      router.push("/login");
      return;
    }
    const wasRegistered = event.is_registered;
    try {
      const data = wasRegistered
        ? await apiDelete(`/items/${id}/register`)
        : await apiPost(`/items/${id}/register`);
      setEvent((prev) => ({
        ...prev,
        is_registered: data.registered,
        registration_count: data.count,
      }));
      toast.success(wasRegistered ? "You're no longer registered." : "You're registered. See you there!");
    } catch (err) {
      toast.error(err.message);
    }
  }

  if (loading) return <div className="container section"><p>Loading…</p></div>;
  if (!event) return <div className="container section"><p>Event not found.</p></div>;

  const mapUrl = buildMapEmbedUrl(event.location);

  return (
    <div className="container section">
      <Link href="/events" className="back-link">← Back to Events</Link>

      <div className="detail-hero">
        {event.image && (
          <img src={event.image} alt={event.title} className="detail-image" />
        )}

        <div className="detail-panel">
          <h1>{event.title}</h1>

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
          {event.location && <div className="meta" style={{ marginTop: "0.5rem" }}>📍 {event.location}</div>}

          <SummaryBadge summary={event.ai_summary} />

          {event.item_type === "event" && (
            <RegistrationPanel
              count={event.registration_count || 0}
              isRegistered={event.is_registered}
              isAuthenticated={!!token}
              onToggle={handleRegisterToggle}
            />
          )}

          {event.description && (
            <p style={{ marginTop: "1.25rem", lineHeight: 1.7 }}>{event.description}</p>
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
        <ReviewList
          reviews={reviews}
          currentUserId={user?.user_id}
          isAdmin={isAdmin}
          onDelete={handleReviewDelete}
        />

        <h2 className="review-form-title">Leave a Review</h2>
        <ReviewForm onSubmit={handleReviewSubmit} requireLogin={!token} />
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
