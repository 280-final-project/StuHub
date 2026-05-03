"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchJSON, apiPatch, apiDelete } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function ManageEvents() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadEvents = useCallback(async () => {
    try {
      const data = await fetchJSON("/items/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

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
      await loadEvents();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await apiDelete(`/items/${id}`, { "x-admin": "true" });
      setDeleteTarget(null);
      await loadEvents();
    } catch (err) {
      alert(err.message);
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
            <div key={event._id} className="admin-event-card">
              {event.image_url && (
                <div className="admin-event-thumb">
                  <img src={event.image_url} alt={event.title} />
                </div>
              )}
              <div className="admin-event-content">
                <h3>{event.title}</h3>
                <p>{event.details || event.description}</p>
                <span className={`status ${event.approval_status}`}>
                  {event.approval_status}
                </span>
              </div>
              <div className="actions" style={{ marginTop: "1rem" }}>
                {event.approval_status === "pending" && (
                  <>
                    <button
                      className="btn btn-primary"
                      style={{ height: 40, padding: "0 1rem", fontSize: "0.9rem" }}
                      onClick={() => handleApproval(event._id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ height: 40, padding: "0 1rem", fontSize: "0.9rem" }}
                      onClick={() => handleApproval(event._id, "rejected")}
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
                      onClick={() => handleApproval(event._id, "pending")}
                    >
                      Move to Pending
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ height: 40, padding: "0 1rem", fontSize: "0.9rem" }}
                      onClick={() => handleApproval(event._id, "rejected")}
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
                      onClick={() => handleApproval(event._id, "pending")}
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

      {deleteTarget && (
        <div className="modal" onClick={() => setDeleteTarget(null)}>
          <div
            className="modal-panel"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 440, textAlign: "center" }}
          >
            <h2 style={{ marginTop: 0 }}>Delete Event?</h2>
            <p className="muted">
              Are you sure you want to permanently delete{" "}
              <strong>"{deleteTarget.title}"</strong>? This cannot be undone.
            </p>
            <div
              className="actions"
              style={{ justifyContent: "center", marginTop: "1.5rem" }}
            >
              <button
                className="btn btn-secondary"
                style={{ height: 44, padding: "0 1.25rem" }}
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                style={{ height: 44, padding: "0 1.25rem" }}
                onClick={() => handleDelete(deleteTarget._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
