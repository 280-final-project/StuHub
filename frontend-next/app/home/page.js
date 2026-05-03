"use client";

import { useState } from "react";
import Link from "next/link";

const homeEvents = [
  {
    id: 1,
    title: "Spring Career Fair",
    date: "Apr 18, 2025",
    location: "Student Union",
    icon: "💼",
    category: "Career",
    description:
      "Connect with top employers at SJSU's largest career fair. Bring your resume and dress professionally. Over 100 companies attending.",
  },
  {
    id: 2,
    title: "Hackathon 2025",
    date: "May 3, 2025",
    location: "Engineering Building",
    icon: "💻",
    category: "Tech",
    description:
      "48-hour hackathon with prizes, mentors, and free food. Open to all skill levels. Form teams of up to 4.",
  },
  {
    id: 3,
    title: "Cultural Night",
    date: "May 10, 2025",
    location: "Event Center",
    icon: "🎭",
    category: "Culture",
    description:
      "Celebrate diversity with performances, food, and activities from cultures around the world. Free entry for SJSU students.",
  },
];

const homeResources = [
  {
    id: 1,
    title: "Writing Center",
    icon: "✍️",
    category: "Academic",
    description:
      "Free tutoring for essays, research papers, and more. Walk-ins welcome.",
  },
  {
    id: 2,
    title: "Peer Mentoring",
    icon: "🤝",
    category: "Support",
    description:
      "One-on-one mentoring from upper-division students in your major.",
  },
  {
    id: 3,
    title: "Library Reserves",
    icon: "📚",
    category: "Academic",
    description:
      "Access course reserves, study rooms, and digital databases at King Library.",
  },
];

const homeDeals = [
  {
    id: 1,
    title: "Philz Coffee — 20% Off",
    icon: "☕",
    category: "Food",
    description:
      "Show your SJSU ID at Philz Coffee downtown for 20% off any drink.",
  },
  {
    id: 2,
    title: "Campus Bookstore — BOGO",
    icon: "📖",
    category: "Shopping",
    description:
      "Buy one, get one 50% off all SJSU apparel this week only at the Spartan Bookstore.",
  },
  {
    id: 3,
    title: "Adobe Creative Cloud — Free",
    icon: "🎨",
    category: "Software",
    description:
      "All SJSU students get free access to Adobe Creative Cloud through the university.",
  },
];

const quickCards = [
  {
    title: "Events",
    icon: "📅",
    desc: "Browse upcoming campus events, RSVP, and add to your calendar.",
    href: "/events",
    color: "var(--primary-soft)",
    iconColor: "var(--primary)",
  },
  {
    title: "Resources",
    icon: "📚",
    desc: "Academic support, tutoring, libraries, and more — all in one place.",
    href: "/resources",
    color: "var(--accent-soft)",
    iconColor: "#b45309",
  },
  {
    title: "Deals",
    icon: "🏷️",
    desc: "Exclusive student discounts from local businesses and online services.",
    href: "/deals",
    color: "#dcfce7",
    iconColor: "#15803d",
  },
];

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="container">
      {/* Hero */}
      <section className="home-hero-simple">
        <div className="home-hero-simple-inner">
          <span className="eyebrow">SJSU Student Platform</span>
          <h1 className="hero-title">
            Everything you need,<br />one&nbsp;Spartan&nbsp;hub.
          </h1>
          <p className="hero-subtitle">
            Discover events, access academic resources, and unlock student deals
            — built by Spartans, for Spartans.
          </p>
          <div className="hero-actions">
            <Link href="/events" className="hero-btn btn btn-primary">
              Browse Events
            </Link>
            <Link href="/resources" className="hero-btn btn btn-secondary">
              Explore Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="section">
        <div className="section-head">
          <h2>Quick Access</h2>
        </div>
        <div className="quick-grid">
          {quickCards.map((c) => (
            <Link href={c.href} className="quick-card card" key={c.title}>
              <div
                className="icon-chip"
                style={{ background: c.color, color: c.iconColor }}
              >
                {c.icon}
              </div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section">
        <div className="section-head">
          <h2>Upcoming Events</h2>
          <Link href="/events" className="text-link">
            View all →
          </Link>
        </div>
        <div className="home-preview-grid">
          {homeEvents.map((ev) => (
            <div
              className="preview-card card preview-clickable"
              key={ev.id}
              onClick={() => openModal(ev)}
            >
              <span className="preview-badge">{ev.category}</span>
              <h3>{ev.title}</h3>
              <p className="preview-meta">
                {ev.date} · {ev.location}
              </p>
              <p>{ev.description.slice(0, 90)}…</p>
            </div>
          ))}
        </div>
      </section>

      {/* Essential Resources */}
      <section className="section">
        <div className="section-head">
          <h2>Essential Resources</h2>
          <Link href="/resources" className="text-link">
            View all →
          </Link>
        </div>
        <div className="home-preview-grid">
          {homeResources.map((r) => (
            <div
              className="preview-card card preview-clickable"
              key={r.id}
              onClick={() => openModal(r)}
            >
              <span className="preview-badge">{r.category}</span>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Deals */}
      <section className="section">
        <div className="section-head">
          <h2>Featured Deals</h2>
          <Link href="/deals" className="text-link">
            View all →
          </Link>
        </div>
        <div className="home-preview-grid">
          {homeDeals.map((d) => (
            <div
              className="preview-card card preview-clickable"
              key={d.id}
              onClick={() => openModal(d)}
            >
              <span className="preview-badge">{d.category}</span>
              <h3>{d.title}</h3>
              <p>{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && selectedItem && (
        <div className="modal" onClick={closeModal}>
          <div
            className="modal-panel home-event-modal-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="home-modal-top">
              <div className="home-modal-icon">{selectedItem.icon}</div>
              <div className="home-modal-heading">
                <h2>{selectedItem.title}</h2>
                {selectedItem.date && (
                  <p className="home-event-modal-meta">
                    {selectedItem.date}
                    {selectedItem.location && ` · ${selectedItem.location}`}
                  </p>
                )}
                {selectedItem.category && (
                  <span className="preview-badge" style={{ marginTop: "0.5rem" }}>
                    {selectedItem.category}
                  </span>
                )}
              </div>
            </div>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              {selectedItem.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
