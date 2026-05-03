import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <div className="confirmation">
      <div className="confirmation-box">
        <div className="confirmation-icon">✅</div>
        <h1 className="page-title">You&apos;re All Set!</h1>
        <p className="lead">
          Your action was completed successfully. Explore events or head back to
          your dashboard.
        </p>
        <div className="actions" style={{ justifyContent: "center", marginTop: "1.5rem" }}>
          <Link href="/home" className="btn btn-primary confirmation-box">
            Go to Dashboard
          </Link>
          <Link href="/events" className="btn btn-secondary confirmation-box">
            Browse Events
          </Link>
        </div>
      </div>
    </div>
  );
}
