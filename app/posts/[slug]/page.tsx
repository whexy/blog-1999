import { useMDXComponent } from "next-contentlayer/hooks";
import components from "@/components/MDXComponents";
import BlogLayout from "@/layout/blog";

import { allBlogs } from "contentlayer/generated";

export default function Post({
  params,
}: {
  params: { slug: string };
}) {
  const post = allBlogs.find(p => p.slug === params.slug);
  const Content = useMDXComponent(post.body.code);
  return (
    <BlogLayout post={post}>
      <Content components={components} />
    </BlogLayout>
  );
}

export async function generateStaticParams() {
  return allBlogs.map(p => ({ slug: p.slug }));
}
