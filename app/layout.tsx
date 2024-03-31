/* eslint-disable react/no-unknown-property */
import "../styles/globals.css";
import "../styles/prism/prism-dark.css";
import "../styles/katex/katex.css";
import "../styles/adobe/zsu0zxb.css";
import Header from "@/components/UI/Website/Header";
import Footer from "@/components/UI/Website/Footer";
import React from "react";
import Analytics from "@/components/Scripts/Analytics";

import { Lato } from "next/font/google";
import { Noto_Sans_SC } from "next/font/google";
import { Fira_Sans } from "next/font/google";

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
      className={`${lato.variable} ${noto_sans_sc.variable} ${fira.variable}`}>
      <body>
        <Analytics />
        <Header />
        <main className="min-h-[80vh] bg-gray-100 text-black-readable">
          <div className="mx-auto max-w-5xl px-2">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

export const metadata = {
  title: "Whexy",
  description: "CS PhD student at Northwestern.",
  icons: {
    icon: "/img/favicon-32x32.png",
    apple: "/img/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/img/safari-pinned-tab.svg" }],
  },
  alternates: {
    types: {
      "application/rss+xml": "https://www.whexy.com/feed.xml",
    },
  },
};

export const viewpoint = {
  themeColor: "#171717",
};
