import { NotionAPI } from "notion-client";
import NotionRenderer from "@/components/UI/Dyn/NotionClientRenderer";

const notion = new NotionAPI();

export const dynamic = "force-dynamic",
  revalidate = 0;

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
