"use client";

import StarRating from "./StarRating";

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function ReviewCard({ review, onDelete, canDelete }) {
  return (
    <div className="card" style={{ overflow: "visible" }}>
      <div className="card-body">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "0.75rem",
            marginBottom: "0.5rem",
          }}
        >
          <div className="meta" style={{ margin: 0 }}>
            {review.pfp_url && (
              <img
                src={review.pfp_url}
                alt=""
                style={{ width: 28, height: 28, borderRadius: "50%" }}
              />
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              <strong>{review.user_name || "Anonymous"}</strong>
              <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                {formatDate(review.created_at)}
              </span>
            </div>
          </div>
          {canDelete && (
            <button
              onClick={() => onDelete?.(review.id)}
              aria-label="Delete review"
              style={{
                background: "none",
                border: "none",
                color: "var(--muted)",
                fontSize: "1.1rem",
                cursor: "pointer",
                padding: "0.2rem 0.4rem",
                lineHeight: 1,
              }}
              title="Delete review"
            >
              🗑
            </button>
          )}
        </div>

        {review.rating ? (
          <div style={{ marginBottom: "0.5rem" }}>
            <StarRating value={review.rating} readOnly size={16} />
          </div>
        ) : null}

        {review.header && (
          <h3 style={{ margin: "0 0 0.4rem 0" }}>{review.header}</h3>
        )}
        {review.desc && <p style={{ margin: 0 }}>{review.desc}</p>}
      </div>
    </div>
  );
}
