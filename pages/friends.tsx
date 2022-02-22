import Image from "next/image";
import friends from "@/data/friends";
import GithubRepo from "@/components/GithubRepo";

const FriendPage = () => {
  return (
    <div className="bg-white text-black-readable dark:bg-black-readable dark:text-white-readable">
      <div className="mx-auto max-w-6xl">
        <h2 className="pt-10 pb-2 text-center text-xl font-light">
          My Friends
        </h2>
        <div className="mx-3 grid grid-cols-1 gap-3 py-5 sm:grid-cols-2 lg:grid-cols-3">
          {friends
            .sort((f1, f2) => f1.name.localeCompare(f2.name))
            .map(friend => (
              <div
                key={friend.name}
                className="secondbg group relative flex flex-row items-center justify-center gap-5 rounded-lg py-8"
              >
                <div className="ml-8 h-16 w-16 overflow-hidden rounded-full transition-all group-hover:scale-105 ">
                  <Image
                    src={friend.icon}
                    alt={friend.name}
                    className=""
                    width={64}
                    height={64}
                    placeholder="blur"
                    blurDataURL="/img/smile.svg"
                  />
                </div>
                <div className="grow">
                  <p className="font-mono text-xl">{friend.name}</p>
                  <p className="w-full truncate text-sm text-jbgray-light transition-all group-hover:text-blue-600 dark:group-hover:text-blue-300">
                    <a
                      href={friend.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {friend.url.split("/")[2]}
                    </a>
                  </p>
                  <p className="pt-2 text-sm text-jbgray-light">
                    {friend.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <h2 className="py-2 text-center text-xl font-light">
          Blog Collections
        </h2>
        <div className="space-y-2 py-5">
          <GithubRepo repo="timqian/chinese-independent-blogs" />
          <GithubRepo repo="tuna/blogroll" />
        </div>
      </div>
    </div>
  );
};

export default FriendPage;
