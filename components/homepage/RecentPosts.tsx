import type { Blog } from "contentlayer/generated";
import { parseISO, compareDesc } from "date-fns";
import Link from "next/link";
import { PostsShowCase } from "@/components/PostsShowCase";

const RecentPosts = ({ posts }: { posts: Blog[] }) => {
  const recentPosts = posts
    .sort((p1, p2) =>
      compareDesc(parseISO(p1.publishDate), parseISO(p2.publishDate)),
    )
    .slice(0, 3);
  return (
    <div className="py-5">
      <div className="flex items-center justify-between">
        <h2 className="pb-2 font-title text-xl font-bold">
          Recent Posts
        </h2>
        <Link href="/posts">
          <a className="py-2 font-mono text-red-500 underline">
            {">>> All Posts"}
          </a>
        </Link>
      </div>
      <PostsShowCase posts={recentPosts} />
    </div>
  );
};

export default RecentPosts;
