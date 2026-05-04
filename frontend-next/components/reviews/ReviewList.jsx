"use client";

import ReviewCard from "./ReviewCard";
import StarRating from "./StarRating";

function averageRating(reviews) {
  const rated = reviews.filter((r) => Number.isFinite(r.rating));
  if (rated.length === 0) return null;
  const sum = rated.reduce((acc, r) => acc + r.rating, 0);
  return { avg: sum / rated.length, count: rated.length };
}

export default function ReviewList({ reviews, currentUserId, isAdmin, onDelete }) {
  if (!reviews || reviews.length === 0) {
    return <p className="empty">No reviews yet. Be the first.</p>;
  }

  const stats = averageRating(reviews);

  return (
    <div className="reviews-list">
      {stats && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.75rem",
            color: "var(--muted)",
            fontSize: "0.9rem",
          }}
        >
          <StarRating value={Math.round(stats.avg)} readOnly size={18} />
          <span>
            <strong style={{ color: "var(--text)" }}>{stats.avg.toFixed(1)}</strong> from{" "}
            {stats.count} {stats.count === 1 ? "rating" : "ratings"}
          </span>
        </div>
      )}

      {reviews.map((r) => (
        <ReviewCard
          key={r.id}
          review={r}
          canDelete={Boolean(isAdmin || (currentUserId && r.user_id === currentUserId))}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
