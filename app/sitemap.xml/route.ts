import { getBlogPosts } from "@/lib/blog";

function generateSiteMap() {
  const allBlogs = getBlogPosts();
  const XMLContent = allBlogs
    .map(
      blog => `
     <url>
       <loc>${`https://www.whexy.com/posts/${blog.slug}`}</loc>
     </url>
    `,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   ${XMLContent}
   </urlset>
 `;
}

export async function GET() {
  const sitemap = generateSiteMap();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml;",
    },
  });
}
