"use client";

import Link from "next/link";
import SummaryBadge from "@/components/ai/SummaryBadge";

export default function EventCard({ event }) {
  const isSjsu = event.source === "sjsu";

  return (
    <Link href={event.href} className="card" style={{ textDecoration: "none" }}>
      {event.image && (
        <img src={event.image} alt={event.title} className="card-image" />
      )}
      <div className="card-body">
        <h3>{event.title}</h3>
        <div className="meta">
          {event.pfp_url && (
            <img
              src={event.pfp_url}
              alt=""
              style={{ width: 22, height: 22, borderRadius: "50%" }}
            />
          )}
          <span>Posted by {event.user_name}</span>
        </div>
        {event.timeframe && <div className="meta">📅 {event.timeframe}</div>}
        {event.location && <div className="meta">📍 {event.location}</div>}
        {event.source === "local" && <SummaryBadge summary={event.ai_summary} compact />}
        <div className="meta">
          <span
            className="badge"
            style={{
              fontSize: "0.75rem",
              padding: "0.3rem 0.7rem",
              background: isSjsu ? "var(--primary-soft)" : "var(--accent)",
              color: isSjsu ? "var(--primary)" : "#111",
            }}
          >
            {isSjsu ? "SJSU" : "Community"}
          </span>
        </div>
      </div>
    </Link>
  );
}
