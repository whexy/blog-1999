import dynamic from "next/dynamic";
import { format, parseISO } from "date-fns";
import { allBlogs } from "contentlayer/generated";

// intra-blog components
import Image from "next/image";
import Prose from "@/components/Prose";
const Comment = dynamic(() => import("@/components/posts/Comment"));
const License = dynamic(() => import("@/components/posts/License"));
const Series = dynamic(() => import("@/components/posts/Series"));

import metadata from "@/data/metadata";

export function generateMetadata({ params }) {
  const post = allBlogs.find(p => p.slug === params.slug);
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.publishDate,
      authors: [metadata.author.name],
    },
    twitter: {
      card: "summary",
      site: metadata.author.twitter,
      description: post.summary,
    },
  };
}

export default async function BlogLayout({ children, params }) {
  const post = allBlogs.find(p => p.slug === params.slug);
  return (
    <div>
      <div className="bg-gray-100">
        <article className="pb-5 font-article sm:pt-10">
          <Prose>
            <h1>{post.title}</h1>
            <div className="-mt-5 flex items-center justify-between pb-5 font-sans text-sm font-light lg:text-base">
              <div className="inline-flex items-center space-x-1">
                <div>
                  {metadata.author.name}
                  {post.gpt && ", ChatGPT*"} /{" "}
                </div>
                <span>
                  {format(
                    parseISO(post.publishDate),
                    "MMMM dd, yyyy",
                  )}
                </span>
              </div>
              <div>{post.readingTime.text}</div>
            </div>
            {post.gpt && (
              <div className="not-prose">
                <div className="secondbg inline-flex items-center space-x-2 rounded-lg px-4 py-2 font-title text-sm lg:text-base">
                  <Image
                    src="/img/chatgpt.svg"
                    alt="ChatGPT Icon"
                    width={30}
                    height={30}
                  />
                  <p>
                    This blog was written with the assistance of
                    ChatGPT, a language model designed to provide
                    insightful and informative responses to a wide
                    range of topics.
                  </p>
                </div>
              </div>
            )}
            {post.series && (
              <Series slug={post.slug} series={post.series} />
            )}
            {children}
            {post.series && (
              <Series slug={post.slug} series={post.series} />
            )}
            <License />
          </Prose>
        </article>
        <div className="pb-10">
          <Comment slug={post.slug} />
        </div>
      </div>
    </div>
  );
}
