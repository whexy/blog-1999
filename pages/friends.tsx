import Image from "next/image";
import friends from "@/data/friends";
import GithubRepo from "@/components/GithubRepo";

// tiny
import PageTitle from "@/components/tiny/PageTitle";
import Main from "@/components/Main";

const FriendPage = () => {
  return (
    <Main>
      <PageTitle title="My Friends" emoji="🧑‍🤝‍🧑" />
      <div className="mx-3 grid grid-cols-1 gap-3 pb-5 sm:grid-cols-2 lg:grid-cols-3">
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
      <h2 className="py-2 font-title text-2xl">Blog Collections</h2>
      <div className="space-y-2 py-5 sm:flex sm:space-y-0 sm:space-x-2">
        <div className="sm:w-1/2">
          <GithubRepo repo="timqian/chinese-independent-blogs" />
        </div>
        <div className="sm:w-1/2">
          <GithubRepo repo="tuna/blogroll" />
        </div>
      </div>
    </Main>
  );
};

export default FriendPage;
