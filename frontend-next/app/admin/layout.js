"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }) {
  const { isLoggedIn, isAdmin, loaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loaded && (!isLoggedIn || !isAdmin)) {
      router.push("/login");
    }
  }, [loaded, isLoggedIn, isAdmin, router]);

  if (!loaded) return null;
  if (!isLoggedIn || !isAdmin) return null;

  return <>{children}</>;
}
