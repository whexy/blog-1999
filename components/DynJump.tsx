import {
  FaceSmileIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import CheckoutArrow from "@/components/icons/CheckoutArrow";

const DynJump = () => {
  return (
    <div className="mx-2 grid gap-y-4 sm:grid-cols-2 sm:gap-x-4">
      <div className="relative">
        <CheckoutArrow className="absolute left-0 top-0 hidden -translate-x-[105%] translate-y-[75%] lg:block" />
        <Link href={"/dyn"}>
          <div className="primary flex items-center gap-x-4 px-4 py-2 transition-all hover:bg-gray-50">
            <FaceSmileIcon className="h-8 w-8" />
            <div>
              <h2 className="font-bold">Dyn Blog</h2>
              <p>Less serious content, my own space for fun</p>
            </div>
          </div>
        </Link>
      </div>
      <Link href="/friends">
        <div className="primary flex items-center gap-x-4 px-4 py-2 transition-all hover:bg-gray-50">
          <UsersIcon className="h-8 w-8" />
          <div>
            <h2 className="font-bold">Friends</h2>
            <p>Links to some other interesting blogs</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DynJump;
