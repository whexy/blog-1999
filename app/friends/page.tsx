import PageTitle from "@/components/UI/Website/PageTitle";
import Comment from "@/components/UI/Blog/Comment";
import { getUserData } from "@/lib/github";
import { Metadata } from "next";
import friends from "@/data/friends";
import { getFeeds } from "@/lib/rss";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "My Friends",
  description: "Friends of whexy.",
};

interface FriendInfo {
  name: string;
  description: string;
  icon: string;
  url: string;
  recentUpdate: boolean;
}

interface RecentUpdateItem {
  title: string;
  pubDate: string;
  link: string;
  friend: FriendInfo;
}

const getFriendInfoList = async () => {
  const f_list: FriendInfo[] = [];
  for (const friend of friends) {
    if (!friend.github) continue;
    const github_info = await getUserData(friend.github);
    if (!github_info) continue;

    // if github_info contains both name and login, use the one without space.
    if (github_info.name && github_info.login) {
      if (github_info.name.includes(" ")) {
        github_info.name = github_info.login;
      }
    }

    if (github_info.blog) {
      github_info.blog = github_info.blog.replace(
        /^(https?:\/\/)/,
        "",
      );
    }

    const { name, login, bio, avatar_url, blog } = github_info;
    f_list.push({
      name: name || login,
      description: bio || "",
      icon: avatar_url,
      url: blog || friend.url,
      recentUpdate: false,
    });
  }
  return f_list;
};

const getRecentUpdate = async (f_list: FriendInfo[]) => {
  const recentUpdates: RecentUpdateItem[] = [];
  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    if (!friend.feed) continue;
    const feeds = await getFeeds(friend.feed);
    if (feeds.length > 0) {
      feeds.forEach(feed => {
        // if the feed contains a post published within 30 days, mark it as recentUpdate.
        const pubDate = new Date(feed.pubDate);
        const now = new Date();
        const diff = now.getTime() - pubDate.getTime();
        const diffDays = Math.floor(diff / (1000 * 3600 * 24));
        if (diffDays <= 30) {
          f_list[i].recentUpdate = true;
        }
        recentUpdates.push({
          title: feed.title ?? "<No Title>",
          pubDate: feed.pubDate,
          link: feed.link,
          friend: f_list[i],
        });
      });
    }
  }
  return recentUpdates.sort((a, b) => {
    return (
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
  });
};

const FriendTimeLine = ({
  recentUpdates,
}: {
  recentUpdates: RecentUpdateItem[];
}) => {
  return (
    <div className="mt-5 rounded-lg bg-white p-4">
      <h2 className="px-2 pb-4 font-title text-2xl font-bold">
        Recent Updates
      </h2>
      {recentUpdates.map(({ title, pubDate, link, friend }) => (
        <Link href={link} key={title}>
          <div className="flex items-center px-1 py-2 transition-all hover:bg-gray-50">
            <Image
              src={friend.icon}
              alt={friend.name}
              width={32}
              height={32}
              className="mr-2 flex-shrink-0 overflow-hidden rounded-full"
            />
            <div className="min-w-0 flex-grow">
              <p>
                <span className="font-bold">{friend.name}</span>
              </p>
              <p className="truncate text-sm sm:text-base">{title}</p>
            </div>
            <p className="flex-shrink-0 font-mono text-xs text-gray-500 sm:text-sm">
              {new Date(pubDate).toISOString().slice(0, 10)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const FriendPage = async () => {
  const f_list = await getFriendInfoList();
  const recentUpdates = await getRecentUpdate(f_list);

  return (
    <div>
      <PageTitle title="My Friends" emoji="🧑‍🤝‍🧑" />
      <div className="rounded-lg bg-white pt-4">
        <div className="no-scrollbar grid auto-cols-auto grid-flow-col overflow-x-auto">
          {f_list
            .sort((f1, f2) => {
              if (f1.recentUpdate && !f2.recentUpdate) {
                return -1;
              } else if (!f1.recentUpdate && f2.recentUpdate) {
                return 1;
              } else {
                return f1.name.localeCompare(f2.name);
              }
            })
            .map(friend => (
              <div
                className="mx-3 flex flex-col items-center"
                key={friend.name}>
                <Link
                  href={"https://" + friend.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`mb-2 grid h-20 w-20 flex-shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-tr ${
                    friend.recentUpdate
                      ? "from-yellow-400 to-fuchsia-600"
                      : "from-gray-200 to-gray-400"
                  }`}>
                  <Image
                    src={friend.icon}
                    alt={friend.name}
                    width={74}
                    height={74}
                    className="overflow-hidden rounded-full bg-white p-1"
                    placeholder="blur"
                    blurDataURL="/img/smile.svg"
                  />
                </Link>
                <p className="mb-4 whitespace-nowrap text-xs text-black/80">
                  {friend.name}
                </p>
              </div>
            ))}
        </div>
      </div>

      <FriendTimeLine recentUpdates={recentUpdates} />
      <div className="mt-10 rounded-t-lg bg-white p-4">
        <h2 className="px-2 pb-4 font-title text-2xl font-bold">
          Guest Book
        </h2>
        <Comment slug={"friends"} />
      </div>
    </div>
  );
};

export default FriendPage;
