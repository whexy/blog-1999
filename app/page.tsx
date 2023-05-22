import WelcomeCard from "@/components/homepage/WelcomeCard";
import PostPage from "@/components/PostPage";

export default function Page() {
  return (
    <>
      <WelcomeCard />
      <div className="py-16">
        <PostPage />
      </div>
    </>
  );
}
