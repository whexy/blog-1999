import type { Metadata } from "next";
import PostsView from "@/components/UI/Homepage/PostPage";
import WelcomeCard from "@/components/UI/Homepage/WelcomeCard";
import { defaultLocale, isLocale } from "@/lib/site";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function LanguagePage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <div className="space-y-8">
      <WelcomeCard />
      <PostsView lang={isLocale(lang) ? lang : defaultLocale} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", zh: "/zh", "x-default": "/en" },
    },
  };
}
