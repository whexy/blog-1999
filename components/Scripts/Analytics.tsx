// Loading the analytics script for the website.
// Currently using Umami(https://github.com/umami-software/umami) for analytics.

import Script from "next/script";
import { siteUrl } from "@/lib/site";

export default function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_TRACKID;
  const src = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  if (!websiteId || !src) return null;

  return (
    <Script
      strategy="afterInteractive"
      data-website-id={websiteId}
      // Keeps Vercel preview deployments out of the stats.
      data-domains={new URL(siteUrl).hostname}
      // The table of contents rewrites the hash on every click, which
      // the tracker would otherwise record as a pageview of
      // `/posts/slug#heading`.
      data-exclude-hash="true"
      data-performance="true"
      src={src}
    />
  );
}
