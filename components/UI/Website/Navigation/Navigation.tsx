import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { FC } from "react";
import metadata from "@/data/metadata";

const NavigationView = ({ toggleMenuFn }) => {
  return (
    <div>
      {/* Desktop View */}
      <div className="hidden items-center sm:flex">
        {metadata.pages.map(page => (
          <DesktopNavItem key={page.name} {...page} />
        ))}
      </div>
      <button
        type="button"
        className="sm:hidden"
        onClick={toggleMenuFn}
        title="Toggle Menu">
        <Bars3Icon className="h-6 w-6" />
      </button>
    </div>
  );
};

const DesktopNavItem: FC<{ url: string; name: string }> = ({
  url,
  name,
}) => {
  return (
    <Link
      href={url}
      className="rounded-lg px-3 py-2 font-title transition-all hover:bg-white/5">
      <div className="font-normal text-gray-400">{name}</div>
    </Link>
  );
};

export default NavigationView;
