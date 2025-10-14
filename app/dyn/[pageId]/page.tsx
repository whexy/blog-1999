import { NotionAPI } from "notion-client";
import NotionRenderer from "@/components/UI/Dyn/NotionClientRenderer";
import { getPageTitle } from "notion-utils";
import metadata from "@/data/metadata";
import { Metadata } from "next";

const notion = new NotionAPI();

export const dynamic = "auto";
export const revalidate = 600;

export default async function Page({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const recordMap = await notion.getPage(pageId);
  return (
    <NotionRenderer
      darkMode={false}
      fullPage={true}
      recordMap={recordMap}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pageId: string }>;
}): Promise<Metadata> {
  const { pageId } = await params;
  const recordMap = await notion.getPage(pageId);
  const title = getPageTitle(recordMap);

  return {
    title: title,
    // description: post.summary,
    openGraph: {
      type: "article",
      title: title,
      // description: post.summary,
      // publishedTime: post.publishDate,
      authors: [metadata.author.name],
    },
    twitter: {
      card: "summary",
      site: metadata.author.twitter,
      // description: post.summary,
    },
  };
}
