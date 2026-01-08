import AsciiAnimation from "@/components/UI/Website/404/AsciiAnimation";
import Link from "next/link";
import "./404.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* Terminal window - hidden on mobile */}
        <AsciiAnimation />

        {/* 404 Message */}
        <div className="message-container">
          <h1>404</h1>
          <p className="subtitle">Page Not Found</p>
          <p className="description">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/" className="button">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
