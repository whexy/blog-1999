import { useMDXComponent } from "next-contentlayer/hooks";
import components from "@/components/MDX/MDXComponents";
import metadata from "@/data/metadata";

import { allBlogs } from "contentlayer/generated";

export default function Post({
  params,
}: {
  params: { slug: string };
}) {
  const post = allBlogs.find(p => p.slug === params.slug);
  const Content = useMDXComponent(post.body.code);
  return <Content components={components} />;
}

export async function generateStaticParams() {
  return allBlogs.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = allBlogs.find(p => p.slug === params.slug);
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.publishDate,
      authors: [metadata.author.name],
    },
    twitter: {
      card: "summary",
      site: metadata.author.twitter,
      description: post.summary,
    },
  };
}
