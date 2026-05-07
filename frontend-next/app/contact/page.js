"use client";

import ContactForm from "@/components/contact/ContactForm";

const SUPPORT_EMAIL = "support@studenthub.demo";

export default function ContactPage() {
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

        <ContactForm />
      </div>
    </div>
  );
}
