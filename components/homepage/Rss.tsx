import Link from "next/link";
import RssIcon from "@/public/img/rss.svg";

const Rss = () => {
  return (
    <div className="py-5">
      <div className="secondbg my-1 flex w-full items-center space-x-2 rounded-lg p-5">
        <RssIcon className="h-8 w-8" />
        <h2 className="font-title text-xl">
          Subscribe to the blog via{" "}
          <Link href="/feed/feed.xml">
            <a className="underline">RSS</a>
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Rss;
