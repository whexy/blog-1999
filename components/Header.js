import metadata from "../metadata";
import Link from "next/link";
import { useContext } from "react";
// import Heroicon
import { SunIcon, MoonIcon } from "@heroicons/react/outline";
// import context
import { ThemeContext } from "../pages/_app";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <header className="mx-auto sm:max-w-3xl text-gray-400 border-red-500 border-b bg-black-readable relative z-50">
        <div className="flex flex-row justify-center items-center space-x-8 py-4">
          <Link href="/">
            <a>
              <h1 className="text-xl sm:text-2xl font-mono text-center text-white-readable">
                <span className="text-white">{metadata.header.logo}</span>
                <sup className="text-red-500">{metadata.header.sublogo}</sup>
              </h1>
            </a>
          </Link>
          <div className="sm:flex-1 sm:flex sm:flex-row sm:justify-end">
            <div className="flex flex-row overflow-hidden flex-nowrap text-lg sm:text-xl font-light justify-center items-center divide-x divide-jbgray-light divide-opacity-10">
              <button onClick={toggleTheme}>
                {theme === "light" ? (
                  <SunIcon className="w-6 h-6" />
                ) : (
                  <MoonIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
