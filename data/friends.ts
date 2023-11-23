import { getUserData } from "@/lib/github";
import { getFeeds } from "@/lib/rss";

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
    feed: "https://rsshub.mudd.cc/whexy/friends/dataisland",
  },
  {
    github: "Eveneko",
    url: "eveneko.com",
    feed: "https://eveneko.com/index.xml",
  },
  {
    github: "Gogomoe",
    url: "blog.gogo.moe",
    feed: "https://rsshub.mudd.cc/whexy/friends/gogo",
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
    const friend_gh = await getUserData(friend.github);
    if (!friend_gh) continue;

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
      const feeds = await getFeeds(friend.feed);
      if (feeds && feeds.length > 0) {
        feeds.slice(0, 3).forEach(feed => {
          // if feed does not contain `title` or `pubDate` or `link`, skip
          if (!feed.title || !feed.pubDate || !feed.link) return;
          const feedItem: FeedItem = {
            title: feed.title,
            pubDate: new Date(feed.pubDate),
            link: feed.link,
          };
          recentPosts.push(feedItem);

          // if pubDate is in recent 30 days, mark friend as active
          const now = new Date();
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(now.getDate() - 30);
          if (feedItem.pubDate > thirtyDaysAgo) {
            active = true;
          }
        });
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
  }

  return friendInfo;
};
