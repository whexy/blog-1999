import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirecotry = path.join(process.cwd(), "posts");

function getPostsData() {
  const fileNames = fs.readdirSync(postsDirecotry);
  return fileNames.map((name) => {
    // remove .md or .mdx from file name
    const id = name.replace(/\.md.?$/, "");

    // read file to string
    const fullPath = path.join(postsDirecotry, name);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // parse the metadata
    const matterResult = matter(fileContents);

    // get excerpt
    const excerpt = extractExcerpt(matterResult.content);

    return {
      id,
      excerpt,
      ...matterResult.data,
    };
  });
}

export function getSortedPostsData() {
  const allPostsData = getPostsData();
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });
}

function extractExcerpt(content) {
  const excerptMaximumLength = 100;
  const excerptSeparator = "<!-- more -->";
  if (content.includes(excerptSeparator)) {
    let excerptLength = content.indexOf(excerptSeparator);
    return content.substring(0, content.indexOf(excerptSeparator)).trim();
  } else if (content.length <= excerptMaximumLength) {
    return content.trim();
  }
  return content.substring(0, excerptMaximumLength).trim() + "...";
}
