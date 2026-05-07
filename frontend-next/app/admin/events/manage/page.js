"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchJSON, apiPatch, apiDelete } from "@/lib/api";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadEvents = useCallback(async () => {
    try {
      const data = await fetchJSON("/items/admin/all");
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const counts = {
    pending: events.filter((e) => e.approval_status === "pending").length,
    approved: events.filter((e) => e.approval_status === "approved").length,
    rejected: events.filter((e) => e.approval_status === "rejected").length,
  };

  const filtered =
    filter === "all"
      ? events
      : events.filter((e) => e.approval_status === filter);

  async function handleApproval(id, status) {
    try {
      await apiPatch(`/items/${id}/approval`, { approval_status: status });
      toast.success(`Event marked as ${status}.`);
      await loadEvents();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await apiDelete(`/items/${id}`, { "x-admin": "true" });
      setDeleteTarget(null);
      toast.success("Event deleted.");
      await loadEvents();
    } catch (err) {
      toast.error(err.message);
    }
  }

  if (loading) {
    return (
      <div className="container">
        <p className="muted" style={{ padding: "2rem 0" }}>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="container manage-events-section">
      <div className="manage-header">
        <div>
          <h1 className="page-title">Manage Events</h1>
          <p className="page-subtitle">
            Review and manage all submitted campus events.
          </p>
        </div>
        <div className="manage-stats">
          <div className="manage-stat-card">
            <span className="manage-stat-label">Pending</span>
            <span className="manage-stat-value">{counts.pending}</span>
          </div>
          <div className="manage-stat-card">
            <span className="manage-stat-label">Approved</span>
            <span className="manage-stat-value">{counts.approved}</span>
          </div>
          <div className="manage-stat-card">
            <span className="manage-stat-label">Rejected</span>
            <span className="manage-stat-value">{counts.rejected}</span>
          </div>
        </div>
      </div>

      <div className="manage-tabs">
        <div className="tabs">
          {["all", "pending", "approved", "rejected"].map((tab) => (
            <button
              key={tab}
              className={filter === tab ? "active" : ""}
              onClick={() => setFilter(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">No events to show.</p>
      ) : (
        <div className="events-container">
          {filtered.map((event) => (
            <div key={event.id} className="admin-event-card">
              {event.image && (
                <div className="admin-event-thumb">
                  <img src={event.image} alt={event.title} />
                </div>
              )}
              <div className="admin-event-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                  <span className={`status ${event.approval_status}`}>
                    {event.approval_status}
                  </span>
                  {event.item_type && (
                    <span
                      className="badge"
                      style={{
                        fontSize: "0.7rem",
                        padding: "0.2rem 0.55rem",
                        background:
                          event.item_type === "event" ? "var(--accent-soft)" :
                          event.item_type === "deal" ? "var(--primary-soft)" :
                          "var(--surface-soft)",
                        color:
                          event.item_type === "event" ? "#7a5b00" :
                          event.item_type === "deal" ? "var(--primary)" :
                          "var(--text)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {event.item_type}
                    </span>
                  )}
                </div>
              </div>
              <div className="actions" style={{ marginTop: "1rem" }}>
                {event.approval_status === "pending" && (
                  <>
                    <button
                      className="btn btn-primary"
                      style={{ height: 40, padding: "0 1rem", fontSize: "0.9rem" }}
                      onClick={() => handleApproval(event.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ height: 40, padding: "0 1rem", fontSize: "0.9rem" }}
                      onClick={() => handleApproval(event.id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
                {event.approval_status === "approved" && (
                  <>
                    <button
                      className="btn btn-secondary"
                      style={{ height: 40, padding: "0 1rem", fontSize: "0.9rem" }}
                      onClick={() => handleApproval(event.id, "pending")}
                    >
                      Move to Pending
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ height: 40, padding: "0 1rem", fontSize: "0.9rem" }}
                      onClick={() => handleApproval(event.id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
                {event.approval_status === "rejected" && (
                  <>
                    <button
                      className="btn btn-secondary"
                      style={{ height: 40, padding: "0 1rem", fontSize: "0.9rem" }}
                      onClick={() => handleApproval(event.id, "pending")}
                    >
                      Restore
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ height: 40, padding: "0 1rem", fontSize: "0.9rem" }}
                      onClick={() => setDeleteTarget(event)}
                    >
                      Delete Permanently
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Event?"
        message={
          deleteTarget
            ? `Are you sure you want to permanently delete "${deleteTarget.title}"? This cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={() => handleDelete(deleteTarget?._id)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
