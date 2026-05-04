"use client";

import { useState, useEffect } from "react";
import { fetchJSON } from "@/lib/api";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchJSON("/items?type=resource");
        setResources(Array.isArray(data) ? data : []);
      } catch {
        setResources([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function openModal(resource) {
    setSelectedResource(resource);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedResource(null);
  }

  return (
    <div className="container resources-page">
      <div className="page-header">
        <h1 className="page-title">Resources</h1>
        <p className="page-subtitle">
          Explore important campus resources for SJSU students.
        </p>
      </div>

      {loading ? (
        <p className="empty">Loading resources…</p>
      ) : resources.length === 0 ? (
        <p className="empty">No resources available yet.</p>
      ) : (
        <div className="resources-grid">
          {resources.map((resource) => {
            const meta = resource.metadata || {};
            return (
              <div
                key={resource.id}
                className="info-card resource-card"
                onClick={() => openModal(resource)}
              >
                <div className="icon-chip blue">{meta.icon || "📌"}</div>
                <h3>{resource.title}</h3>
                <p className="resource-card-desc">{resource.description}</p>
                <div className="resource-card-meta" style={{ marginTop: "0.75rem" }}>
                  <span>🕐 {resource.timeframe || "Hours vary"}</span>
                  <span>📍 {resource.location || "On campus"}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && selectedResource && (() => {
        const meta = selectedResource.metadata || {};
        return (
          <div className="modal" onClick={closeModal}>
            <div
              className="modal-panel resource-modal-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>×</button>
              <h2 className="resource-modal-title">{selectedResource.title}</h2>
              {Array.isArray(meta.badges) && meta.badges.length > 0 && (
                <div className="badge-row resource-badge-row">
                  {meta.badges.map((b, j) => (
                    <span key={j} className="badge">{b}</span>
                  ))}
                </div>
              )}
              <p className="resource-modal-desc">
                {meta.fullDescription || selectedResource.description}
              </p>
              {Array.isArray(meta.details) && meta.details.length > 0 && (
                <>
                  <hr className="resource-modal-divider" />
                  <div className="resource-modal-details-grid">
                    {meta.details.map((d, k) => (
                      <div key={k} className="resource-modal-detail-block">
                        <span className="resource-modal-detail-label">{d.label}</span>
                        <span className="resource-modal-detail-value">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
