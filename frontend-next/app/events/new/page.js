"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SJSU_LOCATIONS } from "@/lib/locations";
import { getMinDateStr } from "@/lib/utils";

export default function NewEventPage() {
  const router = useRouter();
  const { token, isLoggedIn, loaded } = useAuth();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loaded && !isLoggedIn) router.push("/login");
  }, [loaded, isLoggedIn, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const timeframe = date;
    const loc = room ? `${building}, Room ${room}` : building;

    const fd = new FormData();
    fd.append("item_name", title);
    fd.append("item_desc", description);
    fd.append("is_timed", "true");
    fd.append("timeframe", timeframe);
    fd.append("loc_content", loc);
    if (imageFile) fd.append("image", imageFile);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || data.message || "Failed to create event");
      }
      router.push("/confirmation");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!loaded) return null;

  const minDate = getMinDateStr(3);

  return (
    <div className="container section">
      <div className="section-heading" style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>Add a New Event</h2>
        <p>Share an upcoming campus event with the community</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Club Meeting, Workshop…"
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={minDate}
            required
          />
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
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell people what this event is about…"
            required
          />
        </div>

        <div className="form-group">
          <label>Event Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0] || null)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary full-width"
          disabled={submitting}
        >
          {submitting ? "Submitting…" : "Submit Event"}
        </button>
      </form>
    </div>
  );
}
