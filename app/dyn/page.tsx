import { NotionAPI } from "notion-client";
import NotionRenderer from "@/components/NotionClientRenderer";

const notion = new NotionAPI();

export default async function Page() {
  const recordMap = await notion.getPage(
    "c7308a295d2b4a08929d8f6da207260c",
  );
  return (
    <NotionRenderer
      darkMode={false}
      fullPage={true}
      recordMap={recordMap}
    />
  );
}
