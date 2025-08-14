import components from "@/components/MDX/MDXComponents";
import metadata from "@/data/metadata";
import { getBlogPosts } from "@/lib/blog";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

// rehype and remark plugins
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkMath from "remark-math";
import pangu from "remark-pangu";

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allBlogs = getBlogPosts();
  const post = allBlogs.find(p => p.slug === slug);

  // Compile and render MDX content
  const compiled = await compile(post.content, {
    outputFormat: "function-body",
    rehypePlugins: [
      rehypeCodeTitles,
      rehypePrism as unknown,
      rehypeKatex as unknown,
    ],
    remarkPlugins: [remarkGfm, remarkMath, remarkUnwrapImages, pangu],
  });

  const { default: MDXContent } = await run(compiled, runtime);

  return (
    <>
      <MDXContent components={components} />
    </>
  );
}

export async function generateStaticParams() {
  const allBlogs = getBlogPosts();
  return allBlogs.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allBlogs = getBlogPosts();
  const post = allBlogs.find(p => p.slug === slug);
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
