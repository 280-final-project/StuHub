"use client";

import { useState } from "react";
import { toast } from "sonner";

const SUPPORT_EMAIL = "support@studenthub.demo";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    // Demo only — no real send. Simulate latency for a believable feel.
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Thanks! Your message is on its way — we'll reply within 24 hours.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitting(false);
  }

  return (
    <div className="container section">
      <div className="page-header">
        <h1 className="page-title">Contact</h1>
        <p className="page-subtitle">
          Questions, feedback, bug reports, or partnership ideas — we read every message.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "2rem",
          alignItems: "start",
          marginTop: "1.5rem",
        }}
        className="contact-grid"
      >
        <div>
          <h2 style={{ marginTop: 0 }}>Reach us directly</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            For the fastest response, email us at:
          </p>
          <p style={{ marginTop: "0.5rem" }}>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-link"
              style={{ fontSize: "1.05rem", fontWeight: 600 }}
            >
              {SUPPORT_EMAIL}
            </a>
          </p>

          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem 1.25rem",
              background: "var(--surface-soft)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "0.5rem", fontSize: "1rem" }}>
              ⏱ Response time
            </h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>
              We aim to reply within 24 hours during the school week. Weekends and SJSU breaks
              may be a little slower.
            </p>
          </div>

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem 1.25rem",
              background: "var(--surface-soft)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "0.5rem", fontSize: "1rem" }}>
              🐛 Found a bug?
            </h3>
            <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>
              Include the page you were on, what you tried to do, and what happened. A
              screenshot helps a lot.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="form-card"
          style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "0.25rem" }}>Send us a message</h2>
          <p style={{ margin: "0 0 0.5rem 0", color: "var(--muted)", fontSize: "0.9rem" }}>
            We&apos;ll get back to you at the email you provide.
          </p>

          <div className="form-group">
            <label>Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sammy Spartan"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@sjsu.edu"
              required
            />
          </div>

          <div className="form-group">
            <label>Subject (optional)</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's this about?"
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what's on your mind…"
              rows={6}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary full-width"
            disabled={submitting}
          >
            {submitting ? "Sending…" : "Send Message"}
          </button>

          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              color: "var(--muted)",
              textAlign: "center",
            }}
          >
            By submitting, you agree to be contacted at the email above.
          </p>
        </form>
      </div>
    </div>
  );
}
