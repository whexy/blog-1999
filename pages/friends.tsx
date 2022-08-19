import Image from "@/components/Image99";
import { friends, Friend } from "@/data/friends";

// tiny
import PageTitle from "@/components/tiny/PageTitle";
import Main from "@/components/Main";
import { useState } from "react";

const me: Friend = {
  name: "Whexy (me)",
  icon: "https://avatars.githubusercontent.com/u/25165025?v=4",
  url: "https://www.whexy.com",
  description: "",
};

const FriendPage = () => {
  const [chosen, setChosen] = useState<Friend>(me);
  return (
    <Main>
      <PageTitle title="My Friends" emoji="🧑‍🤝‍🧑" />
      <div className="flex items-start justify-center gap-2 pb-10">
        <div className="max-w-2xl flex-1">
          <div
            className="primary grid grid-cols-1 gap-1 divide-y divide-black/10 dark:divide-white/10"
            onMouseLeave={() => {
              setChosen(me);
            }}
          >
            {friends
              .sort((f1, f2) => f1.name.localeCompare(f2.name))
              .map(friend => (
                <a
                  key={friend.name}
                  href={friend.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => {
                    setChosen(friend);
                  }}
                >
                  <div className="group py-2  px-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={friend.icon}
                            alt={friend.name}
                            width={64}
                            height={64}
                          />
                        </div>
                        <p>{friend.name}</p>
                      </div>
                      <div>
                        <p className="truncate text-jbgray-light transition-all group-hover:text-blue-600 dark:group-hover:text-blue-300">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6Z"
                            />
                          </svg>
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </div>
        <div className="primary relative hidden min-w-[24rem] sm:block">
          <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-green-500" />
          <div className="flex space-x-8 p-8">
            <Image
              src={chosen.icon}
              alt={chosen.name}
              className="rounded-lg"
              width={100}
              height={100}
            />
            <div>
              <h3 className="text-2xl">{chosen.name}</h3>
              <a
                href={chosen.url}
                target="_blank"
                rel="noreferrer"
                className="opacity-60"
              >
                {chosen.url.split("//")[1]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default FriendPage;
