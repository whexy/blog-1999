"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, locales, type Language } from "@/lib/site";

const labels: Record<Language, string> = {
  en: "English",
  zh: "中文",
};

interface LanguageSwitcherProps {
  /** Language of the current page (from the [lang] layout). */
  lang: Language;
}

/**
 * Links to the current page in each language. Works on prefixed
 * (`/en/posts/x`) and proxy-rewritten unprefixed (`/posts/x`) URLs.
 * Every post exists in both languages (missing translations fall
 * back to the other language), so the target is always valid.
 */
export default function LanguageSwitcher({
  lang,
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/");
  const rest = isLocale(segments[1])
    ? segments.slice(2).join("/")
    : segments.slice(1).join("/");
  const pathFor = (l: Language) => (rest ? `/${l}/${rest}` : `/${l}`);

  return (
    <div className="segmented">
      {locales.map(l => (
        <Link
          key={l}
          href={pathFor(l)}
          hrefLang={l}
          aria-current={l === lang ? "page" : undefined}
          className={`segmented-item ${
            l === lang ? "segmented-active" : "segmented-idle"
          }`}>
          {labels[l]}
        </Link>
      ))}
    </div>
  );
}
