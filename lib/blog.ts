import fs from "fs";
import path from "path";

type Language = "en" | "zh";

type Metadata = {
  title: string;
  summary: string;
  publishDate: string; // ISO string
  lang: Language;
  series?: string;
};

type BlogPost = {
  slug: string;
  metadata: Metadata;
  content: string;
};

const blogPostDir = "data/blog";

/** Parse post date string and transform to ISO string. */
function parseDate(dateString: string): string {
  const publishDate = new Date(dateString);
  if (isNaN(publishDate.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }
  // before 2022 treat as Beijing (UTC+8), else Chicago (UTC-6)
  const utcOffset = publishDate.getFullYear() < 2022 ? 8 : -6;
  publishDate.setHours(publishDate.getHours() + utcOffset);
  return publishDate.toISOString();
}

/** Parse raw blog post, split into metadata and content. */
function parseFrontMatter(raw: string): {
  metadata: Partial<Metadata>;
  content: string;
} {
  const fm = /---\s*([\s\S]*?)\s*---/;
  const m = fm.exec(raw);
  if (!m) {
    return { metadata: {} as Metadata, content: raw.trim() };
  }
  const block = m[1];
  const content = raw.slice(m[0].length).trim();

  const metadata: Record<string, string> = {};
  for (const line of block.trim().split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^['"](.*)['"]$/, "$1");
    if (key) metadata[key] = value;
  }

  const result: Partial<Metadata> = {
    title: metadata.title,
    summary: metadata.summary,
    publishDate: metadata.publishDate,
    series: metadata.series,
  };

  if (metadata.lang === "en" || metadata.lang === "zh") {
    result.lang = metadata.lang;
  }

  if (metadata.publishDate) {
    result.publishDate = parseDate(metadata.publishDate);
  }

  return { metadata: result, content };
}

/** Parse filename into slug and optional language suffix. */
function parseFilename(file: string): {
  slug: string;
  langFromName?: Language;
} {
  const base = path.parse(file).name; // drops .mdx
  const m = /^(.+)\.(en|zh)$/.exec(base);
  return m
    ? { slug: m[1], langFromName: m[2] as Language }
    : { slug: base, langFromName: undefined };
}

let cache:
  | {
      posts: BlogPost[];
      dirMtimeMs: number;
    }
  | undefined;

function getDirMtimeMs(dir: string): number {
  // Use latest mtime across files to detect changes cheaply.
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let latest = 0;
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith(".mdx")) continue;
    const stat = fs.statSync(path.join(dir, e.name));
    latest = Math.max(latest, stat.mtimeMs);
  }
  return latest;
}

export function clearBlogCache(): void {
  cache = undefined;
}

export const getAllBlogPosts = (): BlogPost[] => {
  const dir = path.join(process.cwd(), blogPostDir);
  const dirMtimeMs = getDirMtimeMs(dir);

  if (cache && cache.dirMtimeMs === dirMtimeMs) {
    return cache.posts;
  }

  const posts: BlogPost[] = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith(".mdx"))
    .map(e => e.name)
    .map(file => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { metadata: metaPartial, content } =
        parseFrontMatter(raw);

      const { slug, langFromName } = parseFilename(file);

      const lang: Language = metaPartial.lang ?? langFromName ?? "en"; // filename suffix can supply lang

      const metadata: Metadata = {
        title: metaPartial.title!,
        summary: metaPartial.summary!,
        publishDate: metaPartial.publishDate!, // already ISO
        lang,
        ...(metaPartial.series ? { series: metaPartial.series } : {}),
      };

      return {
        slug,
        metadata,
        content,
      } satisfies BlogPost;
    })
    // newest first by publishDate
    .sort((a, b) =>
      a.metadata.publishDate < b.metadata.publishDate ? 1 : -1,
    );

  cache = { posts, dirMtimeMs };
  return posts;
};

export function getBlogPost(
  slug: string,
  lang: Language = "en",
): BlogPost | undefined {
  const all = getAllBlogPosts();
  return (
    all.find(p => p.slug === slug && p.metadata.lang === lang) ??
    all.find(p => p.slug === slug)
  );
}

export function getAvailableLanguages(slug: string): Language[] {
  const all = getAllBlogPosts();
  const langs = new Set<Language>();
  for (const p of all) {
    if (p.slug === slug) langs.add(p.metadata.lang);
  }
  return [...langs];
}
