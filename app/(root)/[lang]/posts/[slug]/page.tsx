import { createMDXComponents } from "@/components/MDX/MDXComponents";
import TypstContent from "@/components/Typst/TypstContent";
import metadata from "@/data/metadata";
import {
  getBlogPost,
  getAllBlogPosts,
  type BlogPost,
} from "@/lib/blog";
import { compileTypstToHtml } from "@/lib/typst";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { Metadata } from "next";

// rehype and remark plugins
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkMath from "remark-math";

type Language = "en" | "zh";

interface PageProps {
  params: Promise<{ lang: Language; slug: string }>;
}

// ---------------------------------------------------------------------------
// Per-source renderers
// ---------------------------------------------------------------------------

async function renderMdxPost(post: BlogPost) {
  const compiled = await compile(post.content, {
    outputFormat: "function-body",
    rehypePlugins: [
      rehypeCodeTitles,
      rehypePrism as unknown,
      rehypeKatex as unknown,
    ],
    remarkPlugins: [remarkGfm, remarkMath, remarkUnwrapImages],
  });

  const { default: MDXContent } = await run(compiled, runtime);

  return <MDXContent components={createMDXComponents()} />;
}

function renderTypstPost(post: BlogPost) {
  const html = compileTypstToHtml(post.filePath);
  return <TypstContent html={html} />;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function LanguagePost({ params }: PageProps) {
  const { lang, slug } = await params;
  const post = getBlogPost(slug, lang);

  if (!post) {
    return <div>Post not found</div>;
  }

  switch (post.source) {
    case "mdx":
      return renderMdxPost(post);
    case "typ":
      return renderTypstPost(post);
  }
}

export async function generateStaticParams() {
  return getAllBlogPosts().map(post => ({
    lang: post.metadata.lang,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getBlogPost(slug, lang);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    openGraph: {
      type: "article",
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
