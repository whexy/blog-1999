import WelcomeCard from "@/components/UI/Homepage/WelcomeCard";
import PostsView from "@/components/UI/Homepage/PostPage";

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-8">
      <WelcomeCard />
      <PostsView />
    </div>
  );
}
