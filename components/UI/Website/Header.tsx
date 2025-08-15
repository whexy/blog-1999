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
  const isFriendsPage = pathname === "/friends";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm print:hidden">
      <div className="mx-auto flex max-w-[720px] flex-row items-center justify-between px-4 py-2">
        <div className="flex items-center gap-8">
          <Link href={`/${currentLang}`}>
            <div className="font-title text-2xl font-semibold text-black">
              whexy
            </div>
          </Link>
          <nav className="hidden gap-6 sm:flex">
            <Link
              href={`/${currentLang}`}
              className={`font-title text-sm font-medium transition-colors duration-150 ${
                isBlogPage
                  ? "text-black"
                  : "text-gray-700 hover:text-gray-900"
              }`}>
              Blogs
            </Link>
            <Link
              href="/dyn"
              className={`font-title text-sm font-medium transition-colors duration-150 ${
                isNotionPage
                  ? "text-black"
                  : "text-gray-700 hover:text-gray-900"
              }`}>
              Notion
            </Link>
            <Link
              href="/friends"
              className={`font-title text-sm font-medium transition-colors duration-150 ${
                isFriendsPage
                  ? "text-black"
                  : "text-gray-700 hover:text-gray-900"
              }`}>
              Friends
            </Link>
          </nav>
        </div>

        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
