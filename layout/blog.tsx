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
import type { Blog } from ".contentlayer/types";

export default function BlogLayout({
  children,
  post,
  bannerURI,
}: PropsWithChildren<{ post: Blog; bannerURI: string | null }>) {
  return (
    <div>
      <Seo
        title={post.title}
        path={`/posts/${post.slug}`}
        description={post.summary}
        image={post.image || ""}
      />
      <Head>
        <title>
          {post.title} | {metadata.title}
        </title>
        <meta name="description" content={post.summary} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css"
        ></link>
      </Head>
      <div className="bg-white dark:bg-black-readable">
        {post.preview && (
          <div className="border-b bg-yellow-400/20 px-2 py-4 text-center dark:border-white/20">
            <p className="text-sm dark:text-white">
              This article is currently not finished. What you see is
              the preview version. The article may be updated,
              modified or deleted at any time. Arguments, data or
              links in the text may not be available or credible.
            </p>
          </div>
        )}
        {post.image && (
          <div className="mx-auto max-w-3xl overflow-hidden sm:py-5">
            <Image
              src={post.image}
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
            <div className="-mt-5 flex items-center justify-between pb-5 text-sm font-light lg:text-base">
              <div className="inline-flex items-center space-x-1">
                <div>{metadata.author.name} / </div>
                <span className="text-gray-600">
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
        <div>
          <Comment slug={post.slug} />
          <div className="pt-5 opacity-0">Good Day</div>
        </div>
      </div>
    </div>
  );
}
