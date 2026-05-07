"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchJSON, apiPatch, apiDelete } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/Skeleton";
import StarRating from "@/components/reviews/StarRating";
import ProfileHeader from "@/components/profile/ProfileHeader";
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

  async function handleSaveProfile(name, bio) {
    try {
      const updated = await apiPatch("/users/me", { user_name: name, bio });
      setData((d) => ({ ...d, user: { ...d.user, ...updated } }));
      if (persistAuth && authUser) {
        persistAuth(token, { ...authUser, name: updated.user_name });
      }
      toast.success("Profile updated.");
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  }

  async function handleCancelRegistration(eventId) {
    try {
      await apiDelete(`/items/${eventId}/register`);
      setData((d) => ({
        ...d,
        registrations: (d.registrations || []).filter((r) => r.id !== eventId),
      }));
      toast.success("Registration cancelled.");
    } catch (err) {
      toast.error(err.message);
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

  const { user, items, reviews, registrations = [] } = data;

  return (
    <div className="container section">
      <ProfileHeader user={user} onSave={handleSaveProfile} />

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
        <h2>Registered Events ({registrations.length})</h2>
        {registrations.length === 0 ? (
          <p className="empty">You haven&apos;t registered for any events yet.</p>
        ) : (
          <div className="grid" style={{ marginTop: "1rem" }}>
            {registrations.map((r) => (
              <div
                key={r.id}
                className="card"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Link
                  href={`/events/${r.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {r.image && <img src={r.image} alt={r.title} className="card-image" />}
                  <div className="card-body" style={{ paddingBottom: "0.5rem" }}>
                    <h3>{r.title}</h3>
                    {r.timeframe && <div className="meta">📅 {r.timeframe}</div>}
                    {r.location && <div className="meta">📍 {r.location}</div>}
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--success)",
                        marginTop: "0.5rem",
                      }}
                    >
                      ✓ Registered
                    </div>
                  </div>
                </Link>
                <div style={{ padding: "0 1rem 1rem 1rem" }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCancelRegistration(r.id);
                    }}
                    className="btn btn-secondary"
                    style={{
                      height: 36,
                      padding: "0 0.85rem",
                      fontSize: "0.85rem",
                      width: "100%",
                    }}
                  >
                    Cancel registration
                  </button>
                </div>
              </div>
            ))}
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
