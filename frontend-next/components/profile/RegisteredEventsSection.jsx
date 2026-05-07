"use client";

import Link from "next/link";

export default function RegisteredEventsSection({ registrations, onCancel }) {
  return (
    <div className="section">
      <h2>Registered Events ({registrations.length})</h2>
      {registrations.length === 0 ? (
        <p className="empty">You haven&apos;t registered for any events yet.</p>
      ) : (
        <div className="grid" style={{ marginTop: "1rem" }}>
          {registrations.map((r) => (
            <div
              key={r.id}
              className="card"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Link
                href={`/events/${r.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {r.image && <img src={r.image} alt={r.title} className="card-image" />}
                <div className="card-body" style={{ paddingBottom: "0.5rem" }}>
                  <h3>{r.title}</h3>
                  {r.timeframe && <div className="meta">📅 {r.timeframe}</div>}
                  {r.location && <div className="meta">📍 {r.location}</div>}
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--success)",
                      marginTop: "0.5rem",
                    }}
                  >
                    ✓ Registered
                  </div>
                </div>
              </Link>
              <div style={{ padding: "0 1rem 1rem 1rem" }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onCancel(r.id);
                  }}
                  className="btn btn-secondary"
                  style={{
                    height: 36,
                    padding: "0 0.85rem",
                    fontSize: "0.85rem",
                    width: "100%",
                  }}
                >
                  Cancel registration
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
