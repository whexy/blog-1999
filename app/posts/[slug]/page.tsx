"use client";

import { serialize } from "next-mdx-remote/serialize";
import MDXContent from "@/components/MDXContent";
import { getSanityContent } from "@/lib/sanity";

// rehype and remark plugins
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import rehypeImgSize from "rehype-img-size";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkMath from "remark-math";
import pangu from "remark-pangu";

export default async function Page({ params }) {
  const data = await getSanityContent({
    query: `
            query BlogBySlug($slug: String!) {
              allBlog(where: { slug: { current: { eq: $slug } } }) {
                  title
                  content
              }
            }`,
    variables: {
      slug: params.slug,
    },
  });

  const mdxSource = await serialize(data.allBlog[0].content, {
    mdxOptions: {
      rehypePlugins: [rehypeCodeTitles, rehypePrism, rehypeKatex],
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        remarkUnwrapImages,
        pangu,
      ],
      development: false,
    },
  });

  return (
    <div>
      <MDXContent mdxSource={mdxSource} />
    </div>
  );
}
