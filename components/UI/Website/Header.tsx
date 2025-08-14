"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const pathname = usePathname();
  const blogsRef = useRef<HTMLAnchorElement>(null);
  const notionRef = useRef<HTMLAnchorElement>(null);
  const friendsRef = useRef<HTMLAnchorElement>(null);
  // Remove unused sliderStyle for now - can be added back for sliding animations later

  // Extract language from pathname for navigation links
  const segments = pathname.split("/");
  const currentLang =
    segments[1] === "en" || segments[1] === "zh" ? segments[1] : "en";
  const pathWithoutLang =
    segments.length > 2 ? `/${segments.slice(2).join("/")}` : "";

  const isBlogPage =
    pathname === `/${currentLang}` ||
    pathname === "/" ||
    pathWithoutLang.startsWith("/posts");
  const isNotionPage =
    pathWithoutLang === "/dyn" || pathname === "/dyn";
  const isFriendsPage =
    pathWithoutLang === "/friends" || pathname === "/friends";

  // Removed slider animation for now - can be added back later

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
              ref={blogsRef}
              href={`/${currentLang}`}
              className={`font-title text-sm font-medium transition-colors duration-150 ${
                isBlogPage
                  ? "text-black"
                  : "text-gray-700 hover:text-gray-900"
              }`}>
              Blogs
            </Link>
            <Link
              ref={notionRef}
              href={`/${currentLang}/dyn`}
              className={`font-title text-sm font-medium transition-colors duration-150 ${
                isNotionPage
                  ? "text-black"
                  : "text-gray-700 hover:text-gray-900"
              }`}>
              Notion
            </Link>
            <Link
              ref={friendsRef}
              href={`/${currentLang}/friends`}
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
