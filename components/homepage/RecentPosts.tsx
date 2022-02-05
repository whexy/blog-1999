import PostCard from "@/components/PostCard";
import Link from "next/link";
import _ from "lodash";
import { parseISO } from "date-fns";

import type { Blog } from ".contentlayer/types";

const RecentPosts = ({ posts }: { posts: Blog[] }) => {
  const getYear = (post: Blog) =>
    parseISO(post.publishDate).getFullYear();
  const PostByYear = _.groupBy(posts, getYear);

  return (
    <div>
      <div className="pb-5">
        <div className="p-1 sm:flex sm:justify-between sm:divide-x sm:divide-red-600 sm:dark:divide-red-500">
          <div className="w-full whitespace-nowrap dark:bg-black-readable sm:w-2/12 sm:shrink-0 sm:pr-2">
            <div className="text-sm font-semibold uppercase text-red-600 dark:text-red-500">
              Posts
            </div>
            <Link href="/posts">
              <a className="text-lg font-black text-black-readable dark:text-white-readable">
                博客内容
              </a>
            </Link>
          </div>
          <div className="flex-1 pt-2 sm:pl-3">
            <PostCards PostByYear={PostByYear} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PostCards = ({ PostByYear }) => {
  return (
    <div className="flex flex-col space-y-10">
      {Object.keys(PostByYear)
        .reverse()
        .map(year => {
          const postList = PostByYear[year].sort((a, b) => {
            return (
              parseISO(b.publishDate).getTime() -
              parseISO(a.publishDate).getTime()
            );
          });
          postList.map((post, idx) => {
            post.vol = postList.length - idx;
          });
          const postCardView = postList.map(post => {
            post.url = `/posts/${post.slug}`;
            return <PostCard {...post} key={post.slug} />;
          });
          return (
            <div key={year}>
              <div className="pb-3 font-mono text-2xl font-bold">
                {`${year}`}
              </div>
              <div className="flex-col space-y-5">{postCardView}</div>
            </div>
          );
        })}
    </div>
  );
};

export default RecentPosts;
