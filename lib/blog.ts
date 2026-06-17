import fs from "fs";
import path from "path";
import { queryTypstMetadata } from "@/lib/typst";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Language = "en" | "zh";

export type PostSource = "mdx" | "typ";

type Metadata = {
  title: string;
  summary: string;
  publishDate: string; // ISO string
  lang: Language;
  series?: string;
};

export type BlogPost = {
  slug: string;
  metadata: Metadata;
  /** Raw MDX body (frontmatter stripped) for MDX posts; empty for Typst posts. */
  content: string;
  /** Absolute path to the source file on disk. */
  filePath: string;
  /** Which content format this post uses. */
  source: PostSource;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const blogPostDir = "data/blog";

// ---------------------------------------------------------------------------
// Date parsing
// ---------------------------------------------------------------------------

/** Parse post date string and transform to ISO string. */
function parseDate(dateString: string): string {
  const publishDate = new Date(dateString);
  if (isNaN(publishDate.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }
  // Before 2022 treat as Beijing (UTC+8), else Chicago (UTC-6).
  const utcOffset = publishDate.getFullYear() < 2022 ? 8 : -6;
  publishDate.setHours(publishDate.getHours() + utcOffset);
  return publishDate.toISOString();
}

// ---------------------------------------------------------------------------
// MDX helpers
// ---------------------------------------------------------------------------

/** Parse raw MDX content — split frontmatter from body. */
function parseMdxFrontMatter(raw: string): {
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

  const kv: Record<string, string> = {};
  for (const line of block.trim().split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^['"](.*)['"]$/, "$1");
    if (key) kv[key] = value;
  }

  const result: Partial<Metadata> = {
    title: kv.title,
    summary: kv.summary,
    publishDate: kv.publishDate,
    series: kv.series,
  };

  if (kv.lang === "en" || kv.lang === "zh") {
    result.lang = kv.lang;
  }

  if (kv.publishDate) {
    result.publishDate = parseDate(kv.publishDate);
  }

  return { metadata: result, content };
}

// ---------------------------------------------------------------------------
// Filename parsing
// ---------------------------------------------------------------------------

/** Supported source file extensions. */
type SupportedExtension = ".mdx" | ".typ";

const supportedExtensions: SupportedExtension[] = [".mdx", ".typ"];

function isSupportedFile(name: string): boolean {
  return supportedExtensions.some(ext => name.endsWith(ext));
}

/** Parse filename into slug, optional language suffix, and source type. */
function parseFilename(file: string): {
  slug: string;
  langFromName?: Language;
  source: PostSource;
} {
  const ext = path.extname(file) as SupportedExtension;
  const source: PostSource = ext === ".typ" ? "typ" : "mdx";
  const base = path.basename(file, ext); // drops extension
  const m = /^(.+)\.(en|zh)$/.exec(base);
  return m
    ? { slug: m[1], langFromName: m[2] as Language, source }
    : { slug: base, langFromName: undefined, source };
}

// ---------------------------------------------------------------------------
// Cache
// ---------------------------------------------------------------------------

let cache:
  | {
      posts: BlogPost[];
      dirMtimeMs: number;
    }
  | undefined;

function getDirMtimeMs(dir: string): number {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let latest = 0;
  for (const e of entries) {
    if (!e.isFile() || !isSupportedFile(e.name)) continue;
    const stat = fs.statSync(path.join(dir, e.name));
    latest = Math.max(latest, stat.mtimeMs);
  }
  return latest;
}

export function clearBlogCache(): void {
  cache = undefined;
}

// ---------------------------------------------------------------------------
// Loaders per source type
// ---------------------------------------------------------------------------

function loadMdxPost(
  file: string,
  dir: string,
): Omit<BlogPost, "slug" | "metadata"> & {
  metaPartial: Partial<Metadata>;
} {
  const absPath = path.join(dir, file);
  const raw = fs.readFileSync(absPath, "utf-8");
  const { metadata: metaPartial, content } = parseMdxFrontMatter(raw);
  return { metaPartial, content, filePath: absPath, source: "mdx" };
}

function loadTypstPost(
  file: string,
  dir: string,
): Omit<BlogPost, "slug" | "metadata"> & {
  metaPartial: Partial<Metadata>;
} {
  const absPath = path.join(dir, file);
  const metaPartial = queryTypstMetadata(absPath);

  if (metaPartial.publishDate) {
    metaPartial.publishDate = parseDate(metaPartial.publishDate);
  }

  return {
    metaPartial,
    content: "",
    filePath: absPath,
    source: "typ",
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export const getAllBlogPosts = (): BlogPost[] => {
  const dir = path.join(process.cwd(), blogPostDir);
  const dirMtimeMs = getDirMtimeMs(dir);

  if (cache && cache.dirMtimeMs === dirMtimeMs) {
    return cache.posts;
  }

  const posts: BlogPost[] = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && isSupportedFile(e.name))
    .map(e => e.name)
    .map(file => {
      const { slug, langFromName, source } = parseFilename(file);

      const { metaPartial, content, filePath } =
        source === "typ"
          ? loadTypstPost(file, dir)
          : loadMdxPost(file, dir);

      const lang: Language = metaPartial.lang ?? langFromName ?? "en";

      const metadata: Metadata = {
        title: metaPartial.title!,
        summary: metaPartial.summary!,
        publishDate: metaPartial.publishDate!,
        lang,
        ...(metaPartial.series ? { series: metaPartial.series } : {}),
      };

      return {
        slug,
        metadata,
        content,
        filePath,
        source,
      } satisfies BlogPost;
    })
    // Newest first by publishDate.
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
