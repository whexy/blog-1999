import fs from "fs";
import path from "path";

// Keep the metadata simple.
// Since type info is not available in the runtime, we must declare all the fields as string.
type Metadata = {
  title: string;
  publishDate: string;
  summary: string;
  series?: string;
  image?: string;
  featured?: string;
  lang?: "en" | "zh";
};

type Language = "en" | "zh";

// transform publishDate from yyyy-mm-dd to ISO.
function parseDate(dateString: string): string {
  const publishDate = new Date(dateString);
  if (isNaN(publishDate.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }
  const year = publishDate.getFullYear();
  const month = publishDate.getMonth() + 1;
  const day = publishDate.getDate();

  // Wenxuan followed Beijing time until Augest 2022, and switched to Chicago Time thereafter.
  // By the way, fuck DST, I don't care.
  const utcOffset =
    year < 2022 || (year === 2022 && month <= 8) ? 8 : -6;

  const adjustedDate = new Date(
    Date.UTC(year, month - 1, day, utcOffset),
  );
  return adjustedDate.toISOString();
}

function parseFrontMatter(fileContent: string): {
  metadata: Metadata;
  content: string;
} {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach(line => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    const trimmedKey = key.trim() as keyof Metadata;

    // Handle language field specially
    if (trimmedKey === "lang" && (value === "en" || value === "zh")) {
      metadata[trimmedKey] = value as "en" | "zh";
    } else {
      (metadata as Record<string, string>)[trimmedKey] = value;
    }
  });

  if (metadata.publishDate) {
    metadata.publishDate = parseDate(metadata.publishDate);
  }

  return { metadata: metadata as Metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = fs
    .readdirSync(dir)
    .filter(file => file.endsWith(".mdx"));

  return mdxFiles.map(file => {
    const rawContent = fs.readFileSync(path.join(dir, file), "utf-8");
    const { metadata, content } = parseFrontMatter(rawContent);
    const fullFileName = path.basename(file, path.extname(file));

    // Check if filename contains language suffix (.en or .zh)
    const langMatch = fullFileName.match(/^(.+)\.(en|zh)$/);
    const slug = langMatch ? langMatch[1] : fullFileName;
    const fileLang = langMatch ? (langMatch[2] as Language) : null;
    const lang = fileLang || metadata.lang || "en";

    return {
      metadata: { ...metadata, lang },
      content,
      slug,
      fullFileName,
      filePath: path.join(dir, file),
    };
  });
}

export function getBlogPosts(lang?: Language) {
  const allPosts = getMDXData(path.join(process.cwd(), "data/blog"));

  if (!lang) return allPosts;

  // Filter posts by language, but include fallbacks
  const postsInLang = allPosts.filter(
    post => post.metadata.lang === lang,
  );
  const uniqueSlugs = new Set(postsInLang.map(p => p.slug));

  // Add posts that don't have a version in the requested language
  const fallbackPosts = allPosts.filter(
    post =>
      !uniqueSlugs.has(post.slug) && post.metadata.lang !== lang,
  );

  return [...postsInLang, ...fallbackPosts];
}

export function getBlogPost(slug: string, lang: Language = "en") {
  const allPosts = getMDXData(path.join(process.cwd(), "data/blog"));

  // First try to find post in requested language
  let post = allPosts.find(
    p => p.slug === slug && p.metadata.lang === lang,
  );

  // If not found, fallback to any language
  if (!post) {
    post = allPosts.find(p => p.slug === slug);
  }

  return post;
}

export function getAvailableLanguages(slug: string): Language[] {
  const allPosts = getMDXData(path.join(process.cwd(), "data/blog"));
  const postsForSlug = allPosts.filter(p => p.slug === slug);
  return postsForSlug.map(p => p.metadata.lang as Language);
}
