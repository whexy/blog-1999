import dynamic from "next/dynamic";
import { format, parseISO } from "date-fns";

// temperory fix for nextjs /app scrolling issues
import ScrollUp from "@/components/UI/Website/ScrollUp";

// intra-blog components
import Prose from "@/components/Layouts/Prose";
const Comment = dynamic(() => import("@/components/UI/Blog/Comment"));
const License = dynamic(() => import("@/components/UI/Blog/License"));
const Series = dynamic(() => import("@/components/UI/Blog/Series"));

import metadata from "@/data/metadata";
import { getBlogPost } from "@/lib/blog";
import WelcomeCard from "@/components/UI/Homepage/WelcomeCard";

type Language = "en" | "zh";

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Language; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getBlogPost(slug, lang);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <WelcomeCard showButtons={false} />
      <ScrollUp />
      <div>
        <article className="pb-5 font-article sm:pt-10">
          <Prose>
            <h1>{post.metadata.title}</h1>
            <div className="-mt-5 flex items-center justify-between pb-5 font-sans text-sm lg:text-base">
              <div className="inline-flex items-center space-x-1">
                <div>{metadata.author.name} / </div>
                <span>
                  {format(
                    parseISO(post.metadata.publishDate),
                    "MMMM dd, yyyy",
                  )}
                </span>
              </div>
            </div>
            {post.metadata.series && (
              <Series
                slug={post.slug}
                series={post.metadata.series}
              />
            )}
            {children}
            {post.metadata.series && (
              <Series
                slug={post.slug}
                series={post.metadata.series}
              />
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
