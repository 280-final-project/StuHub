"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchJSON, apiPatch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { SJSU_LOCATIONS } from "@/lib/locations";
import { splitTimeframe, splitLocation } from "@/lib/utils";
import { toast } from "sonner";

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token, loaded } = useAuth();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loaded && !token) {
      router.push("/login");
      return;
    }

    async function load() {
      try {
        const ev = await fetchJSON(`/items/${id}`);
        setTitle(ev.item_name || "");
        setDetails(ev.item_desc || "");
        setImageUrl(ev.img_url || "");

        const { eventDate, startTime: st, endTime: et } = splitTimeframe(ev.timeframe);
        setDate(eventDate);
        setStartTime(st);
        setEndTime(et);

        const { building: b, room: r } = splitLocation(ev.loc_content);
        setBuilding(b);
        setRoom(r);
      } catch {
        toast.error("Could not load event");
      } finally {
        setLoading(false);
      }
    }

    if (loaded) load();
  }, [id, loaded, token, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    let timeframe = date;
    if (startTime) {
      timeframe += ` • ${startTime}`;
      if (endTime) timeframe += ` - ${endTime}`;
    }

    const loc = room ? `${building}, Room ${room}` : building;

    try {
      await apiPatch(`/items/${id}`, {
        item_name: title,
        item_desc: details,
        timeframe,
        loc_content: loc,
        img_url: imageUrl,
      });
      toast.success("Event updated.");
      router.push(`/events/${id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!loaded || loading) return <div className="container section"><p>Loading…</p></div>;

  return (
    <div className="container section">
      <div className="section-heading" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>Edit Event</h2>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="e.g. 2:00 PM"
            />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="e.g. 4:00 PM"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Building</label>
          <select value={building} onChange={(e) => setBuilding(e.target.value)} required>
            <option value="">Select a building…</option>
            {SJSU_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Room (optional)</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="e.g. 189"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://…"
          />
        </div>

        <div className="form-group">
          <label>Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>

        <div className="actions">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: "0 1.5rem", flex: 1 }}
            disabled={submitting}
          >
            {submitting ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ padding: "0 1.5rem", flex: 1 }}
            onClick={() => router.push(`/events/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
