import type { MetadataRoute } from "next";
import { getAllBlogPosts, getAllSlugs } from "@/lib/blog";
import { locales, postUrl, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();
  const newest = posts[0]?.metadata.publishDate;

  const home: MetadataRoute.Sitemap = locales.map(lang => ({
    url: `${siteUrl}/${lang}`,
    lastModified: newest,
    alternates: {
      languages: Object.fromEntries(
        locales.map(l => [l, `${siteUrl}/${l}`]),
      ),
    },
  }));

  // One entry per existing (language, post) pair. Fallback URLs
  // (a post viewed in its missing language) are not listed; they
  // declare the real version as canonical.
  const entries: MetadataRoute.Sitemap = getAllSlugs().flatMap(
    slug => {
      const versions = posts.filter(p => p.slug === slug);
      const languages = Object.fromEntries(
        versions.map(p => [
          p.metadata.lang,
          postUrl(p.metadata.lang, slug),
        ]),
      );
      return versions.map(p => ({
        url: postUrl(p.metadata.lang, slug),
        lastModified: p.metadata.publishDate,
        alternates: { languages },
      }));
    },
  );

  return [...home, ...entries];
}
