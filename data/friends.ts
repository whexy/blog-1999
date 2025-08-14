import { getUserData } from "@/lib/github";
import {
  getFeeds,
  RSSNetworkError,
  RSSParseError,
  RSSValidationError,
} from "@/lib/rss";

export interface Friend {
  /** URL for avatar on Github */
  github: string;
  /** URL of blog website */
  url: string;
  feed?: string;
}

export interface FriendInfo {
  name: string;
  description: string;
  icon: string;
  url: string;
  active: boolean;
  recentPosts?: FeedItem[];
}

interface FeedItem {
  title: string;
  pubDate: Date;
  link: string;
}

export const friends: Friend[] = [
  {
    github: "cla7aye15I4nd",
    url: "dataisland.org",
  },
  {
    github: "Eveneko",
    url: "eveneko.com",
    feed: "https://eveneko.com/index.xml",
  },
  {
    github: "Gogomoe",
    url: "blog.gogo.moe",
  },
  {
    github: "MstMoonshine",
    url: "mstmoonshine.github.io",
    feed: "https://mstmoonshine.github.io/index.xml",
  },
  {
    github: "macromogic",
    url: "macromogic.xyz",
    feed: "https://macromogic.xyz/atom.xml",
  },
  {
    github: "Tonny-Gu",
    url: "nekodaemon.com",
    feed: "https://nekodaemon.com/atom.xml",
  },
  {
    github: "WHALEEYE",
    url: "www.whale3ye.com",
  },
  {
    github: "whexy",
    url: "whexy.com",
    feed: "https://www.whexy.com/feed.xml",
  },
];

export const GetFriendInfo = async () => {
  const friendInfo: FriendInfo[] = [];

  for (const friend of friends) {
    try {
      const friend_gh = await getUserData(friend.github);
      if (!friend_gh) {
        console.warn(
          `No GitHub data found for user: ${friend.github}, using fallback data`,
        );

        // Fallback: create basic friend info without GitHub data
        const fallbackFriend: FriendInfo = {
          name: friend.github, // Use GitHub username as fallback name
          description: `Visit ${friend.url}`, // Basic description
          icon: "/img/smile.svg", // Default icon
          url: friend.url,
          active: false,
          recentPosts: [],
        };

        // Still try to fetch RSS feeds even without GitHub data
        if (friend.feed) {
          try {
            const feeds = await getFeeds(friend.feed, {
              timeout: 8000,
              retries: 2,
              retryDelay: 500,
            });

            if (feeds && feeds.length > 0) {
              const recentPosts: FeedItem[] = [];
              let active = false;

              feeds.slice(0, 3).forEach(feed => {
                if (!feed.title || !feed.pubDate || !feed.link)
                  return;

                try {
                  const feedItem: FeedItem = {
                    title: feed.title,
                    pubDate: new Date(feed.pubDate),
                    link: feed.link,
                  };

                  if (isNaN(feedItem.pubDate.getTime())) {
                    console.warn(
                      `Invalid date for friend ${friend.github}: ${feed.pubDate}`,
                    );
                    return;
                  }

                  recentPosts.push(feedItem);

                  const now = new Date();
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(now.getDate() - 30);
                  if (feedItem.pubDate > thirtyDaysAgo) {
                    active = true;
                  }
                } catch (dateError) {
                  console.warn(
                    `Error processing feed item for ${friend.github}:`,
                    dateError,
                  );
                }
              });

              fallbackFriend.recentPosts = recentPosts;
              fallbackFriend.active = active;
            }
          } catch (error) {
            console.warn(
              `Error fetching RSS for fallback friend ${friend.github}:`,
              error,
            );
          }
        }

        friendInfo.push(fallbackFriend);
        continue;
      }

      // if GitHub return both name and `login`, and name contains space, use `login` instead
      if (friend_gh.name && friend_gh.login) {
        if (friend_gh.name.includes(" ")) {
          friend_gh.name = friend_gh.login;
        }
      }

      const recentPosts: FeedItem[] = [];
      let active = false;

      // fetch recent posts if feed is provided
      if (friend.feed) {
        try {
          const feeds = await getFeeds(friend.feed, {
            timeout: 8000,
            retries: 2,
            retryDelay: 500,
          });

          if (feeds && feeds.length > 0) {
            feeds.slice(0, 3).forEach(feed => {
              // if feed does not contain `title` or `pubDate` or `link`, skip
              if (!feed.title || !feed.pubDate || !feed.link) return;

              try {
                const feedItem: FeedItem = {
                  title: feed.title,
                  pubDate: new Date(feed.pubDate),
                  link: feed.link,
                };

                // Validate date is not invalid
                if (isNaN(feedItem.pubDate.getTime())) {
                  console.warn(
                    `Invalid date for friend ${friend.github}: ${feed.pubDate}`,
                  );
                  return;
                }

                recentPosts.push(feedItem);

                // if pubDate is in recent 30 days, mark friend as active
                const now = new Date();
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(now.getDate() - 30);
                if (feedItem.pubDate > thirtyDaysAgo) {
                  active = true;
                }
              } catch (dateError) {
                console.warn(
                  `Error processing feed item for ${friend.github}:`,
                  dateError,
                );
              }
            });
          }
        } catch (error) {
          // Log the error but don't fail the entire friend loading process
          if (error instanceof RSSNetworkError) {
            console.warn(
              `Network error fetching RSS for ${friend.github} (${friend.feed}): ${error.message}`,
            );
          } else if (error instanceof RSSParseError) {
            console.warn(
              `Parse error for RSS feed ${friend.github} (${friend.feed}): ${error.message}`,
            );
          } else if (error instanceof RSSValidationError) {
            console.warn(
              `Validation error for RSS feed ${friend.github} (${friend.feed}): ${error.message}`,
            );
          } else {
            console.warn(
              `Unexpected error fetching RSS for ${friend.github} (${friend.feed}):`,
              error,
            );
          }
          // Continue processing this friend without RSS data
        }
      }

      friendInfo.push({
        name: friend_gh.name || friend_gh.login,
        description: friend_gh.bio || "",
        icon: friend_gh.avatar_url,
        url: friend.url,
        recentPosts: recentPosts,
        active: active,
      });
    } catch (error) {
      console.error(
        `Error processing friend ${friend.github}:`,
        error,
      );
      // Continue processing other friends even if one fails
    }
  }

  return friendInfo;
};
