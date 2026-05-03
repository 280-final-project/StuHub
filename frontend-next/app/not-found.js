import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: "center", padding: "4rem 0" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
      <h2 className="page-title" style={{ fontSize: "2rem" }}>Page Not Found</h2>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
        The page you are looking for does not exist.
      </p>
      <Link href="/home" className="btn btn-primary" style={{ padding: "0 2rem" }}>
        Go Home
      </Link>
    </div>
  );
}
