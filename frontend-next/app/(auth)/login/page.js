"use client";

import { useState } from "react";
import Link from "next/link";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import { fetchJSON } from "@/lib/api";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

function LoginForm() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await fetchJSON("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      auth.login(data.token, data.user);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-hero">
      <div className="auth-overlay" />
      <div className="auth-shell">
        <div className="auth-brand-row">
          <Link href="/" className="auth-brand-link">
            <span className="auth-brand-icon">🎓</span> CampusHub
          </Link>
        </div>

        <div className="auth-mock-card">
          <div className="auth-avatar-circle">👤</div>
          <h1 className="auth-big-title">Welcome back</h1>
          <p className="auth-big-subtitle">
            Sign in to access events, resources &amp; deals
          </p>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@sjsu.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <span className="error-text">{error}</span>}

            <button type="submit" className="btn btn-primary full-width">
              Sign In
            </button>
          </form>

          <div className="auth-divider">
            <span />
            <p>OR</p>
            <span />
          </div>

          <GoogleAuthButton />

          <div className="auth-trust-row">
            <span className="auth-trust-icon">🔒</span>
            <p>Your data is encrypted &amp; secure</p>
          </div>

          <p className="auth-switch-text">
            Don&apos;t have an account?{" "}
            <Link href="/signup">Sign up</Link>
          </p>
        </div>

        <p className="auth-legal">
          By continuing you agree to CampusHub&apos;s{" "}
          <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <LoginForm />
    </GoogleOAuthProvider>
  );
}
