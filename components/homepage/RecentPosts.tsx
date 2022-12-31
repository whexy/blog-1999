import { format, parseISO } from "date-fns";
import Link from "next/link";
import PostCard from "@/components/PostCard";

export default function RecentPosts({ data }) {
  const recentPosts = data.allBlog.map(blog => ({
    title: blog.title,
    slug: blog.slug.current,
    date: blog.date,
    excerpt: blog.excerpt,
  }));

  return (
    <div className="py-5">
      <h2 className="pl-4 pb-1 text-sm font-light opacity-80">
        Recent Posts
      </h2>
      <div className="primary divide-y divide-black/10 overflow-hidden dark:divide-white/10">
        {recentPosts.map(post => (
          <PostCard
            key={post.slug}
            title={post.title}
            url={`/posts/${post.slug}`}
            summary={post.excerpt}
            date={format(parseISO(post.date), "LL/dd")}
          />
        ))}

        <div className="px-3 py-3 text-blue-500 dark:text-blue-400">
          <Link href="/posts" className="flex justify-between">
            <p className="font-semibold ">Read more...</p>
            <svg
              className="umami--click--more-button h-6 w-6 opacity-80 transition-opacity hover:cursor-pointer hover:opacity-100"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M204 64v104a12 12 0 0 1-24 0V93L72.5 200.5a12.1 12.1 0 0 1-17 0a12 12 0 0 1 0-17L163 76H88a12 12 0 0 1 0-24h104a12 12 0 0 1 12 12Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
