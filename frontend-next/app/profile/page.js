"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchJSON, apiPatch, apiDelete } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/Skeleton";
import ProfileHeader from "@/components/profile/ProfileHeader";
import MyEventsSection from "@/components/profile/MyEventsSection";
import RegisteredEventsSection from "@/components/profile/RegisteredEventsSection";
import MyReviewsSection from "@/components/profile/MyReviewsSection";
import { toast } from "sonner";

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

      <MyEventsSection items={items} />

      <RegisteredEventsSection
        registrations={registrations}
        onCancel={handleCancelRegistration}
      />

      <MyReviewsSection reviews={reviews} />
    </div>
  );
}
