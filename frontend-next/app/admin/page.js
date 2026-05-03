"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">
          Manage events and campus content from here.
        </p>
      </div>

      <div className="admin-grid">
        <Link href="/admin/events/new" className="info-card admin-card">
          <div className="icon-chip blue">➕</div>
          <h3>Add Event</h3>
          <p>Create a new campus event for students.</p>
        </Link>

        <Link href="/admin/events/manage" className="info-card admin-card">
          <div className="icon-chip blue">📋</div>
          <h3>Manage Events</h3>
          <p>Approve, reject, or delete submitted events.</p>
        </Link>

        <Link href="/events" className="info-card admin-card">
          <div className="icon-chip blue">🌐</div>
          <h3>View Public Events</h3>
          <p>See what students see on the public events page.</p>
        </Link>
      </div>
    </div>
  );
}
