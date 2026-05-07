"use client";

export default function HomePreviewModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-panel home-event-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="home-modal-top">
          <div className="home-modal-icon">{item.icon}</div>
          <div className="home-modal-heading">
            <h2>{item.title}</h2>
            {item.date && (
              <p className="home-event-modal-meta">
                {item.date}
                {item.location && ` · ${item.location}`}
              </p>
            )}
            {item.category && (
              <span className="preview-badge" style={{ marginTop: "0.5rem" }}>
                {item.category}
              </span>
            )}
          </div>
        </div>
        <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>{item.description}</p>
      </div>
    </div>
  );
}
