import { GetServerSideProps } from "next";
import React from "react";
import { allBlogs } from "contentlayer/generated";
import RSS from "rss";

const RSSFeed: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({
  res,
}) => {
  const feed = new RSS({
    title: "Whexy Blog",
    description: "a student obsessed with the computing world",
    feed_url: "https://whexy.com/feed/feed.xml",
    site_url: "https://whexy.com",
    image_url: "https://whexy.com/images/whexy.png",
    copyright: "Whexy",
  });

  allBlogs.forEach(blog => {
    feed.item({
      title: blog.title,
      description: blog.summary,
      url: `https://www.whexy.com/posts/${blog.slug}`,
      date: blog.publishDate,
    });
  });

  res.setHeader("Content-Type", "text/xml");
  res.write(feed.xml({ indent: true }));
  res.end();
  return {
    props: {},
  };
};

export default RSSFeed;
