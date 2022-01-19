import metadata from "../data/metadata";
import Link from "next/link";
import NavigationView from "./Navigation";

const Header = () => {
  return (
    <div>
      <header className="w-full text-gray-400 bg-black-readable fixed z-50">
        <div className="max-w-4xl px-5 mx-auto flex flex-row justify-between items-center space-x-8 py-4">
          <Link href="/">
            <a>
              <h1 className="text-xl sm:text-2xl font-mono text-center text-white-readable">
                <span className="text-white">{metadata.header.logo}</span>
                <sup className="text-red-500">{metadata.header.sublogo}</sup>
              </h1>
            </a>
          </Link>
          <div>
            <div className="flex flex-row flex-nowrap justify-center items-center space-x-4">
              <NavigationView />
            </div>
          </div>
        </div>
      </header>
      <div className="h-[65px]"></div>
    </div>
  );
};

export default Header;
