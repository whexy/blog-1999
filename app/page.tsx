import WelcomeCard from "@/components/UI/Homepage/WelcomeCard";
import DynJump from "@/components/UI/Homepage/DynJump";
import PostsView from "@/components/UI/Homepage/PostPage";

export default function Page() {
  return (
    <>
      <WelcomeCard />
      <div className="py-4">
        <DynJump />
        <PostsView feature_only />
      </div>
    </>
  );
}
