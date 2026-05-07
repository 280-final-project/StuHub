"use client";

export default function RegistrationPanel({
  count,
  isRegistered,
  isAuthenticated,
  onToggle,
}) {
  const buttonLabel = !isAuthenticated
    ? "Sign in to register"
    : isRegistered
    ? "Cancel registration"
    : "Register";

  const countLabel =
    count > 0
      ? `${count} ${count === 1 ? "person is" : "people are"} attending`
      : "Be the first to register";

  return (
    <div
      style={{
        marginTop: "1.25rem",
        padding: "0.85rem 1rem",
        background: "var(--surface-soft)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        display: "flex",
        gap: "0.85rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: 160 }}>
        <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{countLabel}</div>
        {isRegistered && (
          <div style={{ fontSize: "0.8rem", color: "var(--success)", marginTop: "0.2rem" }}>
            ✓ You&apos;re registered
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={isRegistered ? "btn btn-secondary" : "btn btn-primary"}
        style={{ height: 40, padding: "0 1.1rem", fontSize: "0.9rem" }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
