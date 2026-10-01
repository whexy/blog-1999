import { cache } from "react";
import { NotionAPI } from "notion-client";
import type { ExtendedRecordMap } from "notion-types";
import { getBlockValue, parsePageId } from "notion-utils";

// Notion blocks requests with the default Node.js User-Agent
// (returns 403 Forbidden), so we send a browser UA instead.
export const notion = new NotionAPI({
  ofetchOptions: {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  },
});

/** Root page of the `/dyn` section. */
export const rootPageId = "c7308a295d2b4a08929d8f6da207260c";

/**
 * Fetches a Notion page, deduplicated per request so that
 * `generateMetadata` and the page component share one fetch
 * (notion-client uses ofetch, which Next.js does not dedupe).
 */
export const getPage = cache(
  (pageId: string): Promise<ExtendedRecordMap> =>
    notion.getPage(pageId),
);

const getSpaceId = (
  recordMap: ExtendedRecordMap,
  pageId: string,
): string | undefined =>
  getBlockValue(recordMap.block[pageId])?.space_id;

/**
 * Fetches a page only if it belongs to the site's Notion
 * workspace (same `space_id` as the root page). Returns
 * `undefined` for malformed ids and for foreign pages, so
 * arbitrary public Notion pages cannot be rendered under this
 * domain. Network/API errors are thrown to the caller.
 */
export const getSitePage = cache(
  async (
    rawPageId: string,
  ): Promise<ExtendedRecordMap | undefined> => {
    const pageId = parsePageId(rawPageId);
    if (!pageId) return undefined;

    const [recordMap, rootRecordMap] = await Promise.all([
      getPage(pageId),
      getPage(rootPageId),
    ]);

    const spaceId = getSpaceId(recordMap, pageId);
    const rootSpaceId = getSpaceId(
      rootRecordMap,
      parsePageId(rootPageId),
    );
    if (!spaceId || !rootSpaceId || spaceId !== rootSpaceId) {
      return undefined;
    }
    return recordMap;
  },
);
