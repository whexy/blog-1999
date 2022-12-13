import { NotionAPI } from "notion-client";
import NotionRenderer from "@/components/NotionClientRenderer";

const notion = new NotionAPI();
export default async function Page({ params }) {
  const recordMap = await notion.getPage(params.pageId);
  return (
    <NotionRenderer
      darkMode={false}
      fullPage={true}
      recordMap={recordMap}
    />
  );
}
