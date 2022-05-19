import Head from "next/head";
import pick from "lodash/pick";

import WelcomeCard from "@/components/homepage/WelcomeCard";
import RecentPosts from "@/components/homepage/RecentPosts";
import FeaturedPosts from "@/components/homepage/FeaturedPosts";
import Rss from "@/components/homepage/Rss";
// import NoticeCard from "@/components/homepage/NoticeCard";
import { allBlogs } from "contentlayer/generated";

import createRSS from "@/lib/createRSS";
import generateSiteMap from "@/lib/createSitemap";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Wenxuan Shi</title>
      </Head>
      <div className="bg-white text-black-readable dark:bg-black-readable dark:text-white-readable">
        <main className="mx-auto max-w-4xl bg-white px-5 dark:bg-black-readable sm:px-2">
          <WelcomeCard />
          <FeaturedPosts posts={posts} />
          <RecentPosts posts={posts} />
          <Rss />
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
