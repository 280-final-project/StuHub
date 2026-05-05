"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const searchItems = [
  { label: "Home", url: "/home", type: "Page", keywords: ["landing", "main", "dashboard", "studenthub", "student hub"] },
  { label: "Events", url: "/events", type: "Page", keywords: ["activities", "campus events", "upcoming"] },
  { label: "Resources", url: "/resources", type: "Page", keywords: ["student support", "services", "help"] },
  { label: "Deals", url: "/deals", type: "Page", keywords: ["discounts", "offers", "student deals"] },
  { label: "Add Event", url: "/events/new", type: "Page", keywords: ["submit event", "create event", "post event"] },
  { label: "About", url: "/about", type: "Page", keywords: ["features", "what is", "about us"] },
  { label: "Contact", url: "/contact", type: "Page", keywords: ["support", "help", "feedback", "email", "contact us"] },
  { label: "Career Center", url: "/resources", type: "Resource", keywords: ["resume", "interview", "jobs"] },
  { label: "Student Wellness Center", url: "/resources", type: "Resource", keywords: ["health", "mental health"] },
  { label: "Spotify Premium Student", url: "/deals", type: "Deal", keywords: ["music", "spotify"] },
  { label: "Amazon Prime Student", url: "/deals", type: "Deal", keywords: ["amazon", "prime", "shopping"] },
];

function getSearchScore(item, query) {
  const label = item.label.toLowerCase();
  const keywords = (item.keywords || []).join(" ").toLowerCase();
  let score = 0;
  if (label === query) score += 100;
  if (label.startsWith(query)) score += 60;
  if (label.includes(query)) score += 40;
  if (keywords.includes(query)) score += 20;
  const parts = query.split(" ").filter(Boolean);
  parts.forEach((part) => {
    if (label.startsWith(part)) score += 20;
    else if (label.includes(part)) score += 10;
    if (keywords.includes(part)) score += 6;
  });
  if (item.type === "Page") score += 3;
  return score;
}

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
        { href: "/login", label: "Login" },
        { href: "/signup", label: "Sign Up" },
        { href: "/events", label: "Events" },
        { href: "/resources", label: "Resources" },
        { href: "/deals", label: "Deals" },
      ];

  const matches = query.trim()
    ? searchItems
        .map((item) => ({ ...item, score: getSearchScore(item, query.trim().toLowerCase()) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 7)
    : [];

  return (
    <header className="site-header">
      <div className="inner">
        <Link className="brand" href={isLoggedIn ? "/home" : "/"}>
          Student Hub
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            type="button"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

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

          {isLoggedIn && (
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
          )}
        </div>
      </div>
    </header>
  );
}
