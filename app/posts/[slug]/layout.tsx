import dynamic from "next/dynamic";
import { format, parseISO } from "date-fns";
import { allBlogs } from "contentlayer/generated";

// intra-blog components
import Prose from "@/components/Prose";
const Comment = dynamic(() => import("@/components/posts/Comment"));
const License = dynamic(() => import("@/components/posts/License"));
const Series = dynamic(() => import("@/components/posts/Series"));

import metadata from "@/data/metadata";
import Callout from "@/components/posts/Callout";

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
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
            {post.series && (
              <Series slug={post.slug} series={post.series} />
            )}
            {post.gpt && (
              <Callout
                title="AI Generated Content Included"
                pic="/img/chatgpt.svg"
              >
                <p>
                  This blog was written with the assistance of
                  ChatGPT, a language model designed to provide
                  insightful and informative responses to a wide range
                  of topics.
                </p>
              </Callout>
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
