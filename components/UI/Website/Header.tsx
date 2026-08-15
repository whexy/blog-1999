"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const pathname = usePathname();

  // Extract language from pathname for navigation links
  const segments = pathname.split("/");
  const currentLang =
    segments[1] === "en" || segments[1] === "zh" ? segments[1] : "en";

  const isBlogPage =
    pathname === `/${currentLang}` || pathname === "/";
  const isNotionPage = pathname === "/dyn";

  return (
    <header className="header-bar print:hidden">
      <div className="max-w-content mx-auto flex flex-row items-center justify-between px-4 py-2">
        <div className="flex items-center gap-8">
          <Link href={`/${currentLang}`}>
            <div className="font-title text-2xl font-semibold text-black">
              whexy
            </div>
          </Link>
          <nav className="hidden gap-6 sm:flex">
            <Link
              href={`/${currentLang}`}
              className={`nav-link ${isBlogPage ? "nav-link-active" : ""}`}>
              Blogs
            </Link>
            <Link
              href="/dyn"
              className={`nav-link ${isNotionPage ? "nav-link-active" : ""}`}>
              Notion
            </Link>
            <Link href="https://shiwx.org" className="nav-link">
              About
            </Link>
          </nav>
        </div>

        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
