import Parser from "rss-parser";

const fetchXML = async feedUrl => {
  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 600 },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Fetching XML failed:", error);
    throw error; // Re-throw to handle it in the upper scope
  }
};

const parseXML = async xml => {
  try {
    const parser = new Parser();
    return await parser.parseString(xml);
  } catch (error) {
    console.error("Parsing XML failed:", error);
    throw error; // Re-throw to handle it in the upper scope
  }
};

export const getFeeds = async feedUrl => {
  if (typeof feedUrl !== "string" || !feedUrl.trim()) {
    throw new Error("Invalid URL provided");
  }

  try {
    const xml = await fetchXML(feedUrl);
    const feed = await parseXML(xml);

    if (!feed.items) {
      throw new Error("Invalid feed structure");
    }

    return feed.items.sort((a, b) => {
      return (
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );
    });
  } catch (error) {
    // Handle errors from fetching and parsing
    console.error("An error occurred in getFeeds:", feedUrl, error);
    return []; // Return an empty array or handle accordingly
  }
};
