export default function SummaryBadge({ summary, compact = false }) {
  if (!summary) return null;

  return (
    <div
      style={{
        background: "var(--primary-soft)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        padding: compact ? "0.5rem 0.75rem" : "0.75rem 1rem",
        marginTop: compact ? "0.5rem" : "1rem",
        display: "flex",
        gap: "0.6rem",
        alignItems: "flex-start",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          color: "var(--primary)",
          fontSize: compact ? "0.85rem" : "1rem",
          flexShrink: 0,
          lineHeight: 1.4,
        }}
      >
        ✨
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "var(--primary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.2rem",
          }}
        >
          AI summary
        </div>
        <p
          style={{
            margin: 0,
            fontSize: compact ? "0.85rem" : "0.95rem",
            color: "var(--text)",
            lineHeight: 1.5,
          }}
        >
          {summary}
        </p>
      </div>
    </div>
  );
}
