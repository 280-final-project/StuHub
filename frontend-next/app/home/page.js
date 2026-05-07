"use client";

import { useState } from "react";
import Link from "next/link";
import PreviewSection from "@/components/home/PreviewSection";
import HomePreviewModal from "@/components/home/HomePreviewModal";

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
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

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

      <PreviewSection
        title="Upcoming Events"
        viewAllHref="/events"
        items={homeEvents}
        onItemClick={openModal}
        truncateDescription
      />

      <PreviewSection
        title="Essential Resources"
        viewAllHref="/resources"
        items={homeResources}
        onItemClick={openModal}
      />

      <PreviewSection
        title="Featured Deals"
        viewAllHref="/deals"
        items={homeDeals}
        onItemClick={openModal}
      />

      <HomePreviewModal item={selectedItem} onClose={closeModal} />
    </div>
  );
}
