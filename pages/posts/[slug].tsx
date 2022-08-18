import { useMDXComponent } from "next-contentlayer/hooks";
import components from "@/components/MDXComponents";
import BlogLayout from "@/layout/blog";

import { allBlogs } from "contentlayer/generated";
import type { Blog } from "contentlayer/generated";

export default function Post({ post }: { post: Blog }) {
  const Content = useMDXComponent(post.body.code);
  return (
    <BlogLayout post={post}>
      <Content components={{ ...components } as unknown} />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: allBlogs.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = allBlogs.find(p => p.slug === params.slug);
  return {
    props: {
      post,
    },
  };
}
