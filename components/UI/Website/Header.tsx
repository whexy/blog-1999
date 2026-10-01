"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Language } from "@/lib/site";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  /**
   * Language of the current page. Omitted on routes outside
   * `[lang]` (e.g. `/dyn`), where the language switcher is hidden.
   */
  lang?: Language;
}

const Header = ({ lang }: HeaderProps) => {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/");
  const homeLang = lang ?? defaultLocale;

  // Path with any locale prefix removed, e.g. "/posts/fork".
  const rest = isLocale(segments[1])
    ? `/${segments.slice(2).join("/")}`
    : pathname;

  const isNotionPage = rest === "/dyn" || rest.startsWith("/dyn/");
  const isBlogPage =
    !isNotionPage &&
    (rest === "/" || rest === "/posts" || rest.startsWith("/posts/"));

  return (
    <header className="header-bar print:hidden">
      <div className="max-w-content mx-auto flex flex-wrap items-center justify-between gap-x-8 gap-y-1 px-4 py-2">
        <Link href={`/${homeLang}`}>
          <div className="font-title text-2xl font-semibold text-black">
            whexy
          </div>
        </Link>
        <nav className="order-last flex w-full gap-6 pb-1 sm:order-none sm:mr-auto sm:w-auto sm:pb-0">
          <Link
            href={`/${homeLang}`}
            aria-current={isBlogPage ? "true" : undefined}
            className={`nav-link ${isBlogPage ? "nav-link-active" : ""}`}>
            Blogs
          </Link>
          <Link
            href="/dyn"
            aria-current={isNotionPage ? "true" : undefined}
            className={`nav-link ${isNotionPage ? "nav-link-active" : ""}`}>
            Notion
          </Link>
          <Link href="https://shiwx.org" className="nav-link">
            About
          </Link>
        </nav>

        {lang && <LanguageSwitcher lang={lang} />}
      </div>
    </header>
  );
};

export default Header;
