import FriendCard from "@/components/UI/Homepage/FriendCard";
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
    <div className="mt-10 rounded-lg bg-white p-4">
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
      <div className="mx-3 grid grid-cols-1 grid-rows-[masonry] gap-8 pb-5 sm:auto-rows-fr sm:grid-cols-2">
        {f_list
          .sort((f1, f2) => f1.name.localeCompare(f2.name))
          .map(friend => (
            <FriendCard key={friend.name} friend={friend} />
          ))}
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
