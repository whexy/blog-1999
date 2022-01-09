import rehypePrism from "@mapbox/rehype-prism";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import Image from "next/image";
import rehypeImagePlaceholder from "rehype-image-placeholder";
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
      <p className="text-gray-400 dark:text-gray-600 font-light text-sm tracking-wider">
        <i className="fas fa-closed-captioning"></i> LICENSED UNDER CC BY-NC-SA
        4.0
      </p>
    </div>
  );
};

export default function Post({ postData }) {
  return (
    <div>
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
        <Comment />
      </main>
    </div>
  );
}
