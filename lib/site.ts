import type { Metadata, Viewport } from "next";

/** Canonical origin of the site (no trailing slash). */
export const siteUrl = "https://www.whexy.com";

export const siteName = "Whexy";

export const locales = ["en", "zh"] as const;

export type Language = (typeof locales)[number];

export const defaultLocale: Language = "en";

export function isLocale(value: unknown): value is Language {
  return (
    typeof value === "string" &&
    (locales as readonly string[]).includes(value)
  );
}

/** The other supported language. */
export function otherLocale(lang: Language): Language {
  return lang === "en" ? "zh" : "en";
}

/** Site-relative path of a post in a given language. */
export function postPath(lang: Language, slug: string): string {
  return `/${lang}/posts/${slug}`;
}

/** Absolute URL of a post in a given language. */
export function postUrl(lang: Language, slug: string): string {
  return `${siteUrl}${postPath(lang, slug)}`;
}

/** Metadata shared by every root layout. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: "CS PhD student at Northwestern.",
  icons: {
    icon: "/img/favicon-32x32.png",
    apple: "/img/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/img/safari-pinned-tab.svg" }],
  },
  alternates: {
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
};

export const baseViewport: Viewport = {
  themeColor: "#171717",
};
