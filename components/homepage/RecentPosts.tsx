import PostCard from "../PostCard";
import Link from "next/link";
import _ from "lodash";
import { parseISO } from "date-fns";

import type { Blog } from ".contentlayer/types";

const RecentPosts = ({ posts }: { posts: Blog[] }) => {
  const getYear = (post: Blog) => parseISO(post.createdDate).getFullYear();
  const PostByYear = _.groupBy(posts, getYear);

  return (
    <div>
      <div className="pb-5">
        <div className="p-1 sm:flex sm:justify-between sm:divide-x sm:divide-red-600 sm:dark:divide-red-500">
          <div className="sm:shrink-0 w-full sm:w-2/12 whitespace-nowrap sm:pr-2 dark:bg-black-readable">
            <div className="uppercase font-semibold text-sm text-red-600 dark:text-red-500">
              Posts
            </div>
            <Link href="/posts">
              <a className="font-black text-lg text-black-readable dark:text-white-readable">
                博客内容
              </a>
            </Link>
          </div>
          <div className="pt-2 sm:pl-3 flex-1">
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
        .map((year) => {
          const postList = PostByYear[year].sort((a, b) => {
            return parseISO(b.createdDate).getTime() - parseISO(a.createdDate).getTime();
          });
          postList.map((post, idx) => {
            post.vol = postList.length - idx;
          });
          const postCardView = postList
            .map((post) => {
              post.url = `/posts/${post.slug}`;
              return <PostCard {...post} key={post.slug} />;
            });
          return (
            <div key={year}>
              <div className="font-mono font-bold text-2xl pb-3">
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
