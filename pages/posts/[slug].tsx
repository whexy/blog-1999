import { useMDXComponent } from 'next-contentlayer/hooks';
import components from '../../components/posts/MDXComponents';
import BlogLayout from '../../layout/blog';


import { allBlogs } from '.contentlayer/data';
import type { Blog } from '.contentlayer/types';

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
    paths: allBlogs.map((p) => ({ params: { slug: p.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = allBlogs.find((p) => p.slug === params.slug);
  return {
    props: {
      post
    }
  };
}