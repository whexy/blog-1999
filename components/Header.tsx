import metadata from "@/data/metadata";
import Link from "next/link";
import NavigationView from "@/components/Navigation";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-black-readable text-gray-400 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-row items-center justify-between space-x-8 px-5 py-4">
        <Link href="/">
          <a>
            <div className="text-center font-mono text-xl text-white-readable sm:text-2xl">
              <span className="text-white">
                {metadata.header.logo}
              </span>
              <sup className="text-red-500">
                {metadata.header.sublogo}
              </sup>
            </div>
          </a>
        </Link>
        <div>
          <div className="flex flex-row flex-nowrap items-center justify-center space-x-4">
            <NavigationView />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
