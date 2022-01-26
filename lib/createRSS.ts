import { Feed } from "feed";
import { parseISO } from "date-fns";
import fs from "fs";

import { allBlogs } from ".contentlayer/data";

import type { Blog } from ".contentlayer/types";

const createRSS = () => {
  const feed = new Feed({
    title: "Wenxuan's blog",
    description: "Wenxuan's blog",
    id: "https://www.whexy.com/",
    link: "https://www.whexy.com/",
    language: "zh",
    image: "https://www.whexy.com/img/hello.png",
    favicon: "https://www.whexy.com/favicon.ico",
    copyright: "All rights reserved, Wenxuan SHI",
    generator: "Whexy Feed Generator",
    feedLinks: {
      json: "https://www.whexy.com/feed/feed.json",
      atom: "https://example.com/feed/feed.xml",
    },
    author: {
      name: "Wenxuan SHI",
      email: "whexy@outlook.com",
      //   link: "https://www.whexy.com",
    },
  });

  allBlogs.forEach((post: Blog) => {
    const item = {
      title: post.title,
      id: `https://www.whexy.com/posts/${post.slug}`,
      link: `https://www.whexy.com/posts/${post.slug}`,
      description: post.summary,
      author: [
        {
          name: "Wenxuan SHI",
          email: "whexy@outlook.com",
          link: "https://www.whexy.com",
        },
      ],
      date: parseISO(post.publishDate),
      image: null,
    };
    if (post.image) {
      item.image = `https://www.whexy.com/${post.image}`;
    }
    feed.addItem(item);
  });

  // Output: RSS 2.0
  fs.writeFileSync("public/feed/feed.xml", feed.rss2());

  // Output: JSON Feed 1.0
  fs.writeFileSync("public/feed/feed.json", feed.json1());
};

export default createRSS;
