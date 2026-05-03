"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SJSUEventContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "SJSU Event";
  const time = searchParams.get("time") || "";
  const location = searchParams.get("location") || "";
  const image = searchParams.get("image") || "";
  const url = searchParams.get("url") || "";

  return (
    <div className="container section">
      <Link href="/events" className="back-link">← Back to Events</Link>

      <div className="detail-hero">
        {image && <img src={image} alt={title} className="detail-image" />}

        <div className="detail-panel">
          <h1>{title}</h1>

          <div className="meta">
            <span>Posted by SJSU</span>
          </div>

          {time && <div className="meta" style={{ marginTop: "0.75rem" }}>📅 {time}</div>}
          {location && <div className="meta" style={{ marginTop: "0.5rem" }}>📍 {location}</div>}

          <p style={{ marginTop: "1.25rem", lineHeight: 1.7, color: "var(--muted)" }}>
            This event comes from the official SJSU events feed.
          </p>

          {url && (
            <div style={{ marginTop: "1.5rem" }}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: "0 2rem", textDecoration: "none" }}
              >
                View Official Event ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SJSUEventPage() {
  return (
    <Suspense fallback={<div className="container section"><p>Loading...</p></div>}>
      <SJSUEventContent />
    </Suspense>
  );
}
