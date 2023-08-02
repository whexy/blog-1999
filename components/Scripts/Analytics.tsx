// Loading the analytics script for the website.
// Currently using Umami(https://github.com/umami-software/umami) for analytics.

import Script from "next/script";
export default function Analytics() {
  return (
    <Script
      async
      defer
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_TRACKID}
      src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}></Script>
  );
}
