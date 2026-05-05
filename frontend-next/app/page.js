"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const LINES = [
  "Discover campus events, academic resources,",
  "and student deals — all in one place.",
];

export default function LandingPage() {
  const heroRef = useRef(null);
  const [showExplore, setShowExplore] = useState(false);

  useEffect(() => {
    const container = heroRef.current;
    if (!container) return;

    const lineEls = container.querySelectorAll(".hero-line");
    let globalIndex = 0;

    lineEls.forEach((lineEl) => {
      const text = lineEl.textContent;
      lineEl.textContent = "";

      [...text].forEach((ch) => {
        const span = document.createElement("span");
        span.className = "letter";
        span.textContent = ch === " " ? "\u00A0" : ch;
        span.style.animationDelay = `${globalIndex * 30}ms`;
        lineEl.appendChild(span);
        globalIndex++;
      });
    });

    const totalDuration = globalIndex * 30 + 400;
    const timer = setTimeout(() => setShowExplore(true), totalDuration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-body">
      <header className="landing-header">
        <div className="actions">
          <Link href="/login" className="btn btn-secondary">
            Login
          </Link>
          <Link href="/signup" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </header>

      <section className="landing-hero">
        <div className="hero-content" ref={heroRef}>
          <h1>Student Hub</h1>
          {LINES.map((line, i) => (
            <p className="hero-line" key={i}>
              {line}
            </p>
          ))}
          <Link
            href="/home"
            className={`explore-btn btn btn-primary${showExplore ? " show" : ""}`}
          >
            Explore <span className="explore-arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
