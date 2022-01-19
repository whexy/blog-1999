import Head from "next/head";
import Image from "next/image";
import BigHi from "../components/homepage/BigHi";
import WelcomeCard from "../components/homepage/WelcomeCard";
import NoticeCard from "../components/homepage/NoticeCard";
import RecentPosts from "../components/homepage/RecentPosts";
import { getSortedPostsData } from "../lib/posts";
import createRSS from "../lib/feed";

export default function Home({ postsData }) {
  return (
    <>
      <Head>
        <title>Wenxuan SHI</title>
      </Head>
      <div className="bg-white-readable dark:bg-black-readable text-black-readable dark:text-white-readable">
        <main className="px-5 sm:px-0 mx-auto max-w-3xl bg-white-readable dark:bg-black-readable">
          <BigHi />
          <WelcomeCard />
          <NoticeCard />
          <RecentPosts posts={postsData} />
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const postsData = getSortedPostsData();
  const allPosts = postsData;
  createRSS(allPosts);
  return {
    props: {
      postsData: allPosts,
    },
  };
}
