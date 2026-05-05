export default function AboutPage() {
  const team = [
    "Arvin Andiappan",
    "Prabhjot Singh",
    "Rafael Caculba",
    "Ved Jigneshkumar Dabhi",
  ];

  return (
    <div className="container section">
      <div className="page-header">
        <h1 className="page-title">About</h1>
        <p className="page-subtitle">
          Learn more about Student Hub and the team behind it.
        </p>
      </div>

      <div className="about-copy">
        <p style={{ lineHeight: 1.7, color: "var(--muted)" }}>
          Student Hub is a student-built platform designed to help San José State
          University students discover campus events, access academic resources,
          and find the best local deals — all in one place. Our mission is to
          make campus life easier, more connected, and more fun.
        </p>
      </div>

      <div className="section">
        <h2>Our Team</h2>
        <div className="team-grid">
          {team.map((name) => (
            <div className="card" key={name}>
              <div className="card-body">
                <h3>{name}</h3>
                <p>Team Member</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section" id="contact">
        <h2>Contact</h2>
        <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
          Have questions or feedback? Reach out to us at{" "}
          <a href="mailto:team@studenthub.dev" className="text-link">
            team@studenthub.dev
          </a>
        </p>
      </div>
    </div>
  );
}
