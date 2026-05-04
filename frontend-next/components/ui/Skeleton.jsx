export function Skeleton({ width = "100%", height = "1rem", radius = "6px", style }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background:
          "linear-gradient(90deg, var(--surface-soft) 0%, var(--border) 50%, var(--surface-soft) 100%)",
        backgroundSize: "200% 100%",
        animation: "stuhub-skeleton 1.4s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div
      className="card"
      style={{
        padding: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Skeleton height={160} radius={0} />
      <div style={{ padding: "0.75rem 1rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Skeleton height="1.1rem" width="80%" />
        <Skeleton height="0.8rem" width="55%" />
        <Skeleton height="0.8rem" width="40%" />
      </div>
    </div>
  );
}

export function ResourceCardSkeleton() {
  return (
    <div
      className="info-card resource-card"
      style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}
    >
      <Skeleton width={44} height={44} radius="12px" />
      <Skeleton height="1.05rem" width="70%" />
      <Skeleton height="0.8rem" width="95%" />
      <Skeleton height="0.8rem" width="60%" />
    </div>
  );
}

export function CardGridSkeleton({ count = 6, variant = "card" }) {
  const Card = variant === "resource" ? ResourceCardSkeleton : CardSkeleton;
  return (
    <div className={variant === "resource" ? "resources-grid" : "grid"} style={{ marginTop: "1.5rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} />
      ))}
    </div>
  );
}
