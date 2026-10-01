import fs from "fs";
import path from "path";
import type { Language } from "@/lib/site";

export type { Language } from "@/lib/site";

export type Metadata = {
  title: string;
  summary: string;
  /** Publish instant as an ISO-8601 string (for sorting, feeds). */
  publishDate: string;
  /** Calendar date from the frontmatter (`YYYY-MM-DD`). */
  date: string;
  lang: Language;
  series?: string;
};

export type BlogPost = {
  slug: string;
  metadata: Metadata;
  content: string;
};

const blogPostDir = "data/blog";
const isProduction = process.env.NODE_ENV === "production";

/**
 * Turn a frontmatter date (`YYYY-MM-DD`) into a publish instant.
 *
 * Posts before 2022 were written in Beijing (UTC+8) and are pinned
 * to local midnight there. Later posts were written in Chicago; they
 * are pinned to local noon (CST, UTC-6), which stays on the same
 * calendar day whether or not daylight saving time is in effect.
 */
function parseDate(dateString: string, file: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  if (!m) {
    throw new Error(
      `Invalid publishDate "${dateString}" in ${file} ` +
        "(expected YYYY-MM-DD)",
    );
  }
  const year = Number(m[1]);
  const time = year < 2022 ? "T00:00:00+08:00" : "T12:00:00-06:00";
  const instant = new Date(`${dateString}${time}`);
  if (isNaN(instant.getTime())) {
    throw new Error(`Invalid publishDate "${dateString}" in ${file}`);
  }
  return instant.toISOString();
}

/** Split a raw post into frontmatter key/values and content. */
function parseFrontMatter(
  raw: string,
  file: string,
): { fields: Record<string, string>; content: string } {
  const fm = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;
  const m = fm.exec(raw);
  if (!m) {
    throw new Error(`Missing frontmatter block in ${file}`);
  }
  const content = raw.slice(m[0].length).trim();

  const fields: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, "$2");
    if (key) fields[key] = value;
  }

  return { fields, content };
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

function parsePost(dir: string, file: string): BlogPost {
  const raw = fs.readFileSync(path.join(dir, file), "utf-8");
  const { fields, content } = parseFrontMatter(raw, file);
  const { slug, langFromName } = parseFilename(file);

  for (const key of ["title", "summary", "publishDate"]) {
    if (!fields[key]) {
      throw new Error(
        `Missing required frontmatter field "${key}" in ${file}`,
      );
    }
  }

  const langField =
    fields.lang === "en" || fields.lang === "zh"
      ? fields.lang
      : undefined;
  // filename suffix can supply lang
  const lang: Language = langField ?? langFromName ?? "en";

  const metadata: Metadata = {
    title: fields.title,
    summary: fields.summary,
    publishDate: parseDate(fields.publishDate, file),
    date: fields.publishDate,
    lang,
    ...(fields.series ? { series: fields.series } : {}),
  };

  return { slug, metadata, content };
}

/** Newest first; ties broken by slug, then language. */
function comparePosts(a: BlogPost, b: BlogPost): number {
  return (
    b.metadata.publishDate.localeCompare(a.metadata.publishDate) ||
    a.slug.localeCompare(b.slug) ||
    a.metadata.lang.localeCompare(b.metadata.lang)
  );
}

let cache:
  | {
      posts: BlogPost[];
      version: number;
    }
  | undefined;

/**
 * Cheap change detector for development: the latest mtime across
 * the directory itself (add/remove/rename) and every post file.
 */
function getDirVersion(dir: string): number {
  let latest = fs.statSync(dir).mtimeMs;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
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

  // Content is immutable in production builds; only re-check the
  // file system during development.
  if (cache && isProduction) return cache.posts;
  const version = isProduction ? 0 : getDirVersion(dir);
  if (cache && cache.version === version) return cache.posts;

  const posts: BlogPost[] = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith(".mdx"))
    .map(e => parsePost(dir, e.name))
    .sort(comparePosts);

  cache = { posts, version };
  return posts;
};

/**
 * Find a post by slug, preferring the requested language and falling
 * back to any other available language.
 */
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

/** Posts of a series in one language, oldest first. */
export function getSeriesPosts(
  series: string,
  lang: Language,
): BlogPost[] {
  return getAllBlogPosts()
    .filter(
      p => p.metadata.series === series && p.metadata.lang === lang,
    )
    .reverse();
}

/** All distinct post slugs, newest first. */
export function getAllSlugs(): string[] {
  return [...new Set(getAllBlogPosts().map(p => p.slug))];
}
