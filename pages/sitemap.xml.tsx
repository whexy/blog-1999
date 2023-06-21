//pages/sitemap.xml.js

import { allBlogs } from "contentlayer/generated";

function generateSiteMap() {
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

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
