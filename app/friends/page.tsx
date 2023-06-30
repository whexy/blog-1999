import FriendCard from "@/components/UI/Homepage/FriendCard";
import PageTitle from "@/components/UI/Website/PageTitle";
import Comment from "@/components/UI/Blog/Comment";
import { getUserData } from "@/lib/github";
import { Metadata } from "next";
import friends from "@/data/friends";

export const metadata: Metadata = {
  title: "My Friends",
  description: "Friends of whexy.",
};

const FriendPage = async () => {
  const f_info = [];
  for (const friend of friends) {
    if (!friend.github) continue;
    const github_info = await getUserData(friend.github);
    if (!github_info) continue;

    // if github_info contains both name and login, use the one without space.
    if (github_info.name && github_info.login) {
      if (github_info.name.includes(" ")) {
        github_info.name = github_info.login;
      }
    }

    if (github_info.blog) {
      github_info.blog = github_info.blog.replace(
        /^(https?:\/\/)/,
        "",
      );
    }

    const { name, login, bio, avatar_url, blog } = github_info;
    f_info.push({
      name: name || login,
      description: bio || "",
      icon: avatar_url,
      url: blog || friend.url,
    });
  }

  return (
    <div>
      <PageTitle title="My Friends" emoji="🧑‍🤝‍🧑" />
      <div className="mx-3 grid grid-cols-1 gap-8 pb-5 sm:auto-rows-fr sm:grid-cols-2">
        {f_info
          .sort((f1, f2) => f1.name.localeCompare(f2.name))
          .map(friend => (
            <FriendCard key={friend.name} friend={friend} />
          ))}
      </div>
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
