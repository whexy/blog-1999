import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import Prose from "@/components/Layouts/Prose";
import License from "@/components/UI/Blog/License";
import Series from "@/components/UI/Blog/Series";
import WelcomeCard from "@/components/UI/Homepage/WelcomeCard";
import metadata from "@/data/metadata";
import { getBlogPost, getSeriesPosts } from "@/lib/blog";
import { isLocale, postPath } from "@/lib/site";
import { extractHeadings } from "@/lib/toc";

const Comment = dynamic(() => import("@/components/UI/Blog/Comment"));
const JumpTable = dynamic(
  () => import("@/components/UI/Blog/JumpTable"),
);

const fallbackNote = {
  en: "This post is only available in Chinese.",
  zh: "本文仅有英文版本。",
} as const;

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const post = getBlogPost(slug, lang);
  if (!post) notFound();

  const postLang = post.metadata.lang;
  const headings = extractHeadings(post.content);
  const seriesPosts = post.metadata.series
    ? getSeriesPosts(post.metadata.series, postLang).map(p => ({
        slug: p.slug,
        title: p.metadata.title,
      }))
    : [];
  const series = post.metadata.series && (
    <Series
      slug={post.slug}
      series={post.metadata.series}
      posts={seriesPosts}
      lang={postLang}
    />
  );

  return (
    <div>
      <JumpTable headings={headings} />
      <WelcomeCard showButtons={false} />
      <div>
        <article
          lang={postLang === lang ? undefined : postLang}
          className="font-article pb-5 sm:pt-10">
          <Prose>
            {postLang !== lang && (
              <p lang={lang} className="font-sans text-sm opacity-60">
                <Link href={postPath(postLang, post.slug)}>
                  {fallbackNote[lang]}
                </Link>
              </p>
            )}
            <h1>{post.metadata.title}</h1>
            <div className="-mt-5 flex items-center justify-between pb-5 font-sans text-sm lg:text-base">
              <div className="inline-flex items-center space-x-1">
                <div>{metadata.author.name} / </div>
                <time dateTime={post.metadata.date}>
                  {format(
                    parseISO(post.metadata.date),
                    "MMMM dd, yyyy",
                  )}
                </time>
              </div>
            </div>
            {series}
            {children}
            {series}
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
