import PageTitle from "@/components/UI/Website/PageTitle";
import Comment from "@/components/UI/Blog/Comment";
import { Metadata } from "next";
import { GetFriendInfo, FriendInfo } from "@/data/friends";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "My Friends",
  description: "Friends of whexy.",
};

const FriendTimeLine = async ({
  f_list,
}: {
  f_list: FriendInfo[];
}) => {
  return (
    <div className="mt-5 rounded-lg bg-white p-4">
      <h2 className="px-2 pb-4 font-title text-2xl font-bold">
        Recent Updates
      </h2>

      {f_list
        .flatMap(
          friend =>
            friend.recentPosts?.map(post => ({
              // Use flatMap to flatten the array of arrays
              title: post.title,
              pubDate: post.pubDate,
              link: post.link,
              friendName: friend.name,
              friendIcon: friend.icon,
            })) || [], // Handle the case where recentPosts is undefined
        )
        .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()) // Sort by pubDate
        .map(post => ({
          // Map to the desired structure
          title: post.title,
          pubDate: post.pubDate,
          link: post.link,
          friendInfo: {
            name: post.friendName,
            icon: post.friendIcon,
          },
        }))
        .map(({ title, pubDate, link, friendInfo }, i) => (
          <Link href={link} key={i}>
            <div className="flex items-center px-1 py-2 transition-all hover:bg-gray-50">
              <Image
                src={friendInfo.icon}
                alt={friendInfo.name}
                width={32}
                height={32}
                className="mr-2 flex-shrink-0 overflow-hidden rounded-full"
              />
              <div className="min-w-0 flex-grow">
                <p>
                  <span className="font-bold">{friendInfo.name}</span>
                </p>
                <p className="truncate text-sm sm:text-base">
                  {title}
                </p>
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
  const f_list = await GetFriendInfo();

  return (
    <div>
      <PageTitle title="My Friends" emoji="🤜" />
      <div className="rounded-lg bg-white pt-4">
        <div className="no-scrollbar grid auto-cols-auto grid-flow-col overflow-x-auto">
          {f_list
            .sort((f1, f2) => {
              if (f1.active && !f2.active) {
                return -1;
              } else if (!f1.active && f2.active) {
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
                    friend.active
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

      <FriendTimeLine f_list={f_list} />
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
