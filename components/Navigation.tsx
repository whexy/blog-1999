import Link from "next/link";
import {
  HomeIcon,
  KeyIcon,
  UserIcon,
  UserGroupIcon,
  MenuIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/outline";
import { Menu } from "@headlessui/react";
import { useContext } from "react";
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
    <div>
      {/* Mobile View */}
      <div className="flex items-center justify-center space-x-4 sm:hidden">
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <SunIcon className="h-7 w-7" />
          ) : (
            <MoonIcon className="h-7 w-7" />
          )}
        </button>
        <Menu as="div" className="relative grid place-items-center">
          <Menu.Button>
            <MenuIcon className="h-7 w-7" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 top-10 flex-col space-y-3 rounded-lg bg-black/50 p-4 text-white backdrop-blur">
            <Menu.Item>
              {() => (
                <MyLink
                  href="/"
                  className="flex items-center space-x-2"
                >
                  <HomeIcon className="h-5 w-5" />
                  <div>Home</div>
                </MyLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {() => (
                <MyLink
                  href="/keys"
                  className="flex items-center space-x-2"
                >
                  <KeyIcon className="h-5 w-5" />
                  <div>Keys</div>
                </MyLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {() => (
                <MyLink
                  href="/about"
                  className="flex items-center space-x-2"
                >
                  <UserIcon className="h-5 w-5" />
                  <div>About</div>
                </MyLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {() => (
                <MyLink
                  href="/friends"
                  className="flex items-center space-x-2"
                >
                  <UserGroupIcon className="h-5 w-5" />
                  <div>Friends</div>
                </MyLink>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>

      {/* Desktop View */}
      <div className="hidden items-center space-x-4 sm:flex">
        <Link href="/">
          <a className="flex space-x-2">
            <HomeIcon className="h-5 w-5" />
            <div className="text-sm">Home</div>
          </a>
        </Link>
        <Link href="/keys">
          <a className="flex space-x-2">
            <KeyIcon className="h-5 w-5" />
            <div className="text-sm">Keys</div>
          </a>
        </Link>
        <Link href="/about">
          <a className="flex space-x-2">
            <UserIcon className="h-5 w-5" />
            <div className="text-sm">About</div>
          </a>
        </Link>
        <Link href="/friends">
          <a className="flex space-x-2">
            <UserGroupIcon className="h-5 w-5" />
            <div className="text-sm">Friends</div>
          </a>
        </Link>
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <div className="flex space-x-2">
              <SunIcon className="h-5 w-5" />
              <div className="hidden text-sm sm:block">Light</div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <MoonIcon className="h-5 w-5" />
              <div className="hidden text-sm sm:block">Dark</div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default NavigationView;
