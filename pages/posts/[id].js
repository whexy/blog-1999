import rehypePrism from "@mapbox/rehype-prism";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import rehypeImagePlaceholder from "rehype-image-placeholder";
import remarkUnwrapImages from "remark-unwrap-images";
import Callout from "../../components/posts/Callout";
import Comment from "../../components/posts/Comment";
import { Dialog, DialogBack } from "../../components/posts/Dialog";
import ImgComponent from "../../components/posts/ImgComponent";
import QuoteComponent from "../../components/posts/QuoteComponent";
import PreComponent from "../../components/posts/PreComponent";
import AnimatedFancyCard from "../../components/AnimatedFancyCard";
import Series from "../../components/posts/Series";
import Prose from "../../components/Prose";
import metadata from "../../data/metadata";
import Date from "../../lib/date";
import { getPlaceholder } from "../../lib/placeholder";
import {
  getAllPostIds,
  getPostData,
  getSeriesPostsData,
} from "../../lib/posts";
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
      remarkPlugins: [remarkUnwrapImages],
    },
  });
  postData.mdx = mdxSource;

  // Get Minutes to read
  const enMin = rawContent.split(" ").length / 200;
  const zhChars = rawContent.match(/[\u4e00-\u9fff\uf900-\ufaff]/g);
  const zhCharNum = !zhChars ? 0 : zhChars.length;
  const zhMin = zhCharNum / 400;
  postData.minutes = Math.round(Math.max(enMin, zhMin));

  // Get image placeholder
  if (postData.image) {
    const placeholder = await getPlaceholder(postData.image);
    postData.imgPlaceholder = placeholder;
  }

  // Get Series Post Data
  if (postData.series) {
    postData.seriesPosts = getSeriesPostsData(postData.series);
  }

  return {
    props: {
      postData,
    },
  };
}

const components = {
  img: ImgComponent,
  pre: PreComponent,
  Quote: QuoteComponent,
  Callout,
  Dialog,
  DialogBack,
  AnimatedFancyCard, // 《个人博客搭建指北》中使用
};

const License = () => {
  return (
    <div>
      <p className="font-light text-sm tracking-wider">
        © LICENSED UNDER CC BY-NC-SA 4.0
      </p>
    </div>
  );
};

const Ending = () => {
  return (
    <div className="secondbg sm:rounded-full border overflow-hidden max-w-3xl mx-auto mb-10 dark:text-white">
      <div className="grid grid-cols-3 space-x-2">
        <div className="bg-red-100 col-span-1 grid place-items-center">
          <Avatar className="w-20 h-20" />
        </div>
        <div className="col-span-2 p-4">
          <p className="font-bold text-lg">
            Loved this post? Consider following me.
          </p>
          <p className="font-light text-sm text-gray-600 dark:text-gray-400">
            I work on topics related to system security aside with many other
            interesting things. I would love to have friends who share the same
            interests as me.
          </p>
          <div className="pt-2 flex text-2xl space-x-3">
            <Link href="https://github.com/whexy">
              <a>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-current"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </Link>
            <Link href="https://twitter.com/whexyshi">
              <a>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-[#1DA1F2]"
                >
                  <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
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
              quality={100}
              className="sm:rounded-xl"
              placeholder="blur"
              blurDataURL={postData.imgPlaceholder}
            />
          </div>
        )}
        <article className="pt-5 pb-5 font-article">
          <Prose>
            <h1>{postData.title}</h1>
            <div className="flex text-sm font-light lg:text-base justify-between items-center -mt-5 pb-5">
              <div className="inline-flex space-x-1 items-center">
                <div>{metadata.author.name} / </div>
                <Date dateString={postData.date} className="text-gray-600" />
              </div>
              <div>
                {postData.minutes} minute{postData.minutes > 1 && "s"} to read
              </div>
            </div>
            {postData.series && (
              <Series
                title={postData.title}
                series={postData.series}
                seriesPosts={postData.seriesPosts}
              />
            )}
            <MDXRemote {...postData.mdx} components={components} />
            {postData.series && (
              <Series
                title={postData.title}
                series={postData.series}
                seriesPosts={postData.seriesPosts}
              />
            )}
            <License />
          </Prose>
        </article>
        <Ending />
        <Comment />
      </main>
    </>
  );
}
