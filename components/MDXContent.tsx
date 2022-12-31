"use client";

import { MDXRemote } from "next-mdx-remote";
import MDXComponents from "./MDXComponents";

export default function MDXContent({ mdxSource }) {
  return <MDXRemote {...mdxSource} components={MDXComponents} />;
}
