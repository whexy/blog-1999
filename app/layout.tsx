/* eslint-disable react/no-unknown-property */
import "../styles/globals.css";
import "../styles/prism/prism-dark.css";
import "../styles/katex/katex.css";
import Header from "@/components/UI/Website/Header";
import React from "react";
import Analytics from "@/components/Scripts/Analytics";

import {
  Lato,
  Fira_Sans,
  Noto_Sans_SC,
  JetBrains_Mono,
} from "next/font/google";

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

const jetbrains_mono = JetBrains_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

// Centralize font config and derive className cleanly
const fonts = [
  { name: "lato", variable: lato.variable },
  { name: "notoSansSC", variable: noto_sans_sc.variable },
  { name: "fira", variable: fira.variable },
  { name: "jetbrainsMono", variable: jetbrains_mono.variable },
] as const;

const fontVariables = fonts.map(f => f.variable).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={fontVariables}>
      <body>
        <Analytics />
        <Header />
        <main className="min-h-[80vh] bg-white-readable text-black-readable">
          <div className="mx-auto box-border flex w-full max-w-[720px] flex-col px-1 py-4 sm:px-4 sm:py-10">
            {children}
          </div>
        </main>
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

export const viewport = {
  themeColor: "#171717",
};
