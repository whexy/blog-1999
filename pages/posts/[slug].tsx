import { useMDXComponent } from "next-contentlayer/hooks";
import components from "@/components/posts/MDXComponents";
import BlogLayout from "@/layout/blog";

import { allBlogs } from ".contentlayer/data";
import type { Blog } from ".contentlayer/types";
import { blurImgURI } from "@/lib/blurImgURI";

import Seo from "@/components/Seo";

export default function Post({
  post,
  bannerURI,
}: {
  post: Blog;
  bannerURI: string | null;
}) {
  const Content = useMDXComponent(post.body.code);
  return (
    <>
      <Seo
        title={post.title}
        path={`/posts/${post.slug}`}
        description={post.summary}
        image={post.image || ""}
      />
      <BlogLayout post={post} bannerURI={bannerURI}>
        <Content components={{ ...components } as unknown} />
      </BlogLayout>
    </>
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

  // Get BlurImgURI of banner
  // TODO: After React 18, this prop should be replaced with Server Components
  if (post.image) {
    const bannerURI = await blurImgURI(post.image);
    return {
      props: {
        post,
        bannerURI,
      },
    };
  } else
    return {
      props: {
        post,
      },
    };
}
