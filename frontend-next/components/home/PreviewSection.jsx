"use client";

import Link from "next/link";

function PreviewCard({ item, onClick, truncateDescription }) {
  return (
    <div
      className="preview-card card preview-clickable"
      onClick={() => onClick(item)}
    >
      <span className="preview-badge">{item.category}</span>
      <h3>{item.title}</h3>
      {(item.date || item.location) && (
        <p className="preview-meta">
          {item.date}
          {item.date && item.location ? " · " : ""}
          {item.location}
        </p>
      )}
      <p>
        {truncateDescription
          ? `${item.description.slice(0, 90)}…`
          : item.description}
      </p>
    </div>
  );
}

export default function PreviewSection({
  title,
  viewAllHref,
  items,
  onItemClick,
  truncateDescription = false,
}) {
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        <Link href={viewAllHref} className="text-link">
          View all →
        </Link>
      </div>
      <div className="home-preview-grid">
        {items.map((item) => (
          <PreviewCard
            key={item.id}
            item={item}
            onClick={onItemClick}
            truncateDescription={truncateDescription}
          />
        ))}
      </div>
    </section>
  );
}
