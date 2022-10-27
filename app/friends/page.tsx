import Image from "@/components/Image99";
import { friends, Friend } from "@/data/friends";

// tiny
import PageTitle from "@/components/tiny/PageTitle";

const FriendPage = () => {
  const me: Friend = {
    name: "Whexy (me)",
    icon: "https://avatars.githubusercontent.com/u/25165025?v=4",
    url: "https://www.whexy.com",
    description: "",
  };
  return (
    <>
      <PageTitle title="My Friends" emoji="🧑‍🤝‍🧑" />
      <div className="flex items-start justify-center gap-2 pb-10">
        <div className="max-w-2xl flex-1">
          <div className="primary grid grid-cols-1 gap-1 divide-y divide-black/10 dark:divide-white/10">
            {friends
              .sort((f1, f2) => f1.name.localeCompare(f2.name))
              .map(friend => (
                <a
                  key={friend.name}
                  href={friend.url}
                  target="_blank"
                  rel="noreferrer"
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
        <div className="hidden w-[24rem] flex-col gap-2 sm:flex">
          <div className="primary relative">
            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-green-500" />
            <div className="flex space-x-8 p-8">
              <Image
                src={me.icon}
                alt={me.name}
                className="rounded-lg"
                width={100}
                height={100}
              />
              <div>
                <h3 className="text-2xl">{me.name}</h3>
                <a
                  href={me.url}
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-60"
                >
                  {me.url.split("//")[1]}
                </a>
              </div>
            </div>
          </div>
          <div className="primary prose-sm hidden p-6 sm:block">
            <div className="flex items-center space-x-2">
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19.1 21.875L16.8 19.6q-.15.2-.35.3q-.2.1-.45.1H2q-.425 0-.712-.288Q1 19.425 1 19v-1.8q0-.85.438-1.563q.437-.712 1.162-1.087q1.55-.775 3.15-1.163Q7.35 13 9 13q.325 0 .638.012q.312.013.612.038L9.2 12H9q-1.65 0-2.825-1.175Q5 9.65 5 8v-.2L2.1 4.9q-.3-.3-.288-.7q.013-.4.313-.7q.3-.3.713-.3q.412 0 .712.3l16.975 16.975q.3.3.3.7q0 .4-.3.7q-.3.3-.713.3q-.412 0-.712-.3ZM19 14q-.425 0-.712-.288Q18 13.425 18 13v-2h-2q-.425 0-.712-.288Q15 10.425 15 10t.288-.713Q15.575 9 16 9h2V7q0-.425.288-.713Q18.575 6 19 6t.712.287Q20 6.575 20 7v2h2q.425 0 .712.287Q23 9.575 23 10t-.288.712Q22.425 11 22 11h-2v2q0 .425-.288.712Q19.425 14 19 14Zm-6.4-4.3L7.3 4.4q.375-.2.813-.3Q8.55 4 9 4q1.65 0 2.825 1.175Q13 6.35 13 8q0 .45-.1.887q-.1.438-.3.813Z"
                />
              </svg>
              <h5 className="font-title text-lg">Weak Reject</h5>
            </div>
            <div className="opacity-70">
              <p>
                You are welcome to read my blog, write comments, send
                emails to discuss technical related issues, or follow
                my Twitter and Github accounts.
              </p>
              <p>
                Please <b>DO NOT</b> send emails exchanging links to
                your blog sites for SEO purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendPage;
