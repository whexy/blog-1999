import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";
import NotionRenderer from "@/components/UI/Dyn/NotionClientRenderer";
import { getSitePage } from "@/lib/notion";
import metadata from "@/data/metadata";

export const revalidate = 600;

interface PageProps {
  params: Promise<{ pageId: string }>;
}

/**
 * Loads a page from the site's Notion workspace, or `undefined`
 * when the id is invalid, the page is foreign, or Notion fails.
 */
async function loadPage(
  pageId: string,
): Promise<ExtendedRecordMap | undefined> {
  try {
    return await getSitePage(pageId);
  } catch (error) {
    console.error(`Failed to fetch Notion page ${pageId}:`, error);
    return undefined;
  }
}

export default async function Page({ params }: PageProps) {
  const { pageId } = await params;
  const recordMap = await loadPage(pageId);
  if (!recordMap) notFound();

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
}: PageProps): Promise<Metadata> {
  const { pageId } = await params;
  const recordMap = await loadPage(pageId);
  if (!recordMap) notFound();

  const title = getPageTitle(recordMap);

  return {
    title: title,
    openGraph: {
      type: "article",
      title: title,
      authors: [metadata.author.name],
    },
    twitter: {
      card: "summary",
      site: metadata.author.twitter,
    },
  };
}
