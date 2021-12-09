import Image from "next/image";
import friends from "../data/friends";

const FriendPage = () => {
  return (
    <div className="bg-white-readable dark:bg-black-readable dark:nobgimg text-black-readable dark:text-white-readable">
      <div className="px-5 sm:px-0 mx-auto max-w-3xl bg-white-readable dark:bg-black-readable py-10">
        <h1 className="text-5xl font-semibold text-center z-10">Friends</h1>
        <p className="text-lg font-light text-center tracking-wide pb-5">
          One year we talked until midnight.
          <br />
          有一年我们谈论到午夜。
        </p>
        <FriendBody />
      </div>
    </div>
  );
};

const FriendBody = () => {
  return (
    <>
      {friends.map(({ category_name, friends }) => (
        <div
          key={category_name}
          className="mx-1 border-2 dark:border border-gray-700 dark:border-white/10 pt-10 pb-4 rounded-lg bg-white-readable dark:bg-[#1f1f24] dark:shadow-2xl relative mb-5 transition-all"
        >
          <div className="absolute top-2 inset-x-0 text-center light-bold dark:font-light">
            {category_name}
          </div>
          <div className="absolute inline-flex gap-2 top-2 left-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="mx-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {friends.map((friend) => (
              <div
                key={friend.name}
                className="flex flex-row gap-5 justify-center autobg items-center py-8 rounded-lg border-2 dark:border border-gray-700 dark:border-white/10 group relative"
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
                <div className="flex-grow">
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
        </div>
      ))}
    </>
  );
};

export default FriendPage;
