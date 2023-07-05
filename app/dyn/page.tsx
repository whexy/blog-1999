import { NotionAPI } from "notion-client";
import NotionRenderer from "@/components/UI/Dyn/NotionClientRenderer";

const notion = new NotionAPI();
const DynamicBlogPageId = "c7308a295d2b4a08929d8f6da207260c";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Retrieves a Notion page (server-side) and renders it client-side.
 * @returns A React component that renders the retrieved Notion page.
 */
export default async function Page() {
  const recordMap = await notion.getPage(DynamicBlogPageId);
  return (
    <NotionRenderer
      darkMode={false}
      fullPage={true}
      recordMap={recordMap}
    />
  );
}
