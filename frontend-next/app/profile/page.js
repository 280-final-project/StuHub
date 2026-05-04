"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchJSON, apiPatch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/Skeleton";
import StarRating from "@/components/reviews/StarRating";
import { toast } from "sonner";

function statusColor(status) {
  if (status === "approved") return { bg: "var(--primary-soft)", color: "var(--primary)" };
  if (status === "rejected") return { bg: "#fee2e2", color: "var(--danger)" };
  return { bg: "var(--accent-soft)", color: "#7a5b00" };
}

export default function ProfilePage() {
  const router = useRouter();
  const { token, isLoggedIn, loaded, persistAuth, user: authUser } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loaded && !isLoggedIn) router.push("/login");
  }, [loaded, isLoggedIn, router]);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    async function load() {
      try {
        const json = await fetchJSON("/users/me");
        if (cancelled) return;
        setData(json);
        setBio(json.user.bio || "");
        setName(json.user.user_name || "");
      } catch (err) {
        if (!cancelled) toast.error(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function handleSave() {
    setSaving(true);
    try {
      const updated = await apiPatch("/users/me", { user_name: name, bio });
      setData((d) => ({ ...d, user: { ...d.user, ...updated } }));
      if (persistAuth && authUser) {
        persistAuth(token, { ...authUser, name: updated.user_name });
      }
      toast.success("Profile updated.");
      setEditing(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (!loaded || loading) {
    return (
      <div className="container section">
        <Skeleton width={140} height={140} radius="50%" style={{ marginBottom: "1rem" }} />
        <Skeleton width={240} height="1.5rem" style={{ marginBottom: "0.5rem" }} />
        <Skeleton width={320} height="0.9rem" style={{ marginBottom: "1.5rem" }} />
        <Skeleton width="100%" height="120px" />
      </div>
    );
  }

  if (!data) return null;

  const { user, items, reviews } = data;
  const initials = (user.user_name || "?").charAt(0).toUpperCase();

  return (
    <div className="container section">
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
                  onClick={handleSave}
                  disabled={saving}
                  style={{ height: 40, padding: "0 1rem" }}
                >
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditing(false);
                    setName(user.user_name || "");
                    setBio(user.bio || "");
                  }}
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

      <div className="section">
        <h2>My Events ({items.length})</h2>
        {items.length === 0 ? (
          <p className="empty">You haven&apos;t posted any events yet.</p>
        ) : (
          <div className="grid" style={{ marginTop: "1rem" }}>
            {items.map((it) => {
              const sc = statusColor(it.approval_status);
              return (
                <Link
                  key={it.id}
                  href={`/events/${it.id}`}
                  className="card"
                  style={{ textDecoration: "none" }}
                >
                  {it.image && <img src={it.image} alt={it.title} className="card-image" />}
                  <div className="card-body">
                    <h3>{it.title}</h3>
                    {it.timeframe && <div className="meta">📅 {it.timeframe}</div>}
                    {it.location && <div className="meta">📍 {it.location}</div>}
                    <div className="meta" style={{ marginTop: "0.5rem" }}>
                      <span
                        className="badge"
                        style={{
                          fontSize: "0.7rem",
                          padding: "0.25rem 0.6rem",
                          background: sc.bg,
                          color: sc.color,
                          border: "1px solid var(--border)",
                        }}
                      >
                        {it.approval_status}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="section">
        <h2>My Reviews ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <p className="empty">You haven&apos;t posted any reviews yet.</p>
        ) : (
          <div className="reviews-list" style={{ marginTop: "1rem" }}>
            {reviews.map((r) => (
              <Link
                key={r.id}
                href={`/events/${r.item_id}`}
                className="card"
                style={{ overflow: "visible", textDecoration: "none" }}
              >
                <div className="card-body">
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    on <strong style={{ color: "var(--text)" }}>{r.item_name}</strong>
                  </div>
                  {r.rating ? (
                    <div style={{ marginBottom: "0.4rem" }}>
                      <StarRating value={r.rating} readOnly size={16} />
                    </div>
                  ) : null}
                  {r.header && <h3 style={{ margin: "0 0 0.3rem 0" }}>{r.header}</h3>}
                  {r.desc && <p style={{ margin: 0 }}>{r.desc}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
