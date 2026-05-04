"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchJSON } from "@/lib/api";
import SummaryBadge from "@/components/ai/SummaryBadge";
import { CardGridSkeleton } from "@/components/ui/Skeleton";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [localRes, sjsuRes] = await Promise.all([
          fetchJSON("/items?type=event").catch(() => []),
          fetchJSON("https://events.sjsu.edu/api/2/events").catch(() => ({ events: [] })),
        ]);

        const localItems = (Array.isArray(localRes) ? localRes : [])
          .filter((e) => e.approval_status === "approved")
          .map((e) => ({
            source: "local",
            id: e.id,
            title: e.title,
            image: e.image,
            user_name: e.user_name,
            pfp_url: e.pfp_url,
            timeframe: e.timeframe,
            location: e.location,
            ai_summary: e.ai_summary,
            href: `/events/${e.id}`,
          }));

        const sjsuItems = (sjsuRes?.events || []).map((e) => {
          const params = new URLSearchParams({
            url: e.localist_url || e.url || "",
            title: e.title || "",
            time: e.date_utc || "",
            location: e.location_name || e.location || "",
            image: e.photo_url || "",
          });
          return {
            source: "sjsu",
            id: `sjsu-${e.id}`,
            title: e.title,
            image: e.photo_url || "",
            user_name: "SJSU",
            pfp_url: "",
            timeframe: e.date_utc || "",
            location: e.location_name || e.location || "",
            href: `/events/sjsu?${params.toString()}`,
          };
        });

        setEvents([...localItems, ...sjsuItems]);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return (
    <div className="container section">
      <div className="section-heading-row">
        <div className="section-heading">
          <h2>Events</h2>
          <p>Discover what&apos;s happening on campus</p>
        </div>
      </div>
      <CardGridSkeleton count={6} />
    </div>
  );

  return (
    <div className="container section">
      <div className="section-heading-row">
        <div className="section-heading">
          <h2>Events</h2>
          <p>Discover what's happening on campus</p>
        </div>
        <Link href="/events/new" className="btn btn-primary" style={{ padding: "0 1.5rem" }}>
          + Add Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="empty">No events yet.</p>
      ) : (
        <div className="grid" style={{ marginTop: "1.5rem" }}>
          {events.map((ev) => (
            <Link key={ev.id} href={ev.href} className="card" style={{ textDecoration: "none" }}>
              {ev.image && (
                <img src={ev.image} alt={ev.title} className="card-image" />
              )}
              <div className="card-body">
                <h3>{ev.title}</h3>
                <div className="meta">
                  {ev.pfp_url && (
                    <img
                      src={ev.pfp_url}
                      alt=""
                      style={{ width: 22, height: 22, borderRadius: "50%" }}
                    />
                  )}
                  <span>Posted by {ev.user_name}</span>
                </div>
                {ev.timeframe && <div className="meta">📅 {ev.timeframe}</div>}
                {ev.location && <div className="meta">📍 {ev.location}</div>}
                {ev.source === "local" && <SummaryBadge summary={ev.ai_summary} compact />}
                <div className="meta">
                  <span
                    className="badge"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.3rem 0.7rem",
                      background: ev.source === "sjsu" ? "var(--primary-soft)" : "var(--accent)",
                      color: ev.source === "sjsu" ? "var(--primary)" : "#111",
                    }}
                  >
                    {ev.source === "sjsu" ? "SJSU" : "Community"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
