import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";

// rehype and remark plugins
import rehypePrism from "@mapbox/rehype-prism";
import rehypeImagePlaceholder from "rehype-image-placeholder";
import remarkUnwrapImages from "remark-unwrap-images";

// post data plugins
import fs from "fs";
import readingTime from "reading-time";

const computedFields: ComputedFields = {
  readingTime: { type: "json", resolve: (doc)=> readingTime(doc.body.raw) },
  createdDate: { type: "date", resolve: (doc)=> fs.statSync(`data/${doc._raw.sourceFilePath}`).mtime },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
};

const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/*.mdx`,
  bodyType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    image: { type: "string", required: false },
    preview: { type: "boolean", required: false },
  },
  computedFields,
}));

const contentLayerConfig = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog],
  mdx: {
    rehypePlugins: [[rehypeImagePlaceholder, { dir: "public" }], rehypePrism],
    remarkPlugins: [remarkUnwrapImages],
  },
});

export default contentLayerConfig;
