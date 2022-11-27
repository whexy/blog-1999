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
      <div className="py-4">
        <h2 className="pl-4 pb-1 text-sm font-light opacity-80">
          沉痛悼念 11.24 乌鲁木齐火灾罹难同胞
        </h2>
        <Link href="/freedom">
          <div
            className={`py-4 ${zhiMangXing.className} primary text-center text-4xl`}
          >
            <div className="flex flex-wrap justify-center gap-4">
              <div className="whitespace-nowrap">民主法治</div>
              <div className="whitespace-nowrap">表达自由</div>
              <div className="whitespace-nowrap">科学理性</div>
              <div className="whitespace-nowrap">融入世界</div>
            </div>
          </div>
        </Link>
      </div>
      <RecentPosts />
    </>
  );
}
