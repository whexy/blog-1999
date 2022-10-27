import Script from "next/script";
export default function Analytics() {
  return (
    <Script
      async
      defer
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_TRACKID}
      src="https://tc.shiwx.org/tc.js"
    ></Script>
  );
}
