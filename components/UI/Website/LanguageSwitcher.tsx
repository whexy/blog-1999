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
    <div className="relative flex rounded-lg bg-gray-50 p-1">
      <Link
        href={currentLang === "en" ? pathname : switchPath}
        className={`relative z-10 flex-shrink-0 rounded-md px-3 py-2 font-title text-sm font-medium transition-colors duration-150 ${
          currentLang === "en"
            ? "bg-neutral-900 text-white"
            : "text-gray-700 hover:text-gray-900"
        }`}>
        English
      </Link>
      <Link
        href={currentLang === "zh" ? pathname : switchPath}
        className={`relative z-10 flex-shrink-0 rounded-md px-3 py-2 font-title text-sm font-medium transition-colors duration-150 ${
          currentLang === "zh"
            ? "bg-neutral-900 text-white"
            : "text-gray-700 hover:text-gray-900"
        }`}>
        中文
      </Link>
    </div>
  );
}
