import "../styles/globals.css";
import "../styles/katex/katex.css";
import Head from "next/head";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import * as ga from "@/lib/ga";

export const ThemeContext = createContext(null);

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  /**  Light and Dark Theme */

  // Use sessionStorage to persist theme between page refreshes.
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    sessionStorage.setItem("theme", newTheme);
  };

  // Set default theme.
  useEffect(() => {
    const storedTheme = sessionStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const WindowPreferenceDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(WindowPreferenceDark ? "dark" : "light");
    }
  }, []);

  // Monitor system theme change events.
  useEffect(() => {
    const handleThemeChange = () => {
      const WindowPreferenceDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(WindowPreferenceDark ? "dark" : "light");
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleThemeChange);
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleThemeChange);
    };
  }, []);

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
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicon-16x16.png"
        />
        <link rel="manifest" href="/img/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/img/safari-pinned-tab.svg"
          color="#3b7ce7"
        />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#1D1D1F" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Wenxuan's blog"
          href="/feed/feed.xml"
        />
      </Head>
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
      <style jsx global>{`
        body {
          background-color: #1d1d1f;
        }
      `}</style>
      <Header />
      <div className={theme === "light" ? "" : "dark"}>
        <NextNProgress
          color="#dc4a41"
          options={{
            showSpinner: false,
          }}
        />
        <Component {...pageProps} />
      </div>
      <Footer />
    </ThemeContext.Provider>
  );
};

export default MyApp;
