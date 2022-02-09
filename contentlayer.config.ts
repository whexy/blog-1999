import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";

// rehype and remark plugins
import rehypePrism from "@mapbox/rehype-prism";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeImagePlaceholder from "rehype-image-placeholder";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkMath from "remark-math";
import pangu from "remark-pangu";

// post data plugins
import readingTime from "reading-time";

const computedFields: ComputedFields = {
  readingTime: {
    type: "json",
    resolve: doc => readingTime(doc.body.raw),
  },
  slug: {
    type: "string",
    resolve: doc => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
};

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/*.mdx`,
  bodyType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishDate: { type: "date", required: true },
    summary: { type: "string", required: true },
    image: { type: "string", required: false },
    preview: { type: "boolean", required: false },
    series: { type: "string", required: false },
  },
  computedFields,
}));

const About = defineDocumentType(() => ({
  name: "About",
  filePathPattern: `about.mdx`,
  bodyType: "mdx",
  fields: {},
}));

const contentLayerConfig = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog, About],
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
