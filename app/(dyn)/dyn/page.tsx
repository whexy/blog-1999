import type { ExtendedRecordMap } from "notion-types";
import NotionRenderer from "@/components/UI/Dyn/NotionClientRenderer";
import { getPage, rootPageId } from "@/lib/notion";

export const revalidate = 600;

/**
 * Retrieves a Notion page (server-side) and renders it client-side.
 * If Notion is unreachable, renders a fallback instead of failing
 * the build or the request; ISR retries after `revalidate`.
 */
export default async function Page() {
  let recordMap: ExtendedRecordMap;
  try {
    recordMap = await getPage(rootPageId);
  } catch (error) {
    console.error("Failed to fetch Notion root page:", error);
    return (
      <p className="font-title px-4 py-16 text-center text-neutral-600">
        This page is temporarily unavailable. Please try again later.
      </p>
    );
  }

  return (
    <NotionRenderer
      darkMode={false}
      fullPage={true}
      recordMap={recordMap}
    />
  );
}
