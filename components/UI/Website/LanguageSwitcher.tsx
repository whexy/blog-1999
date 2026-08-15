"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Language = "en" | "zh";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  // Extract current language and path
  const segments = pathname.split("/");
  const currentLang =
    segments[1] === "en" || segments[1] === "zh"
      ? (segments[1] as Language)
      : "en";
  const pathWithoutLang =
    segments.length > 2 ? `/${segments.slice(2).join("/")}` : "";

  const switchLang = currentLang === "en" ? "zh" : "en";
  const switchPath = `/${switchLang}${pathWithoutLang}`;

  return (
    <div className="segmented">
      <Link
        href={currentLang === "en" ? pathname : switchPath}
        className={`segmented-item ${
          currentLang === "en" ? "segmented-active" : "segmented-idle"
        }`}>
        English
      </Link>
      <Link
        href={currentLang === "zh" ? pathname : switchPath}
        className={`segmented-item ${
          currentLang === "zh" ? "segmented-active" : "segmented-idle"
        }`}>
        中文
      </Link>
    </div>
  );
}
