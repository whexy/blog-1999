import RSS from "rss";
import { getAllBlogPosts } from "@/lib/blog";
import { postPath, postUrl, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  // An Umami pixel, counting feed readers that render item images.
  const pixelUrl = process.env.UMAMI_FEED_PIXEL_URL;

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
    let description = post.metadata.summary;
    if (pixelUrl) {
      // A distinct pixel URL per item, so reader image proxies don't
      // serve every item from one cached fetch.
      const pixel = new URL(pixelUrl);
      pixel.searchParams.set(
        "post",
        postPath(post.metadata.lang, post.slug),
      );
      description += `<img src="${pixel}" width="1" height="1" alt="" />`;
    }
    feed.item({
      title: post.metadata.title,
      description,
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
