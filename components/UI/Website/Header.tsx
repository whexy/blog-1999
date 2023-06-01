"use client";

import metadata from "@/data/metadata";
import Link from "next/link";
import NavigationView from "@/components/UI/Website/Navigation/Navigation";
import MobileNavigation from "@/components/UI/Website/Navigation/MobileNavigation";

import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-900 text-gray-400 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-row items-center justify-between space-x-8 px-5 py-2">
        <Link href="/">
          <div className="text-center font-mono text-xl text-white-readable sm:text-2xl">
            <span className="text-white">{metadata.header.logo}</span>
            <sup className="text-red-500">
              {metadata.header.sublogo}
            </sup>
          </div>
        </Link>
        <NavigationView toggleMenuFn={toggleMenu} />
      </div>
      <MobileNavigation
        showMenu={showMenu}
        toggleMenuFn={toggleMenu}
      />
    </header>
  );
};

export default Header;
