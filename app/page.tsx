import WelcomeCard from "@/components/WelcomeCard";
import PostPage from "@/components/PostPage";
import DynJump from "@/components/DynJump";

export default function Page() {
  return (
    <>
      <WelcomeCard />
      <div className="py-4">
        <DynJump />
        <PostPage />
      </div>
    </>
  );
}
