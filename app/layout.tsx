/* eslint-disable react/no-unknown-property */
import "../styles/globals.css";
import "../styles/prism/prism-dark.css";
import "../styles/katex/katex.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
import Analytics from "@/components/Analytics";

import { Lato } from "@next/font/google";
import { Noto_Sans_SC } from "@next/font/google";
import { Fira_Sans } from "@next/font/google";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  adjustFontFallback: false,
});

const noto_sans_sc = Noto_Sans_SC({
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-notosans",
  preload: false,
});

const fira = Fira_Sans({
  weight: ["100", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${lato.variable} ${noto_sans_sc.variable} ${fira.variable}`}
    >
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
          title="Whexy's blog"
          href="/feed/feed.xml"
        />
        <Analytics />
      </head>
      <body>
        <Header />
        <main className="min-h-[80vh] bg-gray-100 text-black-readable">
          <div className="mx-auto max-w-6xl px-2">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
