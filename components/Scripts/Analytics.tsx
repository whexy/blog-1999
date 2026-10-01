// Loading the analytics script for the website.
// Currently using Umami(https://github.com/umami-software/umami) for analytics.

import Script from "next/script";

export default function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_TRACKID;
  const src = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  if (!websiteId || !src) return null;

  return (
    <Script
      strategy="afterInteractive"
      data-website-id={websiteId}
      src={src}
    />
  );
}
