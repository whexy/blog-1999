import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import rehypeImagePlaceholder from "rehype-image-placeholder";
import rehypePrism from "@mapbox/rehype-prism";
import { MDXRemote } from "next-mdx-remote";
import { useSpring, animated, config } from "react-spring";
import { useState } from "react";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { getPlaceholder } from "../../lib/placeholder";
import Date from "../../lib/date";
import metadata from "../../data/metadata";
import Prose from "../../components/Prose";
import Callout from "../../components/posts/Callout";
import { Dialog, DialogBack } from "../../components/posts/Dialog";
import Comment from "../../components/posts/Comment";
import Avatar from "../../public/img/notion-avatar.svg";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);

  // Markdown Rehype
  const rawContent = postData.fileContent;
  const mdxSource = await serialize(rawContent, {
    mdxOptions: {
      rehypePlugins: [[rehypeImagePlaceholder, { dir: "public" }], rehypePrism],
    },
  });
  postData.mdx = mdxSource;

  // Get image placeholder
  if (postData.image) {
    const placeholder = await getPlaceholder(postData.image);
    postData.imgPlaceholder = placeholder;
  }

  return {
    props: {
      postData,
    },
  };
}

const ImgComponent = ({ src, alt, width, height, blurDataURL }) => {
  // const [hover, setHover] = useState(false);
  // const props = useSpring({
  //   scale: hover ? 1.05 : 1,
  // });
  return (
    <div
      // className=""
      // style={props}
      // onMouseEnter={() => {
      //   setHover(true);
      // }}
      // onMouseLeave={() => {
      //   setHover(false);
      // }}
    >
      <div className="grid place-items-center overflow-hidden rounded-lg dark:border dark:border-white/10">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>

      {alt && (
        <div className="text-center font-light text-jbgray-light text-sm">
          {alt}
        </div>
      )}
    </div>
  );
};

const components = {
  img: ImgComponent,
  pre: ({ className, children }) => (
    <>
      {children.props.filename && (
        <div className="code-title">{children.props.filename}</div>
      )}
      <pre className={className}>{children}</pre>
    </>
  ),
  Callout,
  Dialog,
  DialogBack,
};

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>
          {postData.title} | {metadata.title}
        </title>
        <description>{postData.excerpt}</description>
      </Head>
      <main className="bg-white dark:bg-black-readable">
        {postData.preview && (
          <div className="px-2 py-4 bg-yellow-400/20 border-b dark:border-white/20 text-center">
            <p className="text-sm dark:text-white">
              This article is currently not finished. What you see is the
              preview version. The article may be updated, modified or deleted
              at any time. Arguments, data or links in the text may not be
              available or credible.
            </p>
          </div>
        )}
        {postData.image && (
          <div className="mx-auto max-w-3xl overflow-hidden sm:py-5">
            <Image
              src={postData.image}
              alt="Cover"
              height={612}
              width={1224}
              className="sm:rounded-xl"
              placeholder="blur"
              blurDataURL={postData.imgPlaceholder}
            />
          </div>
        )}
        <article className="pt-5 pb-5">
          <Prose>
            <h1>{postData.title}</h1>
            <div className="flex text-sm font-light lg:text-base justify-between items-center -mt-5 pb-5">
              <div className="inline-flex space-x-1 items-center -ml-2">
                <div>
                  <Avatar className="w-10 h-10" />
                </div>
                <span>{metadata.author.name}</span>
              </div>
              <Date dateString={postData.date} className="text-gray-600" />
            </div>
            <MDXRemote {...postData.mdx} components={components} />
          </Prose>
        </article>
        <div className="max-w-2xl mx-auto px-2 pb-5">
          <Comment />
        </div>
      </main>
    </>
  );
}
