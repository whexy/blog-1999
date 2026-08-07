import { NotionAPI } from "notion-client";

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
