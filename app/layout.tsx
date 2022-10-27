/* eslint-disable react/no-unknown-property */
import "../styles/globals.css";
import "../styles/prism/prism-dark.css";
import "../styles/katex/katex.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
import Analytics from "@/components/Analytics";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
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
        <Analytics />
      </head>
      <body>
        <Header />
        <main className="min-h-[80vh] bg-gray-100 text-black-readable dark:bg-black dark:text-white-readable">
          <div className="mx-auto max-w-6xl px-2">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
