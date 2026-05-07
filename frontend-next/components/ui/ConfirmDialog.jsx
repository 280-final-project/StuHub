"use client";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "btn-danger",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal" onClick={onCancel}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onCancel}>×</button>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <p>{message}</p>
        <div className="actions" style={{ marginTop: "1.5rem" }}>
          <button
            className={`btn ${confirmVariant}`}
            style={{ padding: "0 1.5rem" }}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
          <button
            className="btn btn-secondary"
            style={{ padding: "0 1.5rem" }}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
