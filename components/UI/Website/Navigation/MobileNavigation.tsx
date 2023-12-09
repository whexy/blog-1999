import Link from "next/link";
import {
  HomeIcon,
  FaceSmileIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
/* Fancy animated menu */

import { useSpring, animated } from "@react-spring/web";

const MobileNavigation = ({ showMenu, toggleMenuFn }) => {
  const springs = useSpring({
    opacity: showMenu ? 1 : 0,
    height: showMenu ? "40vh" : "0vh",
  });

  return (
    <animated.div style={{ ...springs }}>
      <div className="grid grid-cols-3 py-6 sm:hidden">
        {showMenu && (
          <>
            <MobileNavItem
              url="/"
              name="Home"
              Icon={HomeIcon}
              toggleMenuFn={toggleMenuFn}
            />
            <MobileNavItem
              url="/friends"
              name="Friends"
              Icon={UsersIcon}
              toggleMenuFn={toggleMenuFn}
            />
            <MobileNavItem
              url="/dyn"
              name="Dyn"
              Icon={FaceSmileIcon}
              toggleMenuFn={toggleMenuFn}
            />
          </>
        )}
      </div>
    </animated.div>
  );
};

const MobileNavItem = ({ url, name, Icon, toggleMenuFn }) => (
  <Link
    href={url}
    className="flex flex-col items-center rounded-lg px-4 py-6 hover:bg-white/5"
    onClick={() => toggleMenuFn()}>
    <div className="rounded-lg">
      <Icon className="h-6 w-6" />
    </div>
    <div className="text-center text-gray-400 hover:text-white">
      {name}
    </div>
  </Link>
);

export default MobileNavigation;
