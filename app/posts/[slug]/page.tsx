import components from "@/components/MDX/MDXComponents";
import metadata from "@/data/metadata";
import { getBlogPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

// rehype and remark plugins
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkMath from "remark-math";
import pangu from "remark-pangu";

export default function Post({
  params,
}: {
  params: { slug: string };
}) {
  const allBlogs = getBlogPosts();
  const post = allBlogs.find(p => p.slug === params.slug);
  return (
    <>
      <MDXRemote
        components={{ ...components }}
        source={post.content}
        options={{
          mdxOptions: {
            rehypePlugins: [
              rehypeCodeTitles,
              rehypePrism as unknown,
              rehypeKatex as unknown,
            ],
            remarkPlugins: [
              remarkGfm,
              remarkMath,
              remarkUnwrapImages,
              pangu,
            ],
          },
        }}
      />
    </>
  );
}

export async function generateStaticParams() {
  const allBlogs = getBlogPosts();
  return allBlogs.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const allBlogs = getBlogPosts();
  const post = allBlogs.find(p => p.slug === params.slug);
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
