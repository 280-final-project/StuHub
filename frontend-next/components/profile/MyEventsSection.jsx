"use client";

import Link from "next/link";

function statusColor(status) {
  if (status === "approved") return { bg: "var(--primary-soft)", color: "var(--primary)" };
  if (status === "rejected") return { bg: "#fee2e2", color: "var(--danger)" };
  return { bg: "var(--accent-soft)", color: "#7a5b00" };
}

export default function MyEventsSection({ items }) {
  return (
    <div className="section">
      <h2>My Events ({items.length})</h2>
      {items.length === 0 ? (
        <p className="empty">You haven&apos;t posted any events yet.</p>
      ) : (
        <div className="grid" style={{ marginTop: "1rem" }}>
          {items.map((it) => {
            const sc = statusColor(it.approval_status);
            return (
              <Link
                key={it.id}
                href={`/events/${it.id}`}
                className="card"
                style={{ textDecoration: "none" }}
              >
                {it.image && <img src={it.image} alt={it.title} className="card-image" />}
                <div className="card-body">
                  <h3>{it.title}</h3>
                  {it.timeframe && <div className="meta">📅 {it.timeframe}</div>}
                  {it.location && <div className="meta">📍 {it.location}</div>}
                  <div className="meta" style={{ marginTop: "0.5rem" }}>
                    <span
                      className="badge"
                      style={{
                        fontSize: "0.7rem",
                        padding: "0.25rem 0.6rem",
                        background: sc.bg,
                        color: sc.color,
                        border: "1px solid var(--border)",
                      }}
                    >
                      {it.approval_status}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
