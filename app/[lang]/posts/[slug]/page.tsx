import components from "@/components/MDX/MDXComponents";
import metadata from "@/data/metadata";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

// rehype and remark plugins
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkMath from "remark-math";
import { Metadata } from "next";

type Language = "en" | "zh";

interface PageProps {
  params: Promise<{ lang: Language; slug: string }>;
}

export default async function LanguagePost({ params }: PageProps) {
  const { lang, slug } = await params;
  const post = getBlogPost(slug, lang);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Compile and render MDX content
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

  return <MDXContent components={components} />;
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
