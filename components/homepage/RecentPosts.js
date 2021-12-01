import PostCard from "../PostCard";
import Link from "next/link";

export default function RecentPosts({ posts }) {
  return (
    <>
      <div className="my-5 pb-5">
        <div className="p-1 sm:flex sm:justify-between sm:divide-x sm:divide-red-600 sm:dark:divide-red-500">
          <div className="sm:flex-shrink-0 w-full sm:w-2/12 whitespace-nowrap sm:pr-2 dark:bg-black-readable">
            <div className="uppercase font-semibold text-sm text-red-600 dark:text-red-500">
              Posts
            </div>
            <Link href="/posts">
              <a className="font-black text-lg text-black-readable dark:text-white-readable">
                博客内容
              </a>
            </Link>
          </div>
          <div className="pt-2 sm:pl-3 flex-1 flex-col space-y-5">
            {posts.map((post) => (
              <PostCard
                title={post.title}
                date={post.date}
                image={post.image}
                excerpt={post.excerpt}
                url={`/posts/${post.id}`}
                key={post.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
