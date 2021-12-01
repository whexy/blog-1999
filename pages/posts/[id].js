import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import rehypeImagePlaceholder from "rehype-image-placeholder";
import { MDXRemote } from "next-mdx-remote";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../lib/date";
import metadata from "../../metadata";
import Callout from "../../components/posts/Callout";
import Warn from "../../components/posts/Warn";
import Comment from "../../components/posts/Comment";
import avatar from "../../public/img/android-chrome-192x192.png";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  const rawContent = postData.fileContent;
  const mdxSource = await serialize(rawContent, {
    mdxOptions: {
      rehypePlugins: [[rehypeImagePlaceholder, { dir: "public" }]],
    },
  });
  postData.mdx = mdxSource;

  return {
    props: {
      postData,
    },
  };
}

const components = {
  img: ({ src, alt, width, height, blurDataURL }) => (
    <div className="grid place-items-center">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    </div>
  ),
  Callout,
  Warn,
};

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>
          {postData.title} | {metadata.title}
        </title>
        <description>{postData.excerpt}</description>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
      </Head>
      <main className="bg-white">
        <div className="mx-auto max-w-3xl overflow-hidden sm:pt-5 pb-5">
          <Image
            src={postData.image}
            height={612}
            width={1224}
            className="sm:rounded-xl"
          />
        </div>
        <article className="font-display prose sm:pt-5 pb-5 mx-2 sm:mx-auto overscroll-contain">
          <h1>{postData.title}</h1>
          <div className="flex text-sm lg:text-base justify-between -mt-5 pb-5">
            <div className="inline-flex space-x-1 items-center">
              <div className="object-contain w-6 h-6 rounded-full border border-gray-700">
                <Image src={avatar} />
              </div>
              <Link href="/">{metadata.author.name}</Link>
            </div>
            <Date dateString={postData.date} className="text-gray-600" />
          </div>
          <MDXRemote {...postData.mdx} components={components} />
        </article>
        <div className="max-w-2xl mx-auto px-2 pb-5">
          <Comment />
        </div>
      </main>
    </>
  );
}
