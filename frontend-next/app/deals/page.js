"use client";

import { useState, useEffect } from "react";
import { fetchJSON } from "@/lib/api";
import { CardGridSkeleton } from "@/components/ui/Skeleton";

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchJSON("/items?type=deal");
        setDeals(Array.isArray(data) ? data : []);
      } catch {
        setDeals([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function openModal(deal) {
    setSelectedDeal(deal);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedDeal(null);
  }

  return (
    <div className="container resources-page">
      <div className="page-header">
        <h1 className="page-title">Deals</h1>
        <p className="page-subtitle">
          Exclusive discounts and freebies available to SJSU students.
        </p>
      </div>

      {loading ? (
        <CardGridSkeleton count={6} variant="resource" />
      ) : deals.length === 0 ? (
        <p className="empty">No deals available yet.</p>
      ) : (
        <div className="resources-grid">
          {deals.map((deal) => {
            const meta = deal.metadata || {};
            return (
              <div
                key={deal.id}
                className="info-card resource-card"
                onClick={() => openModal(deal)}
              >
                <div className="icon-chip blue">{meta.icon || "🎁"}</div>
                <h3>{deal.title}</h3>
                <p className="resource-card-desc">{deal.description}</p>
                <div className="resource-card-meta" style={{ marginTop: "0.75rem" }}>
                  <span>🕐 {deal.timeframe || "Always available"}</span>
                  <span>📍 {deal.location || "Online"}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && selectedDeal && (() => {
        const meta = selectedDeal.metadata || {};
        return (
          <div className="modal" onClick={closeModal}>
            <div
              className="modal-panel resource-modal-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>×</button>
              <h2 className="resource-modal-title">{selectedDeal.title}</h2>
              {Array.isArray(meta.badges) && meta.badges.length > 0 && (
                <div className="badge-row resource-badge-row">
                  {meta.badges.map((b, j) => (
                    <span key={j} className="badge">{b}</span>
                  ))}
                </div>
              )}
              <p className="resource-modal-desc">
                {meta.fullDescription || selectedDeal.description}
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
