import Head from "next/head";
import Image from "next/image";
import { format, parseISO } from "date-fns";

// intra-blog components
import Prose from "../components/Prose"
import Ending from "../components/posts/Ending";
import License from "../components/posts/License";
import Comment from "../components/posts/Comment";
import metadata from "../data/metadata";

import type { PropsWithChildren } from 'react'
import type { Blog } from '.contentlayer/types';

export default function BlogLayout({ children, post }: PropsWithChildren<{ post: Blog }>) {
  return (
    <>
      <Head>
        <title>
          {post.title} | {metadata.title}
        </title>
        <meta name="description" content={post.summary} />
      </Head>
      <div className="bg-white dark:bg-black-readable">
        {post.preview && (
          <div className="px-2 py-4 bg-yellow-400/20 border-b dark:border-white/20 text-center">
            <p className="text-sm dark:text-white">
              This article is currently not finished. What you see is the
              preview version. The article may be updated, modified or deleted
              at any time. Arguments, data or links in the text may not be
              available or credible.
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
            // placeholder="blur"
            // blurDataURL={post.imgPlaceholder}
            />
          </div>
        )}
        <article className="pt-5 pb-5 font-article">
          <Prose>
            <h1>{post.title}</h1>
            <div className="flex text-sm font-light lg:text-base justify-between items-center -mt-5 pb-5">
              <div className="inline-flex space-x-1 items-center">
                <div>{metadata.author.name} / </div>
                <span className="text-gray-600">
                  {format(parseISO(post.createdDate), "MMMM dd, yyyy")}
                </span>
              </div>
              <div>
                {post.readingTime.text}
              </div>
            </div>
            {children}
            <License />
          </Prose>
        </article>
        <Ending />
        <Comment />
      </div>
    </>
  );
}