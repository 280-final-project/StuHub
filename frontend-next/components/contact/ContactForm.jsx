"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Thanks! Your message is on its way — we'll reply within 24 hours.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitting(false);
  }

  return (
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
  );
}
