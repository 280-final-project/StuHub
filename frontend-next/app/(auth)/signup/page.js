"use client";

import { useState } from "react";
import Link from "next/link";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import { fetchJSON } from "@/lib/api";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

function SignupForm() {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const data = await fetchJSON("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ user_name: name, email, password }),
      });
      auth.signup(data.token, data.user);
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="auth-hero auth-hero-signup">
      <div className="auth-overlay" />
      <div className="auth-shell">
        <div className="auth-brand-row">
          <Link href="/" className="auth-brand-link">
            <span className="auth-brand-icon">🎓</span> Student Hub
          </Link>
        </div>

        <div className="auth-mock-card">
          <div className="auth-avatar-circle auth-avatar-combo">
            <span className="avatar-user">👤</span>
            <span className="avatar-plus">＋</span>
          </div>
          <h1 className="auth-big-title">Create your account</h1>
          <p className="auth-big-subtitle">
            Join Student Hub to discover events, resources &amp; deals
          </p>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Jane Spartan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {error && <span className="error-text">{error}</span>}

            <button type="submit" className="btn btn-primary full-width">
              Create Account
            </button>
          </form>

          <div className="auth-divider">
            <span />
            <p>OR</p>
            <span />
          </div>

          <GoogleAuthButton mode="signup" />

          <div className="auth-trust-row">
            <span className="auth-trust-icon">🔒</span>
            <p>Your data is encrypted &amp; secure</p>
          </div>

          <p className="auth-switch-text">
            Already have an account?{" "}
            <Link href="/login">Sign in</Link>
          </p>
        </div>

        <p className="auth-legal">
          By continuing you agree to Student Hub&apos;s{" "}
          <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <SignupForm />
    </GoogleOAuthProvider>
  );
}
