import Image from "next/image";
import friends from "../../data/friends";

// tiny
import PageTitle from "@/components/tiny/PageTitle";
import Main from "@/components/Main";

const FriendPage = () => {
  return (
    <Main>
      <PageTitle title="My Friends" emoji="🧑‍🤝‍🧑" />
      <div className="mx-3 grid grid-cols-1 gap-3 pb-5 sm:grid-cols-2">
        {friends
          .sort((f1, f2) => f1.name.localeCompare(f2.name))
          .map(friend => (
            <div
              key={friend.name}
              className="primary group relative flex flex-row items-center justify-center gap-5 rounded-lg py-8"
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
    </Main>
  );
};

export default FriendPage;
