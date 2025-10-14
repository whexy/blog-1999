import PostsView from "@/components/UI/Homepage/PostPage";
import WelcomeCard from "@/components/UI/Homepage/WelcomeCard";

type Language = "en" | "zh";

interface PageProps {
  params: Promise<{ lang: Language }>;
}

export default async function LanguagePage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <div className="space-y-8">
      <WelcomeCard />
      <PostsView lang={lang} />
    </div>
  );
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}
