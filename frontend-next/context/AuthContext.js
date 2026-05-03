"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

const ADMIN_EMAILS = [
  "vedjigneshkumar.dabhi@sjsu.edu",
  "prabhjotsingh@sjsu.edu",
  "email3@sjsu.edu",
  "email4@sjsu.edu",
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const savedIsAdmin = localStorage.getItem("isAdmin") === "true";

    if (savedIsLoggedIn && savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
      setIsLoggedIn(true);
      setIsAdmin(savedIsAdmin);
    }
    setLoaded(true);
  }, []);

  const persistAuth = useCallback((authToken, authUser) => {
    const admin = ADMIN_EMAILS.includes(authUser.email?.toLowerCase());
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(authUser));
    localStorage.setItem("isAdmin", String(admin));

    setToken(authToken);
    setUser(authUser);
    setIsLoggedIn(true);
    setIsAdmin(admin);

    return admin;
  }, []);

  const login = useCallback(
    (authToken, authUser) => {
      const admin = persistAuth(authToken, authUser);
      router.push(admin ? "/admin" : "/home");
    },
    [persistAuth, router]
  );

  const signup = useCallback(
    (authToken, authUser) => {
      persistAuth(authToken, authUser);
      router.push("/home");
    },
    [persistAuth, router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    localStorage.setItem("isLoggedIn", "false");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, token, isAdmin, isLoggedIn, loaded, login, signup, logout, persistAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
