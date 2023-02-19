"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import { FC } from "react";

// import { useSelector, useDispatch } from "react-redux";
// import { toggleDarkMode } from "@/store/themeSlice";
// import { AppState } from "@/store/store";

function MyLink(props) {
  const { href, children, ...rest } = props;
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

const NavigationView = () => {
  return (
    <div className="flex items-center">
      {/* Desktop View */}
      <div className="hidden items-center sm:flex">
        <DesktopNavItem url="/" name="Home" />
        <DesktopNavItem url="/posts" name="Posts" />
        {/* <DesktopNavItem url="/dyn" name="Dyn" /> */}
      </div>
      <MobileMenu />
    </div>
  );
};

const MobileMenu = () => {
  return (
    <div className="flex items-center justify-center space-x-4 sm:hidden">
      <Menu as="div" className="relative grid place-items-center">
        <Menu.Button className="umami--click--mobile-menu-button">
          <Bars3Icon className="h-7 w-7" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 top-10 w-[35vw] flex-col divide-y divide-gray-100/20 rounded-lg bg-black/20 text-white ring-1 ring-black/10 backdrop-blur-xl backdrop-brightness-50">
          <MobileNavItem url="/" name="Home" />
          <MobileNavItem url="/posts" name="Posts" />
          {/* <MobileNavItem url="/dyn" name="Dyn" /> */}
        </Menu.Items>
      </Menu>
    </div>
  );
};

const DesktopNavItem: FC<{ url: string; name: string }> = ({
  url,
  name,
}) => {
  const pathname = usePathname();
  const isActive = pathname === url;
  return (
    <Link
      href={url}
      className="rounded-lg px-3 py-2 font-title transition-all hover:bg-white/5"
    >
      <div
        className={
          isActive
            ? "font-semibold text-gray-200"
            : "font-normal text-gray-400"
        }
      >
        {name}
      </div>
    </Link>
  );
};

const MobileNavItem: FC<{ url: string; name: string }> = ({
  url,
  name,
}) => {
  return (
    <div className="px-4 py-4">
      <Menu.Item>
        {() => (
          <MyLink href={url} className="flex items-center space-x-2">
            <div>{name}</div>
          </MyLink>
        )}
      </Menu.Item>
    </div>
  );
};

export default NavigationView;
