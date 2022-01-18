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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

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
      <div className="flex space-x-2 items-center">
        <FontAwesomeIcon icon={faClosedCaptioning} className="w-10 h-10" />
        <p className="font-light text-sm tracking-wider">
          LICENSED UNDER CC BY-NC-SA 4.0
        </p>
      </div>
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
                <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
              </a>
            </Link>
            <Link href="https://twitter.com/whexyshi">
              <a>
                <FontAwesomeIcon icon={faTwitter} className="w-6 h-6 text-[#3b8ee9]" />
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
