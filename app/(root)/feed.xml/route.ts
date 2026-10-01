import RSS from "rss";
import { getAllBlogPosts } from "@/lib/blog";
import { postUrl, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const feed = new RSS({
    title: "Whexy Blog",
    description: "a student obsessed with the computing world",
    feed_url: `${siteUrl}/feed.xml`,
    site_url: siteUrl,
    image_url: `${siteUrl}/images/whexy.png`,
    copyright: "Whexy",
  });

  for (const post of getAllBlogPosts()) {
    // Each language version is its own item with its own URL/GUID.
    const url = postUrl(post.metadata.lang, post.slug);
    feed.item({
      title: post.metadata.title,
      description: post.metadata.summary,
      url,
      guid: url,
      date: post.metadata.publishDate,
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
