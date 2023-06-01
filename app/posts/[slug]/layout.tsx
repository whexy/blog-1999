import dynamic from "next/dynamic";
import { format, parseISO } from "date-fns";
import { allBlogs } from "contentlayer/generated";

// temperory fix for nextjs /app scrolling issues
import ScrollUp from "@/components/UI/Website/ScrollUp";

// intra-blog components
import Prose from "@/components/Layouts/Prose";
const Comment = dynamic(() => import("@/components/UI/Blog/Comment"));
const License = dynamic(() => import("@/components/UI/Blog/License"));
const Series = dynamic(() => import("@/components/UI/Blog/Series"));

import metadata from "@/data/metadata";

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
      <ScrollUp />
      <div className="bg-gray-100">
        <article className="pb-5 font-article sm:pt-10">
          <Prose>
            <h1>{post.title}</h1>
            <div className="-mt-5 flex items-center justify-between pb-5 font-sans text-sm lg:text-base">
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
