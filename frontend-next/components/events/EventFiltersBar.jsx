"use client";

const FIELD_STYLE = {
  height: 40,
  padding: "0 0.75rem",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  background: "var(--surface)",
  color: "var(--text)",
  fontSize: "0.9rem",
};

const LABEL_STYLE = { fontSize: "0.75rem", color: "var(--muted)" };

function FilterField({ label, flex, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex }}>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
    </div>
  );
}

export default function EventFiltersBar({
  query,
  onQueryChange,
  from,
  onFromChange,
  to,
  onToChange,
  location,
  onLocationChange,
  locationOptions,
  hasActiveFilters,
  onClear,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
        alignItems: "flex-end",
        marginTop: "1.25rem",
        padding: "1rem",
        background: "var(--surface-soft)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <FilterField label="Search" flex="1 1 220px">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Pizza, hackathon, career fair…"
          style={FIELD_STYLE}
        />
      </FilterField>

      <FilterField label="From">
        <input
          type="date"
          value={from}
          onChange={(e) => onFromChange(e.target.value)}
          style={{ ...FIELD_STYLE, padding: "0 0.5rem" }}
        />
      </FilterField>

      <FilterField label="To">
        <input
          type="date"
          value={to}
          onChange={(e) => onToChange(e.target.value)}
          style={{ ...FIELD_STYLE, padding: "0 0.5rem" }}
        />
      </FilterField>

      <FilterField label="Location" flex="0 1 220px">
        <select
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          style={{ ...FIELD_STYLE, padding: "0 0.5rem" }}
        >
          {locationOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </FilterField>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="btn btn-secondary"
          style={{ height: 40, padding: "0 1rem", fontSize: "0.85rem" }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
