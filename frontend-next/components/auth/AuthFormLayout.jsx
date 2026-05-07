"use client";

import Link from "next/link";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

export default function AuthFormLayout({
  variant = "login",
  avatar,
  title,
  subtitle,
  switchPrompt,
  switchHref,
  switchLabel,
  googleButtonMode,
  children,
}) {
  const heroClass = variant === "signup" ? "auth-hero auth-hero-signup" : "auth-hero";

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <div className={heroClass}>
        <div className="auth-overlay" />
        <div className="auth-shell">
          <div className="auth-brand-row">
            <Link href="/" className="auth-brand-link">
              <span className="auth-brand-icon">🎓</span> Student Hub
            </Link>
          </div>

          <div className="auth-mock-card">
            {avatar}
            <h1 className="auth-big-title">{title}</h1>
            <p className="auth-big-subtitle">{subtitle}</p>

            {children}

            <div className="auth-divider">
              <span />
              <p>OR</p>
              <span />
            </div>

            <GoogleAuthButton mode={googleButtonMode} />

            <div className="auth-trust-row">
              <span className="auth-trust-icon">🔒</span>
              <p>Your data is encrypted &amp; secure</p>
            </div>

            <p className="auth-switch-text">
              {switchPrompt}{" "}
              <Link href={switchHref}>{switchLabel}</Link>
            </p>
          </div>

          <p className="auth-legal">
            By continuing you agree to Student Hub&apos;s{" "}
            <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
