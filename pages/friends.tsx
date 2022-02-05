import Image from "next/image";
import friends from "@/data/friends";
import Main from "@/components/Main";

const FriendPage = () => {
  return (
    <Main>
      <div className="mx-3 grid grid-cols-1 gap-3 py-10 sm:grid-cols-2">
        {friends
          .sort((f1, f2) => f1.name.localeCompare(f2.name))
          .map(friend => (
            <div
              key={friend.name}
              className="secondbg group relative flex flex-row items-center justify-center gap-5 rounded-lg py-8"
            >
              <div className="absolute right-4 top-4 h-1 w-1 bg-{{friend.status}}-600 dark:bg-{{friend.status}}-300 rounded-full"></div>
              <div className="ml-8 h-16 w-16 overflow-hidden rounded-full border-2 border-gray-700 transition-all group-hover:scale-105 dark:border dark:border-white/10">
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
                    {friend.display_url}
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
