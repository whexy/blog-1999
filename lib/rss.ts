// tiny library for rss feed parsing

import Parser from "rss-parser";

export const getFeeds = async (feedUrl: string) => {
  // use Next.js extended fetch() to get XML
  const xml = await (
    await fetch(feedUrl, { next: { revalidate: 600 } })
  ).text();

  const parser = new Parser();
  const feed = await parser.parseString(xml);

  // return first 5 feed (sorted by pubDate)
  feed.items = feed.items.sort((a, b) => {
    return (
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
  });

  return feed.items.slice(0, 2);
};
