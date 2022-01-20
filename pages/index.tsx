import Head from "next/head";
import BigHi from "../components/homepage/BigHi";
import WelcomeCard from "../components/homepage/WelcomeCard";
import NoticeCard from "../components/homepage/NoticeCard";
import RecentPosts from "../components/homepage/RecentPosts";

import { allBlogs } from '.contentlayer/data'
import { pick } from "lodash";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Wenxuan SHI</title>
      </Head>
      <div className="bg-white dark:bg-black-readable text-black-readable dark:text-white-readable">
        <main className="px-5 sm:px-0 mx-auto max-w-3xl bg-white dark:bg-black-readable">
          <BigHi />
          <WelcomeCard />
          <NoticeCard />
          <RecentPosts posts={posts} />
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = allBlogs.map((post) =>
    pick(post, [
      'title',
      'slug',
      'image',
      'summary',
      'preview',
      'publishDate',
    ])
  );
  return { props: { posts } };
}
