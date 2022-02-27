import Head from "next/head";

// intra-blog components
import Seo from "@/components/Seo";
import Prose from "@/components/Prose";
import metadata from "@/data/metadata";

import type { PropsWithChildren } from "react";
import type { Snippet } from "contentlayer/generated";

export default function BlogLayout({
  children,
  snippet,
}: PropsWithChildren<{ snippet: Snippet }>) {
  return (
    <div>
      <Seo
        title={snippet.title}
        path={`/posts/${snippet.slug}`}
        description={snippet.description}
        image={""}
      />
      <Head>
        <title>
          {snippet.title} | {metadata.title}
        </title>
        <meta name="description" content={snippet.description} />
      </Head>
      <div className="bg-white dark:bg-black-readable">
        <article className="min-h-[70vh] py-5 font-article sm:py-12">
          <Prose>
            <div className="flex prose-headings:m-0 prose-p:p-0 md:prose-headings:m-0 md:prose-p:p-0">
              <div className="flex flex-col">
                <h2>{snippet.title}</h2>
                <p className="font-sans font-light">
                  {snippet.description}
                </p>
              </div>
            </div>
            {children}
          </Prose>
        </article>
        {/* <div className="pb-10">
          <Comment slug={post.slug} />
        </div> */}
      </div>
    </div>
  );
}
