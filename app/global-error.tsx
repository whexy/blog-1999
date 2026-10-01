"use client";

import { useEffect } from "react";
import Link from "next/link";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Last-resort boundary for errors thrown by a root layout. It
// replaces the whole document, so it must render <html> and <body>
// and cannot rely on the site stylesheet.
export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}>
        <h1>Something went wrong.</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="button" onClick={() => reset()}>
            Try again
          </button>
          <Link href="/">Return to Homepage</Link>
        </div>
      </body>
    </html>
  );
}
