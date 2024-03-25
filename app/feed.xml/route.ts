import { getBlogPosts } from "@/lib/blog";
import RSS from "rss";

export async function GET() {
  const allBlogs = getBlogPosts();

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
      title: blog.metadata.title,
      description: blog.metadata.summary,
      url: `https://www.whexy.com/posts/${blog.slug}`,
      date: blog.metadata.publishDate,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
