import components from "@/components/MDX/MDXComponents";
import metadata from "@/data/metadata";
import {
  getBlogPost,
  getBlogPosts,
  getAvailableLanguages,
} from "@/lib/blog";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import Link from "next/link";

// rehype and remark plugins
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkMath from "remark-math";
import pangu from "remark-pangu";

type Language = "en" | "zh";

interface PageProps {
  params: Promise<{ lang: Language; slug: string }>;
}

function LanguageSwitcher({
  slug,
  currentLang,
  availableLanguages,
}: {
  slug: string;
  currentLang: Language;
  availableLanguages: Language[];
}) {
  if (availableLanguages.length <= 1) return null;

  return (
    <div className="mb-6 flex gap-2">
      {availableLanguages.map(lang => (
        <Link
          key={lang}
          href={`/${lang}/posts/${slug}`}
          className={`rounded px-3 py-1 text-sm transition-colors ${
            currentLang === lang
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}>
          {lang === "en" ? "English" : "中文"}
        </Link>
      ))}
    </div>
  );
}

export default async function LanguagePost({ params }: PageProps) {
  const { lang, slug } = await params;
  const post = getBlogPost(slug, lang);
  const availableLanguages = getAvailableLanguages(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Compile and render MDX content
  const compiled = await compile(post.content, {
    outputFormat: "function-body",
    rehypePlugins: [
      rehypeCodeTitles,
      rehypePrism as unknown,
      rehypeKatex as unknown,
    ],
    remarkPlugins: [remarkGfm, remarkMath, remarkUnwrapImages, pangu],
  });

  const { default: MDXContent } = await run(compiled, runtime);

  return (
    <>
      <LanguageSwitcher
        slug={slug}
        currentLang={lang}
        availableLanguages={availableLanguages}
      />
      <MDXContent components={components} />
    </>
  );
}

export async function generateStaticParams() {
  const allPosts = getBlogPosts();
  const params: { lang: Language; slug: string }[] = [];

  // Generate params for all posts in both languages
  const uniqueSlugs = Array.from(new Set(allPosts.map(p => p.slug)));

  for (const slug of uniqueSlugs) {
    const availableLanguages = getAvailableLanguages(slug);
    for (const lang of availableLanguages) {
      params.push({ lang, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params;
  const post = getBlogPost(slug, lang);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    openGraph: {
      type: "article",
      title: post.metadata.title,
      description: post.metadata.summary,
      publishedTime: post.metadata.publishDate,
      authors: [metadata.author.name],
    },
    twitter: {
      card: "summary",
      site: metadata.author.twitter,
      description: post.metadata.summary,
    },
  };
}
