"use client";

import Link from "next/link";
import StarRating from "@/components/reviews/StarRating";

export default function MyReviewsSection({ reviews }) {
  return (
    <div className="section">
      <h2>My Reviews ({reviews.length})</h2>
      {reviews.length === 0 ? (
        <p className="empty">You haven&apos;t posted any reviews yet.</p>
      ) : (
        <div className="reviews-list" style={{ marginTop: "1rem" }}>
          {reviews.map((r) => (
            <Link
              key={r.id}
              href={`/events/${r.item_id}`}
              className="card"
              style={{ overflow: "visible", textDecoration: "none" }}
            >
              <div className="card-body">
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  on <strong style={{ color: "var(--text)" }}>{r.item_name}</strong>
                </div>
                {r.rating ? (
                  <div style={{ marginBottom: "0.4rem" }}>
                    <StarRating value={r.rating} readOnly size={16} />
                  </div>
                ) : null}
                {r.header && <h3 style={{ margin: "0 0 0.3rem 0" }}>{r.header}</h3>}
                {r.desc && <p style={{ margin: 0 }}>{r.desc}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
