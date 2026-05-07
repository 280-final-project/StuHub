"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { fetchJSON } from "@/lib/api";
import { useDebounced } from "@/lib/hooks";
import SummaryBadge from "@/components/ai/SummaryBadge";
import { CardGridSkeleton } from "@/components/ui/Skeleton";

const LOCATION_OPTIONS = [
  "All locations",
  "Engineering",
  "Student Union",
  "Library",
  "Career Center",
  "Duncan Hall",
  "Lucas Business",
  "Tower Lawn",
  "Wellness Center",
  "Event Center",
];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [location, setLocation] = useState("All locations");

  const debouncedQuery = useDebounced(query, 300);

  const filterParams = useMemo(() => {
    const p = new URLSearchParams({ type: "event" });
    if (debouncedQuery.trim()) p.set("q", debouncedQuery.trim());
    if (from) p.set("from", from);
    if (to) p.set("to", to);
    if (location && location !== "All locations") p.set("location", location);
    return p.toString();
  }, [debouncedQuery, from, to, location]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [localRes, sjsuRes] = await Promise.all([
          fetchJSON(`/items?${filterParams}`).catch(() => []),
          fetchJSON("https://events.sjsu.edu/api/2/events").catch(() => ({ events: [] })),
        ]);

        if (cancelled) return;

        const localItems = (Array.isArray(localRes) ? localRes : []).map((e) => ({
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

        const q = debouncedQuery.trim().toLowerCase();
        const locFilter = location && location !== "All locations" ? location.toLowerCase() : null;

        const sjsuItems = (sjsuRes?.events || [])
          .map((wrapper) => {
            // Localist wraps each event: { event: {...} }
            const e = wrapper?.event || wrapper;
            if (!e?.title) return null;
            const timeframe = e.first_date || e.last_date || e.date_utc || "";
            const location = e.location_name || e.location || "";
            const params = new URLSearchParams({
              url: e.localist_url || e.url || "",
              title: e.title || "",
              time: timeframe,
              location,
              image: e.photo_url || "",
            });
            return {
              source: "sjsu",
              id: `sjsu-${e.id}`,
              title: e.title,
              image: e.photo_url || "",
              user_name: "SJSU",
              pfp_url: "",
              timeframe,
              location,
              href: `/events/sjsu?${params.toString()}`,
            };
          })
          .filter(Boolean)
          .filter((e) => {
            if (q && !(e.title?.toLowerCase().includes(q))) return false;
            if (locFilter && !(e.location?.toLowerCase().includes(locFilter))) return false;
            if (from && e.timeframe && e.timeframe < from) return false;
            if (to && e.timeframe && e.timeframe > to + "Z") return false;
            return true;
          });

        setEvents([...localItems, ...sjsuItems]);
      } catch {
        if (!cancelled) setEvents([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [filterParams, debouncedQuery, from, to, location]);

  function clearFilters() {
    setQuery("");
    setFrom("");
    setTo("");
    setLocation("All locations");
  }

  const hasActiveFilters = query || from || to || location !== "All locations";

  return (
    <div className="container section">
      <div className="section-heading-row">
        <div className="section-heading">
          <h2>Events</h2>
          <p>Discover what&apos;s happening on campus</p>
        </div>
        <Link href="/events/new" className="btn btn-primary" style={{ padding: "0 1.5rem" }}>
          + Add Event
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "flex-end",
          marginTop: "1.25rem",
          padding: "1rem",
          background: "var(--surface-soft)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: "1 1 220px" }}>
          <label style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Search</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pizza, hackathon, career fair…"
            style={{
              height: 40,
              padding: "0 0.75rem",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface)",
              color: "var(--text)",
              fontSize: "0.9rem",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <label style={{ fontSize: "0.75rem", color: "var(--muted)" }}>From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={{
              height: 40,
              padding: "0 0.5rem",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface)",
              color: "var(--text)",
              fontSize: "0.9rem",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <label style={{ fontSize: "0.75rem", color: "var(--muted)" }}>To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={{
              height: 40,
              padding: "0 0.5rem",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface)",
              color: "var(--text)",
              fontSize: "0.9rem",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: "0 1 220px" }}>
          <label style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              height: 40,
              padding: "0 0.5rem",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface)",
              color: "var(--text)",
              fontSize: "0.9rem",
            }}
          >
            {LOCATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="btn btn-secondary"
            style={{ height: 40, padding: "0 1rem", fontSize: "0.85rem" }}
          >
            Clear
          </button>
        )}
      </div>

      {loading ? (
        <CardGridSkeleton count={6} />
      ) : events.length === 0 ? (
        <p className="empty" style={{ marginTop: "2rem" }}>
          {hasActiveFilters ? "No events match your filters." : "No events yet."}
        </p>
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
