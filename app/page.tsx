import WelcomeCard from "@/components/homepage/WelcomeCard";
import RecentPosts from "@/components/homepage/RecentPosts";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <WelcomeCard />
      <RecentPosts />
      <Link href={"/posts"}>
        <div className="flex justify-center">
          <button className="my-5 transform rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800 focus:bg-gray-800 focus:outline-none">
            View All Posts
          </button>
        </div>
      </Link>
    </>
  );
}
