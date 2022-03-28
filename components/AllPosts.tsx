import type { Blog } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { groupBy } from "lodash";
import Link from "next/link";

const AllPosts = ({ posts }: { posts: Blog[] }) => {
  const postsByCat = groupBy(posts, "cat");
  return (
    <div className="pb-5">
      {Object.entries(postsByCat)
        .sort(([cat1], [cat2]) => cat1.localeCompare(cat2))
        .map(([cat, posts]) => (
          <div key={cat}>
            <h2 className="pt-4 font-title text-lg font-bold">
              {cat}
            </h2>
            <ul>
              {posts.map(post => (
                <li key={post.slug} className="py-2">
                  <Link href={`/posts/${post.slug}`}>
                    <a className="flex items-center space-x-4">
                      <p className="flex-shrink-0 font-mono text-sm text-neutral-400">
                        {format(
                          parseISO(post.publishDate),
                          "yyyy-LL-dd",
                        )}
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
        ))}
    </div>
  );
};

export default AllPosts;
