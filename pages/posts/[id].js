import Image from "next/image";
import Link from "next/link";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../lib/date";
import metadata from "../../metadata";
import Callout from "../../components/posts/Callout";
import Warn from "../../components/posts/Warn";

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
  const mdxSource = await serialize(rawContent);
  postData.mdx = mdxSource;

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <>
      <main className="bg-white">
        <div className="prose lg:prose-lg sm:py-5 mx-auto overscroll-contain">
          <div className="w-full h-auto rounded-t-xl overflow-hidden pb-5">
            <Image src={postData.image} height={612} width={1224} />
          </div>
          <h1 id="web-title">{postData.title}</h1>
          <div className="flex text-sm lg:text-base justify-between -mt-5 pb-5">
            <div>
              Written by: <Link href="/">{metadata.author.name}</Link>
            </div>
            <Date dateString={postData.date} className="text-gray-600" />
          </div>
          <MDXRemote {...postData.mdx} components={{Callout, Warn}} />
          {/* <PostContent content={postData.fileContent} /> */}
        </div>
      </main>
    </>
  );
}
