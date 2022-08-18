import Head from "next/head";
import dynamic from "next/dynamic";
import { format, parseISO } from "date-fns";

// intra-blog components
const Seo = dynamic(() => import("@/components/Seo"));
import Prose from "@/components/Prose";
const Comment = dynamic(() => import("@/components/posts/Comment"));
const License = dynamic(() => import("@/components/posts/License"));
const Series = dynamic(() => import("@/components/posts/Series"));

import metadata from "@/data/metadata";

import type { PropsWithChildren } from "react";
import type { Blog } from "contentlayer/generated";

export default function BlogLayout({
  children,
  post,
}: PropsWithChildren<{ post: Blog }>) {
  return (
    <div>
      <Seo
        title={post.title}
        path={`/posts/${post.slug}`}
        description={post.summary}
        image={`/${post.image}` || ""}
      />
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.summary} />
      </Head>
      <div className="bg-gray-100 dark:bg-stone-900">
        <article className="pb-5 font-article sm:pt-10">
          <Prose>
            <h1>{post.title}</h1>
            <div className="-mt-5 flex items-center justify-between pb-5 font-sans text-sm font-light lg:text-base">
              <div className="inline-flex items-center space-x-1">
                <div>{metadata.author.name} / </div>
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
