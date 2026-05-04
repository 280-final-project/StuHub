"use client";

import { useState } from "react";

export default function StarRating({
  value = 0,
  onChange,
  size = 20,
  readOnly = false,
}) {
  const [hover, setHover] = useState(0);
  const display = hover || value || 0;

  return (
    <div
      style={{ display: "inline-flex", gap: 2, lineHeight: 1 }}
      onMouseLeave={() => setHover(0)}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={value ? `${value} out of 5 stars` : "rate this event"}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= display;
        return (
          <button
            key={n}
            type="button"
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(n)}
            onClick={() => !readOnly && onChange?.(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: readOnly ? "default" : "pointer",
              fontSize: size,
              color: filled ? "#facc15" : "var(--border)",
              transition: "color 0.1s ease, transform 0.1s ease",
              transform: !readOnly && hover === n ? "scale(1.15)" : "none",
              lineHeight: 1,
            }}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
