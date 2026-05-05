import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      icon: "📅",
      title: "Campus Events",
      desc: "One feed for community-posted events and live updates from events.sjsu.edu — search by date, building, or keyword.",
    },
    {
      icon: "🏷️",
      title: "Student Deals",
      desc: "A curated list of verified student discounts on software, food, transit, and entertainment — with quick-access details.",
    },
    {
      icon: "🧭",
      title: "Campus Resources",
      desc: "A directory of SJSU support services — career, wellness, food pantry, tutoring, financial aid, and more.",
    },
    {
      icon: "✨",
      title: "AI Summaries",
      desc: "Every event card carries a one-sentence AI-generated summary so you can scan dozens of events in seconds.",
    },
    {
      icon: "💬",
      title: "AI Assistant",
      desc: "Ask the floating chat anything — “free food this week?”, “where do I get my resume reviewed?” — and get a typed answer with clickable links.",
    },
    {
      icon: "⭐",
      title: "Star Reviews",
      desc: "Rate and review events you attended. Aggregate ratings help future Spartans decide what's worth their time.",
    },
  ];

  return (
    <div className="container section">
      <div className="page-header">
        <h1 className="page-title">About Student Hub</h1>
        <p className="page-subtitle">
          A one-stop platform for San José State University students.
        </p>
      </div>

      <div className="about-copy">
        <p style={{ lineHeight: 1.7, color: "var(--muted)" }}>
          <strong>Student Hub</strong> is a web application built to help SJSU
          students get the most out of campus life. Instead of bouncing between
          a dozen pages — the SJSU events calendar, scattered student-discount
          sites, the help-desk directory, group chats — Student Hub pulls the
          three most useful kinds of information into one feed: <em>events</em>,{" "}
          <em>deals</em>, and <em>campus resources</em>. Each one is searchable,
          filterable, and summarized by AI so you spend less time scrolling and
          more time showing up.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--muted)", marginTop: "1rem" }}>
          The platform also lets students post their own events, leave star-rated
          reviews, and chat with an AI assistant that only answers from real,
          approved campus content — no hallucinations, no off-topic tangents.
          Admins moderate community-posted events through a built-in approval
          flow so the feed stays trustworthy.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--muted)", marginTop: "1rem" }}>
          Student Hub is a final project for{" "}
          <strong>CMPE-280: Web Design</strong> at San José State University —
          built end-to-end by Spartans, for Spartans.
        </p>
      </div>

      <div className="section">
        <h2>What you can do</h2>
        <div className="resources-grid" style={{ marginTop: "1rem" }}>
          {features.map((f) => (
            <div className="info-card resource-card" key={f.title}>
              <div className="icon-chip blue">{f.icon}</div>
              <h3>{f.title}</h3>
              <p className="resource-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section" style={{ textAlign: "center" }}>
        <h2>Got questions?</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
          We&apos;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="btn btn-primary"
          style={{ display: "inline-flex", marginTop: "1rem", padding: "0 1.5rem" }}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
