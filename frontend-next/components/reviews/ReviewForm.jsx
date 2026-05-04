"use client";

import { useState } from "react";
import StarRating from "./StarRating";

export default function ReviewForm({ onSubmit, requireLogin }) {
  const [rating, setRating] = useState(0);
  const [header, setHeader] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await onSubmit({ rating: rating || null, review_header: header, review_desc: desc });
      setRating(0);
      setHeader("");
      setDesc("");
    } finally {
      setSubmitting(false);
    }
  }

  if (requireLogin) {
    return (
      <p className="empty">
        Sign in to leave a review.
      </p>
    );
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Your rating:</span>
        <StarRating value={rating} onChange={setRating} size={26} />
      </div>
      <input
        className="review-input"
        type="text"
        placeholder="Review title"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
        required
      />
      <textarea
        className="review-textarea"
        placeholder="Share your thoughts about this event…"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <button
        type="submit"
        className="btn btn-primary review-submit-btn"
        disabled={submitting}
      >
        {submitting ? "Posting…" : "Post Review"}
      </button>
    </form>
  );
}
