import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";

// rehype and remark plugins
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeImagePlaceholder from "rehype-image-placeholder";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkMath from "remark-math";
import pangu from "remark-pangu";

// post data plugins
import readingTime from "reading-time";
import { getChineseCharNum } from "./lib/chinese";

const computedFields: ComputedFields = {
  readingTime: {
    type: "json",
    resolve: doc => readingTime(doc.body.raw),
  },
  slug: {
    type: "string",
    resolve: doc => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
  chineseCharNum: {
    type: "number",
    resolve: doc => getChineseCharNum(doc.body.raw),
  },
};

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishDate: { type: "date", required: true },
    summary: { type: "string", required: true },
    image: { type: "string", required: false },
    preview: { type: "boolean", required: false },
    series: { type: "string", required: false },
    cat: { type: "string", required: false },
    featured: { type: "boolean", required: false },
  },
  computedFields,
}));

const About = defineDocumentType(() => ({
  name: "About",
  filePathPattern: `about.mdx`,
  contentType: "mdx",
  fields: {},
}));

const Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: "snippets/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
  },
  computedFields,
}));

const contentLayerConfig = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog, About, Snippet],
  mdx: {
    rehypePlugins: [
      [rehypeImagePlaceholder, { dir: "public" }],
      rehypeCodeTitles,
      rehypePrism,
      rehypeKatex,
    ],
    remarkPlugins: [remarkGfm, remarkMath, remarkUnwrapImages, pangu],
  },
});

export default contentLayerConfig;
