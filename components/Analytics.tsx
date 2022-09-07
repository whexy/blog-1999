import { useRouter } from "next/router";
import { useEffect } from "react";
import * as ga from "@/lib/ga";
import Script from "next/script";

export default function Analytics() {
  const router = useRouter();
  /* Google Analytics */
  useEffect(() => {
    const handleRouteChange = url => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });
              `,
        }}
      />
      <Script
        async
        defer
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_TRACKID}
        src="https://tc.shiwx.org/tc.js"
      ></Script>
    </>
  );
}
