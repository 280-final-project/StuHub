"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SJSU_LOCATIONS } from "@/lib/locations";

export default function AdminAddEvent() {
  const { token } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("start_time", startTime);
      formData.append("end_time", endTime);
      formData.append("building", building);
      formData.append("room", room);
      formData.append("details", details);
      if (image) {
        formData.append("image", image);
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_BASE_URL}/items`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "x-admin": "true",
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create event");
      }

      router.push("/confirmation");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Add New Event</h1>
        <p className="page-subtitle">
          Fill out the form below to create a new campus event.
        </p>
      </div>

      <form className="admin-event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="event-title">Event Title</label>
          <input
            id="event-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Spring Career Fair"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="event-date">Date</label>
          <input
            id="event-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="event-start">Start Time</label>
            <input
              id="event-start"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="event-end">End Time</label>
            <input
              id="event-end"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="event-building">Building</label>
          <select
            id="event-building"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            required
          >
            <option value="">Select a building</option>
            {SJSU_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="event-room">Room</label>
          <input
            id="event-room"
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="e.g. Room 189"
          />
        </div>

        <div className="form-group">
          <label htmlFor="event-image">Event Image</label>
          <input
            id="event-image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0] || null)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="event-details">Details</label>
          <textarea
            id="event-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe the event..."
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary full-width"
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
