import PostCard from "@/components/PostCard";
import type { Blog } from "contentlayer/generated";
import { format, parseISO, compareDesc } from "date-fns";
import Link from "next/link";

const RecentPosts = ({ posts }: { posts: Blog[] }) => {
  posts = posts.sort((p1, p2) =>
    compareDesc(parseISO(p1.publishDate), parseISO(p2.publishDate)),
  );
  return (
    <div className="py-5">
      <div className="flex items-center justify-between">
        <h2 className="pb-2 font-title text-3xl font-bold">
          Recent Posts
        </h2>
        <Link href="/posts">
          <a className="py-2 font-mono text-red-500 underline">
            {">>> All Posts"}
          </a>
        </Link>
      </div>
      <div className="space-y-2 sm:grid sm:grid-cols-3 sm:space-x-2 sm:space-y-0">
        {posts.slice(0, 3).map(post => (
          <PostCard
            key={post.slug}
            title={post.title}
            url={`/posts/${post.slug}`}
            image={post.image}
            summary={post.summary}
            date={format(parseISO(post.publishDate), "yyyy-LL-dd")}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
