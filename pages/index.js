import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeCard from "../components/homepage/WelcomeCard";
import NoticeCard from "../components/homepage/NoticeCard";
import RecentPosts from "../components/homepage/RecentPosts";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ postsData }) {
  return (
    <div className="bg-black-readable text-white-readable max-w-3xl mx-auto">
      <Header />
      <WelcomeCard />
      <NoticeCard />
      <RecentPosts posts={postsData} />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const postsData = getSortedPostsData();
  const recentPosts = postsData.slice(0, 5);
  return {
    props: {
      postsData: recentPosts,
    },
  };
}
