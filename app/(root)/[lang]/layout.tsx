import "../../../styles/globals.css";
import "../../../styles/prism/prism-dark.css";
import "../../../styles/katex/katex.css";
import React from "react";
import Header from "@/components/UI/Website/Header";
import Analytics from "@/components/Scripts/Analytics";
import { fontVariables } from "@/lib/fonts";
import {
  baseMetadata,
  baseViewport,
  defaultLocale,
  isLocale,
  locales,
} from "@/lib/site";

// The root layout for the blog lives under [lang] so that <html lang>
// can be set statically for every prerendered page.
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: param } = await params;
  const lang = isLocale(param) ? param : defaultLocale;

  return (
    <html lang={lang} className={fontVariables}>
      <body>
        <Analytics />
        <Header lang={lang} />
        <main className="bg-white-readable text-black-readable min-h-[80vh]">
          <div className="max-w-content mx-auto box-border flex w-full flex-col px-0 py-4 sm:px-4 sm:py-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export const dynamicParams = false;

export const metadata = baseMetadata;

export const viewport = baseViewport;
