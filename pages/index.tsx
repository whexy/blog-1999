import Head from "next/head";
import WelcomeCard from "@/components/homepage/WelcomeCard";
// import NoticeCard from "@/components/homepage/NoticeCard";
import RecentPosts from "@/components/homepage/RecentPosts";

import { allBlogs } from "contentlayer/generated";
import { pick } from "lodash";
import createRSS from "@/lib/createRSS";
import generateSiteMap from "@/lib/createSitemap";
import Rss from "@/components/homepage/Rss";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Wenxuan SHI</title>
      </Head>
      <div className="bg-white text-black-readable dark:bg-black-readable dark:text-white-readable">
        <main className="mx-auto max-w-4xl bg-white px-5 dark:bg-black-readable sm:px-2">
          <WelcomeCard />
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
    ]),
  );
  return { props: { posts } };
}
