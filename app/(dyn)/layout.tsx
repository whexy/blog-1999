import "../../styles/globals.css";
import "./notion.css";
import React from "react";
import Header from "@/components/UI/Website/Header";
import Analytics from "@/components/Scripts/Analytics";
import { fontVariables } from "@/lib/fonts";
import { baseMetadata, baseViewport } from "@/lib/site";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Analytics />
        <Header />
        <main className="text-black-readable min-h-[80vh] bg-white">
          <div className="mx-auto box-border flex w-full max-w-175 flex-col">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

export const metadata = baseMetadata;

export const viewport = baseViewport;
