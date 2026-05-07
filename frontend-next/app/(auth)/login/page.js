"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchJSON } from "@/lib/api";
import AuthFormLayout from "@/components/auth/AuthFormLayout";

export default function LoginPage() {
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
    <AuthFormLayout
      variant="login"
      avatar={<div className="auth-avatar-circle">👤</div>}
      title="Welcome back"
      subtitle="Sign in to access events, resources & deals"
      switchPrompt="Don't have an account?"
      switchHref="/signup"
      switchLabel="Sign up"
    >
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
    </AuthFormLayout>
  );
}
