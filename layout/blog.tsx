import Head from "next/head";
import Image from "next/image";
import { format, parseISO } from "date-fns";

// intra-blog components
import Seo from "@/components/Seo";
import Prose from "@/components/Prose";
import Comment from "@/components/posts/Comment";
import License from "@/components/posts/License";
import Series from "@/components/posts/Series";
import metadata from "@/data/metadata";

import type { PropsWithChildren } from "react";
import type { Blog } from "contentlayer/generated";
import Rss from "@/components/homepage/Rss";

export default function BlogLayout({
  children,
  post,
  bannerURI,
}: PropsWithChildren<{ post: Blog; bannerURI: string | null }>) {
  // If a post contains more than 200 chinese characters, it is considered to be a chinese blog.
  // const isChineseBlog = post.chineseCharNum >= 200;
  return (
    <div>
      <Seo
        title={post.title}
        path={`/posts/${post.slug}`}
        description={post.summary}
        image={`/${post.image}` || ""}
      />
      <Head>
        <title>
          {post.title} | {metadata.title}
        </title>
        <meta name="description" content={post.summary} />
      </Head>
      <div className="bg-white dark:bg-black-readable">
        {post.image && (
          <div className="mx-auto max-w-3xl overflow-hidden sm:py-5">
            <Image
              src={`/${post.image}`}
              alt="Cover"
              height={612}
              width={1224}
              quality={100}
              className="sm:rounded-xl"
              placeholder="blur"
              blurDataURL={bannerURI}
            />
          </div>
        )}
        <article className="pt-5 pb-5 font-article">
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
        <div className="mx-auto max-w-2xl">
          <Rss />
        </div>
        <div className="pb-10">
          <Comment slug={post.slug} />
        </div>
      </div>
    </div>
  );
}
