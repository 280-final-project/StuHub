"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { fetchJSON } from "@/lib/api";
import { useDebounced } from "@/lib/hooks";
import { mapSjsuEvent, matchesSjsuFilters } from "@/lib/sjsuEvents";
import SummaryBadge from "@/components/ai/SummaryBadge";
import { CardGridSkeleton } from "@/components/ui/Skeleton";
import EventFiltersBar from "@/components/events/EventFiltersBar";

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
          .map(mapSjsuEvent)
          .filter(Boolean)
          .filter((e) => matchesSjsuFilters(e, { query: q, location: locFilter, from, to }));

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

      <EventFiltersBar
        query={query}
        onQueryChange={setQuery}
        from={from}
        onFromChange={setFrom}
        to={to}
        onToChange={setTo}
        location={location}
        onLocationChange={setLocation}
        locationOptions={LOCATION_OPTIONS}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
      />

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
