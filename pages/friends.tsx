import Image from "next/image";
import friends from "@/data/friends";
import Main from "@/components/Main";

const FriendPage = () => {
  return (
    <Main>
      <div className="py-10 mx-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {friends
          .sort((f1, f2) => f1.name.localeCompare(f2.name))
          .map((friend) => (
            <div
              key={friend.name}
              className="flex flex-row gap-5 justify-center secondbg items-center py-8 rounded-lg border dark:border border-gray-700 dark:border-white/10 group relative"
            >
              <div className="absolute right-4 top-4 h-1 w-1 bg-{{friend.status}}-600 dark:bg-{{friend.status}}-300 rounded-full"></div>
              <div className="transition-all w-16 h-16 ml-8 border-2 dark:border border-gray-700 dark:border-white/10 rounded-full group-hover:scale-105 overflow-hidden">
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
                <p className="text-xl font-mono">{friend.name}</p>
                <p className="w-full text-jbgray-light truncate text-sm transition-all group-hover:text-blue-600 dark:group-hover:text-blue-300">
                  <a href={friend.url} target="_blank" rel="noreferrer">
                    {friend.display_url}
                  </a>
                </p>
                <p className="pt-2 text-jbgray-light text-sm">
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
