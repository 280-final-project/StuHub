"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchJSON } from "@/lib/api";
import AuthFormLayout from "@/components/auth/AuthFormLayout";

export default function SignupPage() {
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

  const avatar = (
    <div className="auth-avatar-circle auth-avatar-combo">
      <span className="avatar-user">👤</span>
      <span className="avatar-plus">＋</span>
    </div>
  );

  return (
    <AuthFormLayout
      variant="signup"
      avatar={avatar}
      title="Create your account"
      subtitle="Join Student Hub to discover events, resources & deals"
      switchPrompt="Already have an account?"
      switchHref="/login"
      switchLabel="Sign in"
      googleButtonMode="signup"
    >
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
    </AuthFormLayout>
  );
}
