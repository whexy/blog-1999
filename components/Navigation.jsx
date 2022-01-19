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
  let { href, children, ...rest } = props;
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
      <div className="sm:hidden flex items-center justify-center space-x-4">
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <SunIcon className="w-7 h-7" />
          ) : (
            <MoonIcon className="w-7 h-7" />
          )}
        </button>
        <Menu as="div" className="relative grid place-items-center">
          <Menu.Button>
            <MenuIcon className="w-7 h-7" />
          </Menu.Button>
          <Menu.Items className="absolute rounded-lg right-0 top-10 p-4 flex-col space-y-3 text-white bg-black/50 backdrop-blur">
            <Menu.Item>
              {({ active }) => (
                <MyLink href="/" className="flex items-center space-x-2">
                  <HomeIcon className="w-5 h-5" />
                  <div>Home</div>
                </MyLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <MyLink href="/keys" className="flex items-center space-x-2">
                  <KeyIcon className="w-5 h-5" />
                  <div>Keys</div>
                </MyLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <MyLink href="/about" className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5" />
                  <div>About</div>
                </MyLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <MyLink href="/friends" className="flex items-center space-x-2">
                  <UserGroupIcon className="w-5 h-5" />
                  <div>Friends</div>
                </MyLink>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex space-x-4 items-center">
        <Link href="/">
          <a className="flex space-x-2">
            <HomeIcon className="w-5 h-5" />
            <div className="text-sm">Home</div>
          </a>
        </Link>
        <Link href="/keys">
          <a className="flex space-x-2">
            <KeyIcon className="w-5 h-5" />
            <div className="text-sm">Keys</div>
          </a>
        </Link>
        <Link href="/about">
          <a className="flex space-x-2">
            <UserIcon className="w-5 h-5" />
            <div className="text-sm">About</div>
          </a>
        </Link>
        <Link href="/friends">
          <a className="flex space-x-2">
            <UserGroupIcon className="w-5 h-5" />
            <div className="text-sm">Friends</div>
          </a>
        </Link>
        <button onClick={toggleTheme}>
          {theme === "light" ? (
            <div className="flex space-x-2">
              <SunIcon className="w-5 h-5" />
              <div className="text-sm hidden sm:block">Light</div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <MoonIcon className="w-5 h-5" />
              <div className="text-sm hidden sm:block">Dark</div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default NavigationView;
