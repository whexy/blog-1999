import Head from "next/head";
import pick from "lodash/pick";

import WelcomeCard from "@/components/homepage/WelcomeCard";
import RecentPosts from "@/components/homepage/RecentPosts";
import { allBlogs } from "contentlayer/generated";

import createRSS from "@/lib/createRSS";
import generateSiteMap from "@/lib/createSitemap";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Wenxuan Shi</title>
      </Head>
      <div className="min-h-[80vh] bg-gray-100 text-black-readable dark:bg-black dark:text-white-readable">
        <main className="mx-auto max-w-4xl px-2">
          <WelcomeCard />
          <RecentPosts posts={posts} />
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // generate RSS Feed
  createRSS();
  generateSiteMap();

  const posts = allBlogs.map(post =>
    pick(post, [
      "title",
      "slug",
      "image",
      "summary",
      "preview",
      "publishDate",
      "featured",
    ]),
  );
  return { props: { posts } };
}
