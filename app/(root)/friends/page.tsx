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
  // Safety check for f_list
  if (!f_list || !Array.isArray(f_list)) {
    return (
      <div className="mt-5 rounded-lg bg-white p-4">
        <h2 className="px-2 pb-4 font-title text-2xl font-bold">
          Recent Updates
        </h2>
        <p className="py-8 text-center text-gray-500">
          Unable to load friend updates at this time.
        </p>
      </div>
    );
  }

  const recentPosts = f_list
    .filter(friend => friend && typeof friend === "object") // Filter out invalid friends
    .flatMap(friend => {
      // Safety checks for friend object and recentPosts
      if (!friend.recentPosts || !Array.isArray(friend.recentPosts)) {
        return [];
      }

      return friend.recentPosts
        .filter(post => {
          // Validate post object has required properties
          return (
            post &&
            typeof post === "object" &&
            post.title &&
            post.link &&
            post.pubDate instanceof Date &&
            !isNaN(post.pubDate.getTime())
          );
        })
        .map(post => ({
          title: post.title,
          pubDate: post.pubDate,
          link: post.link,
          friendName: friend.name || "Unknown Friend",
          friendIcon: friend.icon || "/img/smile.svg", // Fallback icon
        }));
    })
    .sort((a, b) => {
      // Safe date comparison
      try {
        return b.pubDate.getTime() - a.pubDate.getTime();
      } catch (error) {
        console.warn("Error sorting posts by date:", error);
        return 0;
      }
    });

  return (
    <div className="mt-5 rounded-lg bg-white p-4">
      <h2 className="px-2 pb-4 font-title text-2xl font-bold">
        Recent Updates
      </h2>

      {recentPosts.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          No recent updates from friends.
        </p>
      ) : (
        recentPosts.map(
          ({ title, pubDate, link, friendName, friendIcon }, i) => (
            <Link
              href={link}
              key={`${friendName}-${i}`}
              target="_blank"
              rel="noopener noreferrer">
              <div className="flex items-center px-1 py-2 transition-all hover:bg-gray-50">
                <Image
                  src={friendIcon}
                  alt={friendName}
                  width={32}
                  height={32}
                  className="mr-2 flex-shrink-0 overflow-hidden rounded-full"
                />
                <div className="min-w-0 flex-grow">
                  <p>
                    <span className="font-bold">{friendName}</span>
                  </p>
                  <p className="truncate text-sm sm:text-base">
                    {title}
                  </p>
                </div>
                <p className="flex-shrink-0 font-mono text-xs text-gray-500 sm:text-sm">
                  {(() => {
                    try {
                      return pubDate.toISOString().slice(0, 10);
                    } catch (error) {
                      console.warn("Error formatting date:", error);
                      return "Unknown";
                    }
                  })()}
                </p>
              </div>
            </Link>
          ),
        )
      )}
    </div>
  );
};

const FriendPage = async () => {
  let f_list: FriendInfo[] = [];

  try {
    f_list = await GetFriendInfo();
  } catch (error) {
    console.error("Error loading friend information:", error);
    // Continue with empty array - components will handle the empty state
  }

  // Safety check for f_list
  const safeFriendsList = Array.isArray(f_list) ? f_list : [];

  return (
    <div>
      <PageTitle title="My Friends" emoji="🤜" />
      <div className="rounded-lg bg-white pt-4">
        <div className="no-scrollbar grid auto-cols-auto grid-flow-col overflow-x-auto">
          {safeFriendsList.length === 0 ? (
            <div className="mx-3 py-8 text-center text-gray-500">
              <p>Unable to load friends at this time.</p>
              <p className="text-sm">
                Please try refreshing the page.
              </p>
            </div>
          ) : (
            safeFriendsList
              .filter(
                friend =>
                  friend && typeof friend === "object" && friend.name,
              ) // Filter invalid friends
              .sort((f1, f2) => {
                try {
                  if (f1.active && !f2.active) {
                    return -1;
                  } else if (!f1.active && f2.active) {
                    return 1;
                  } else {
                    return (f1.name || "").localeCompare(
                      f2.name || "",
                    );
                  }
                } catch (error) {
                  console.warn("Error sorting friends:", error);
                  return 0;
                }
              })
              .map(friend => (
                <div
                  className="mx-3 flex flex-col items-center"
                  key={friend.name || Math.random().toString()}>
                  <Link
                    href={friend.url ? `https://${friend.url}` : "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={`mb-2 grid h-20 w-20 flex-shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-tr ${
                      friend.active
                        ? "from-yellow-400 to-fuchsia-600"
                        : "from-gray-200 to-gray-400"
                    }`}>
                    <Image
                      src={friend.icon || "/img/smile.svg"}
                      alt={friend.name || "Friend"}
                      width={74}
                      height={74}
                      className="overflow-hidden rounded-full bg-white p-1"
                      placeholder="blur"
                      blurDataURL="/img/smile.svg"
                    />
                  </Link>
                  <p className="mb-4 whitespace-nowrap text-xs text-black/80">
                    {friend.name || "Unknown"}
                  </p>
                </div>
              ))
          )}
        </div>
      </div>

      <FriendTimeLine f_list={safeFriendsList} />
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
