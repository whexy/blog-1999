import WelcomeCard from "@/components/homepage/WelcomeCard";
import RecentPosts from "@/components/homepage/RecentPosts";

import { Zhi_Mang_Xing } from "@next/font/google";
import Link from "next/link";

const zhiMangXing = Zhi_Mang_Xing({
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
});

export default function Page() {
  return (
    <>
      <WelcomeCard />
      <Link href="/freedom">
        <div
          className={`my-10 ${zhiMangXing.className} text-center text-4xl`}
        >
          <p>
            <span className="whitespace-nowrap">民主法治，</span>
            <span className="whitespace-nowrap">表达自由，</span>
            <span className="whitespace-nowrap">科学理性，</span>
            <span className="whitespace-nowrap">融入世界。</span>
          </p>
        </div>
      </Link>
      <RecentPosts />
    </>
  );
}
