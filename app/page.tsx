import WelcomeCard from "@/components/UI/Homepage/WelcomeCard";
import PostPage from "@/components/UI/Homepage/PostPage";
import DynJump from "@/components/UI/Homepage/DynJump";

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
