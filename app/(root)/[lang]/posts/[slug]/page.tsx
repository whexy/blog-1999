import { createMDXComponents } from "@/components/MDX/MDXComponents";
import metadata from "@/data/metadata";
import {
  getAllSlugs,
  getAvailableLanguages,
  getBlogPost,
} from "@/lib/blog";
import { isLocale, postPath } from "@/lib/site";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

// rehype and remark plugins
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkMath from "remark-math";
import { remarkTypst } from "@/lib/remark-typst";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function LanguagePost({ params }: PageProps) {
  const { lang, slug } = await params;
  const post = isLocale(lang) ? getBlogPost(slug, lang) : undefined;
  if (!post) notFound();

  // Compile and render MDX content
  const compiled = await compile(post.content, {
    outputFormat: "function-body",
    rehypePlugins: [
      rehypeCodeTitles,
      rehypePrism as unknown,
      rehypeKatex as unknown,
    ],
    remarkPlugins: [
      remarkTypst,
      remarkGfm,
      remarkMath,
      remarkUnwrapImages,
    ],
  });

  const { default: MDXContent } = await run(compiled, runtime);

  return <MDXContent components={createMDXComponents()} />;
}

// Every slug is generated for both languages (the parent layout
// supplies `lang`); a post missing in one language falls back to the
// other and points its canonical URL there.
export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = isLocale(lang) ? getBlogPost(slug, lang) : undefined;
  if (!post) notFound();

  const languages = Object.fromEntries(
    getAvailableLanguages(slug).map(l => [l, postPath(l, slug)]),
  );

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    alternates: {
      canonical: postPath(post.metadata.lang, slug),
      languages,
    },
    openGraph: {
      type: "article",
      locale: post.metadata.lang === "zh" ? "zh_CN" : "en_US",
      url: postPath(post.metadata.lang, slug),
      title: post.metadata.title,
      description: post.metadata.summary,
      publishedTime: post.metadata.publishDate,
      authors: [metadata.author.name],
    },
    twitter: {
      card: "summary",
      site: metadata.author.twitter,
      description: post.metadata.summary,
    },
  };
}

export const dynamicParams = false;
