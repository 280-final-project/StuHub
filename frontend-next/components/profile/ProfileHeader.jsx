"use client";

import { useState } from "react";

export default function ProfileHeader({ user, onSave }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.user_name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [saving, setSaving] = useState(false);

  const initials = (user.user_name || "?").charAt(0).toUpperCase();

  async function handleSubmit() {
    setSaving(true);
    const ok = await onSave(name, bio);
    setSaving(false);
    if (ok) setEditing(false);
  }

  function handleCancel() {
    setEditing(false);
    setName(user.user_name || "");
    setBio(user.bio || "");
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        alignItems: "flex-start",
        flexWrap: "wrap",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: user.pfp_url ? "transparent" : "var(--primary-soft)",
          color: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.4rem",
          fontWeight: 700,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {user.pfp_url ? (
          <img
            src={user.pfp_url}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          initials
        )}
      </div>

      <div style={{ flex: 1, minWidth: 240 }}>
        {editing ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                fontSize: "1.5rem",
                fontWeight: 700,
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                background: "var(--surface)",
                color: "var(--text)",
                marginBottom: "0.75rem",
              }}
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Add a short bio…"
              rows={3}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                background: "var(--surface)",
                color: "var(--text)",
                marginBottom: "0.75rem",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={saving}
                style={{ height: 40, padding: "0 1rem" }}
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
                style={{ height: 40, padding: "0 1rem" }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ marginTop: 0, marginBottom: "0.25rem" }}>{user.user_name}</h1>
            <p style={{ margin: "0 0 0.5rem 0", color: "var(--muted)", fontSize: "0.9rem" }}>
              {user.email}
            </p>
            {user.bio ? (
              <p style={{ margin: "0 0 1rem 0", lineHeight: 1.6 }}>{user.bio}</p>
            ) : (
              <p style={{ margin: "0 0 1rem 0", color: "var(--muted)", fontStyle: "italic" }}>
                No bio yet.
              </p>
            )}
            <button
              className="btn btn-secondary"
              onClick={() => setEditing(true)}
              style={{ height: 36, padding: "0 0.9rem", fontSize: "0.85rem" }}
            >
              Edit profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}
