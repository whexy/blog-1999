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
};

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
    metadata[key.trim() as keyof Metadata] = value;
  });

  if (metadata.publishDate) {
    metadata.publishDate = parseDate(metadata.publishDate);
  }

  return { metadata: metadata as Metadata, content };
}

function getMDXData(dir) {
  const mdxFiles = fs
    .readdirSync(dir)
    .filter(file => file.endsWith(".mdx"));

  return mdxFiles.map(file => {
    const rawContent = fs.readFileSync(path.join(dir, file), "utf-8");
    const { metadata, content } = parseFrontMatter(rawContent);
    const slug = path.basename(file, path.extname(file));
    return {
      metadata,
      content,
      slug,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "data/blog"));
}
