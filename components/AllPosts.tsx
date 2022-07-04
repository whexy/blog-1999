import type { Blog } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import groupBy from "lodash/groupBy";
import Link from "next/link";
import type { FC } from "react";

const AllPosts = ({ posts }: { posts: Blog[] }) => {
  const postsByCat = Object.entries(groupBy(posts, "cat")).sort(
    ([cat1], [cat2]) => cat1.localeCompare(cat2),
  );
  return (
    <div className="pb-5 max-w-4xl mx-auto">
      {postsByCat.map(([cat, posts]) => (
        <Block key={cat} cat={cat} posts={posts} />
      ))}
    </div>
  );
};

const Block: FC<{ cat: string; posts: Blog[] }> = ({
  cat,
  posts,
}) => {
  return (
    <div key={cat} className="relative secondbg rounded-lg p-4 m-4">
      <h2 className="font-title text-xl font-bold pb-2">{cat}</h2>
      <ul>
        {posts.map(post => (
          <li key={post.slug} className="py-2">
            <Link href={`/posts/${post.slug}`}>
              <a className="flex items-center space-x-4">
                <p className="flex-shrink-0 font-mono text-sm text-neutral-400 hidden sm:block">
                  {format(parseISO(post.publishDate), "yyyy-LL-dd")}
                </p>
                <h2 className="font-mono transition-all hover:text-red-500">
                  {post.title}
                </h2>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPosts;
