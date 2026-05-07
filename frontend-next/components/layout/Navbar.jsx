"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { searchNavItems } from "@/lib/navSearch";

export default function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navItems = isLoggedIn && isAdmin
    ? [
        { href: "/home", label: "Home" },
        { href: "/events", label: "Events" },
        { href: "/resources", label: "Resources" },
        { href: "/deals", label: "Deals" },
        { href: "/admin", label: "Admin" },
      ]
    : isLoggedIn
    ? [
        { href: "/home", label: "Home" },
        { href: "/events", label: "Events" },
        { href: "/resources", label: "Resources" },
        { href: "/deals", label: "Deals" },
        { href: "/events/new", label: "Add Event" },
      ]
    : [
        { href: "/home", label: "Home" },
        { href: "/events", label: "Events" },
        { href: "/resources", label: "Resources" },
        { href: "/deals", label: "Deals" },
      ];

  const matches = searchNavItems(query);

  return (
    <header className="site-header">
      <div className="inner">
        {/* LEFT: brand + primary nav links */}
        <div className="nav-left">
          <Link className="brand" href={isLoggedIn ? "/home" : "/"}>
            Student Hub
          </Link>
          <nav className="nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* CENTER: search */}
        <div className="nav-center">
          <div className="search-wrap">
            <span className="icon">🔎</span>
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search"
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && query.trim() && (
              <div className="search-suggestions show">
                {matches.length === 0 ? (
                  <div className="suggestion-item">
                    <div className="suggestion-title">No results found</div>
                  </div>
                ) : (
                  matches.map((item) => (
                    <Link
                      key={item.label}
                      href={item.url}
                      className="suggestion-item"
                      onClick={() => {
                        setQuery("");
                        setShowSuggestions(false);
                      }}
                    >
                      <div className="suggestion-title">{item.label}</div>
                      <div className="suggestion-type">{item.type}</div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: auth + theme toggle */}
        <div className="nav-right">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                aria-label="Profile"
                title={user?.user_name || user?.name || "Profile"}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: user?.pfp_url ? "transparent" : "var(--primary-soft)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  flexShrink: 0,
                }}
              >
                {user?.pfp_url ? (
                  <img
                    src={user.pfp_url}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  (user?.user_name || user?.name || "?").charAt(0).toUpperCase()
                )}
              </Link>
              <button onClick={logout} className="nav-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="btn btn-secondary"
                style={{ height: 40, padding: "0 1rem", fontSize: "0.9rem" }}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="btn btn-primary"
                style={{ height: 40, padding: "0 1rem", fontSize: "0.9rem" }}
              >
                Sign Up
              </Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            type="button"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}
