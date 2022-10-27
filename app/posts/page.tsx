"use client";

import Main from "@/components/Main";
import PageTitle from "@/components/tiny/PageTitle";
import { allBlogs, Blog } from "contentlayer/generated";
import pick from "lodash/pick";
import { format, parseISO, compareDesc } from "date-fns";
import PostCard from "@/components/PostCard";
import { useState } from "react";

const PostsView = () => {
  const posts = allBlogs
    .map(post =>
      pick(post, [
        "title",
        "slug",
        "image",
        "summary",
        "preview",
        "publishDate",
        "cat",
      ]),
    )
    .sort((p1, p2) =>
      compareDesc(parseISO(p1.publishDate), parseISO(p2.publishDate)),
    );
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts.filter(
    (post: Blog) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.cat.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchValue.toLowerCase()),
  );
  return (
    <Main>
      <PageTitle title="Posts" emoji="📝" />
      {/* <AllPosts posts={posts} /> */}
      <div className="relative mx-auto max-w-3xl">
        <input
          type="text"
          placeholder="Search articles"
          onChange={e => setSearchValue(e.target.value)}
          className="secondbg block w-full rounded-lg border px-4 py-2 text-gray-900 dark:text-gray-100"
        ></input>
        <svg
          className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <div className="pb-10">
        <div className="primary mx-auto mt-4 max-w-3xl space-y-6 py-5 sm:mt-10 sm:px-4">
          {!filteredBlogPosts.length && (
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              No posts found.
            </p>
          )}
          {filteredBlogPosts.map(post => (
            <PostCard
              key={post.title}
              title={post.title}
              url={`/posts/${post.slug}`}
              date={format(parseISO(post.publishDate), "yyyy/LL/dd")}
              summary={post.summary}
              showSummary={true}
            />
          ))}
        </div>
      </div>
    </Main>
  );
};

export default PostsView;
