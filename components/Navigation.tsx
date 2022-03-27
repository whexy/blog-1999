import Link from "next/link";
import { useRouter } from "next/router";
import {
  MenuIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/outline";
import { Menu } from "@headlessui/react";
import { useContext, VFC } from "react";
import { ThemeContext } from "../pages/_app";

function MyLink(props) {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

const NavigationView = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="flex items-center">
      {/* Desktop View */}
      <div className="hidden items-center sm:flex">
        <DesktopNavItem url="/" name="Home" />
        <DesktopNavItem url="/posts" name="Posts" />
        <DesktopNavItem url="/snippets" name="Snippets" />
        <DesktopNavItem url="/friends" name="Friends" />
        <DesktopNavItem url="/about" name="About" />
      </div>
      <div className="px-4">
        <button
          onClick={toggleTheme}
          className="umami--click--theme-button grid h-9 w-9 place-items-center rounded-lg bg-neutral-600 ring-gray-300 transition-all hover:ring-2"
        >
          {theme === "light" ? (
            <SunIcon className="h-5 w-5 stroke-gray-200" />
          ) : (
            <MoonIcon className="h-5 w-5 stroke-gray-200" />
          )}
        </button>
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
          <MenuIcon className="h-7 w-7" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 top-10 w-[35vw] flex-col divide-y divide-gray-100/20 rounded-lg bg-black/20 text-white ring-1 ring-black/10 backdrop-blur-xl backdrop-brightness-50">
          <MobileNavItem url="/" name="Home" />
          <MobileNavItem url="/posts" name="Posts" />
          <MobileNavItem url="/snippets" name="Snippets" />
          <MobileNavItem url="/friends" name="Friends" />
          <MobileNavItem url="/about" name="About" />
        </Menu.Items>
      </Menu>
    </div>
  );
};

const DesktopNavItem: VFC<{ url: string; name: string }> = ({
  url,
  name,
}) => {
  const router = useRouter();
  const isActive = router.asPath === url;
  return (
    <Link href={url}>
      <a className="rounded-lg px-3 py-2 transition-all hover:bg-white/5">
        <div
          className={
            isActive
              ? "font-semibold text-gray-200"
              : "font-normal text-gray-400"
          }
        >
          {name}
        </div>
      </a>
    </Link>
  );
};

const MobileNavItem: VFC<{ url: string; name: string }> = ({
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
