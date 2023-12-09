import {
  FaceSmileIcon,
  UsersIcon,
  StarIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// import CheckoutArrow from "@/components/UI/Graphic/icons/CheckoutArrow";

const DynJump = () => {
  return (
    <div className="grid gap-y-4 sm:grid-cols-2 sm:gap-x-4">
      <Link href={"/posts"}>
        <div className="primary flex items-center gap-x-4 px-4 py-2 transition-all hover:bg-gray-50">
          <PaperClipIcon className="h-8 w-8" />
          <div>
            <h2 className="font-bold">Posts</h2>
            <p className="text-sm">Full list of articles</p>
          </div>
        </div>
      </Link>
      <Link href={"/dyn"}>
        <div className="primary flex items-center gap-x-4 px-4 py-2 transition-all hover:bg-gray-50">
          <FaceSmileIcon className="h-8 w-8" />
          <div>
            <h2 className="font-bold">Dyn</h2>
            <p className="text-sm">My own space for fun</p>
          </div>
        </div>
      </Link>
      <Link href="/db">
        <div className="primary flex items-center gap-x-4 px-4 py-2 transition-all hover:bg-gray-50">
          <StarIcon className="h-8 w-8" />
          <div>
            <h2 className="font-bold">Dashboard</h2>
            <p className="text-sm">Public personal track</p>
          </div>
        </div>
      </Link>
      <Link href="/friends">
        <div className="primary flex items-center gap-x-4 px-4 py-2 transition-all hover:bg-gray-50">
          <UsersIcon className="h-8 w-8" />
          <div>
            <h2 className="font-bold">Friends</h2>
            <p className="text-sm">Some other interesting blogs</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DynJump;
