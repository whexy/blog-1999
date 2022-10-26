/* eslint-disable react/no-unknown-property */
import "../styles/globals.css";
import "../styles/prism/prism-dark.css";
import "../styles/katex/katex.css";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

import NextNProgress from "nextjs-progressbar";
import store, { AppState } from "@/store/store";
import { Provider } from "react-redux";

// theme
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode, unsetDarkMode } from "@/store/themeSlice";

// analytics
import Analytics from "@/components/Analytics";

const Theme = ({ children }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(
    (state: AppState) => state.theme.darkMode,
  );
  // Set default theme.
  useEffect(() => {
    const handleThemeChange = () => {
      const WindowPreferenceDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (WindowPreferenceDark) {
        dispatch(setDarkMode());
      } else {
        dispatch(unsetDarkMode());
      }
    };
    // set theme for the first time
    handleThemeChange();
    // monitor theme change
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleThemeChange);
    // unregister theme change monitor after exit
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleThemeChange);
    };
  }, [dispatch]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <NextNProgress
        color="#dc4a41"
        options={{
          showSpinner: false,
        }}
      />
      <div>{children}</div>
    </div>
  );
};

const MyApp = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <Provider store={store}>
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
          rel="preload"
          href="/fonts/noto-serif-sc-v22-chinese-simplified-regular.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/fonts/noto-serif-sc-v22-chinese-simplified-700.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="mask-icon"
          href="/img/safari-pinned-tab.svg"
          color="#3b7ce7"
        />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#171717" />
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
      <Analytics />
      <style jsx global>{`
        body {
          background-color: #171717;
        }
      `}</style>
      <Header />
      <Theme>
        <Component {...pageProps} />
      </Theme>
      <Footer />
    </Provider>
  );
};

export default MyApp;
