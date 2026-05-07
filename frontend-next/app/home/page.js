"use client";

import { useState } from "react";
import Link from "next/link";
import PreviewSection from "@/components/home/PreviewSection";
import HomePreviewModal from "@/components/home/HomePreviewModal";
import {
  HOME_EVENTS,
  HOME_RESOURCES,
  HOME_DEALS,
  QUICK_CARDS,
} from "@/lib/homeFixtures";

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
          {QUICK_CARDS.map((c) => (
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
        items={HOME_EVENTS}
        onItemClick={openModal}
        truncateDescription
      />

      <PreviewSection
        title="Essential Resources"
        viewAllHref="/resources"
        items={HOME_RESOURCES}
        onItemClick={openModal}
      />

      <PreviewSection
        title="Featured Deals"
        viewAllHref="/deals"
        items={HOME_DEALS}
        onItemClick={openModal}
      />

      <HomePreviewModal item={selectedItem} onClose={closeModal} />
    </div>
  );
}
