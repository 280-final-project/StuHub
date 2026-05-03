"use client";

export default function Error({ error, reset }) {
  return (
    <div className="container section" style={{ textAlign: "center", padding: "4rem 0" }}>
      <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</div>
      <h2 className="page-title" style={{ fontSize: "1.5rem" }}>Something went wrong</h2>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
        {error?.message || "An unexpected error occurred."}
      </p>
      <button onClick={reset} className="btn btn-primary" style={{ padding: "0 2rem" }}>
        Try Again
      </button>
    </div>
  );
}
