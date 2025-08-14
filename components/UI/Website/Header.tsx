"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const blogsRef = useRef<HTMLAnchorElement>(null);
  const notionRef = useRef<HTMLAnchorElement>(null);
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const updateSlider = () => {
      if (pathname === "/" && blogsRef.current) {
        setSliderStyle({
          left: blogsRef.current.offsetLeft,
          width: blogsRef.current.offsetWidth,
        });
      } else if (pathname === "/dyn" && notionRef.current) {
        setSliderStyle({
          left: notionRef.current.offsetLeft,
          width: notionRef.current.offsetWidth,
        });
      }
    };

    updateSlider();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm print:hidden">
      <div className="mx-auto flex max-w-[720px] flex-row items-center justify-between px-4 py-2">
        <Link href="/">
          <div className="font-title text-2xl font-semibold text-black">
            whexy
          </div>
        </Link>
        <nav className="relative flex rounded-lg bg-gray-50 p-1">
          {/* Sliding indicator */}
          <div
            className={`absolute bottom-1 top-1 rounded-md bg-neutral-900 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              pathname === "/" || pathname === "/dyn"
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              left: sliderStyle.left,
              width: sliderStyle.width,
            }}
          />

          <Link
            ref={blogsRef}
            href="/"
            className={`relative z-10 flex-shrink-0 rounded-md px-3 py-2 font-title text-sm font-medium transition-colors duration-150 ${
              pathname === "/"
                ? "text-white"
                : "text-gray-700 hover:text-gray-900"
            }`}>
            Blogs
          </Link>
          <Link
            ref={notionRef}
            href="/dyn"
            className={`relative z-10 flex-shrink-0 rounded-md px-3 py-2 font-title text-sm font-medium transition-colors duration-150 ${
              pathname === "/dyn"
                ? "text-white"
                : "text-gray-700 hover:text-gray-900"
            }`}>
            Notion
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
