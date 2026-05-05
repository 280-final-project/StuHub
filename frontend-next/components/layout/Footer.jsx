import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="inner">
        <div className="brand" style={{ fontSize: "1.15rem" }}>
          Student Hub
        </div>
        <div className="nav-links">
          <Link href="/about">About</Link>
          <Link href="/about#contact">Contact</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        Built with ❤️ by the Student Hub Team
      </div>
    </footer>
  );
}
