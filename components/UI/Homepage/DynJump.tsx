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
    <div className="no-scrollbar overflow-x-scroll">
      <div className="grid min-w-[64rem] auto-cols-fr grid-flow-col gap-x-4 lg:min-w-0">
        <Link
          href={"/posts"}
          className="primary px-4 py-2 transition-all hover:bg-gray-50">
          <PaperClipIcon className="my-2 h-8 w-8 rounded-lg bg-purple-100 p-1 text-purple-500" />
          <div>
            <h2 className="font-title text-xl font-semibold">
              Posts
            </h2>
            <p className="text-sm">Full list of articles.</p>
          </div>
        </Link>
        <Link
          href={"/dyn"}
          className="primary px-4 py-2 transition-all hover:bg-gray-50">
          <FaceSmileIcon className="my-2 h-8 w-8 rounded-lg bg-green-100 p-1 text-green-500" />
          <div>
            <h2 className="font-title text-xl font-semibold">Dyn</h2>
            <p className="text-sm">
              Simple blogs with less serious content. Powered by
              Notion.
            </p>
          </div>
        </Link>
        <Link
          href={"/db"}
          className="primary px-4 py-2 transition-all hover:bg-gray-50">
          <StarIcon className="my-2 h-8 w-8 rounded-lg bg-yellow-100 p-1 text-yellow-500" />
          <div>
            <h2 className="font-title text-xl font-semibold">
              Stars
            </h2>
            <p className="text-sm">
              My recent music playlists, movies, and readings.
            </p>
          </div>
        </Link>
        <Link
          href={"/friends"}
          className="primary px-4 py-2 transition-all hover:bg-gray-50">
          <UsersIcon className="my-2 h-8 w-8 rounded-lg bg-blue-100 p-1 text-blue-500" />
          <div>
            <h2 className="font-title text-xl font-semibold">
              Friends
            </h2>
            <p className="text-sm">
              Links to some other interesting blogs of my friends.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DynJump;
