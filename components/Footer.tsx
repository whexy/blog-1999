import metadata from "@/data/metadata";
import Avatar from "@/public/img/notion-avatar.svg";
import Link from "next/link";
import AnimatedFancyCard from "./AnimatedFancyCard";
import NowPlaying from "@/components/NowPlaying";

const FootCard = () => {
  return (
    <AnimatedFancyCard hardness={5}>
      <div className="select-none pt-5 pb-2">
        <div className="mx-auto flex w-60 items-center justify-center divide-x divide-white/20 rounded-xl bg-white/10">
          <Avatar className="h-16 w-16" />
          <div className="px-2">
            <p className="pb-2 text-white">
              {metadata.author.name}&apos;s Blog
            </p>
            <p className="text-xs font-light text-jbgray-light">
              Copyright © 2014-{metadata.year}
            </p>
          </div>
        </div>
      </div>
    </AnimatedFancyCard>
  );
};

export default function Footer() {
  const commit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const commitURL = `https://github.com/whexy/blog-1999/commit/${commit}`;
  return (
    <footer className="mx-auto bg-black-readable sm:max-w-2xl">
      <div className="px-10 py-5">
        <NowPlaying />
      </div>
      <hr className="mx-10 border-white/20" />
      <FootCard />
      <div className="flex justify-center pb-5">
        <a
          href={commitURL}
          className="font-mono text-xs text-white/20 hover:text-white/40"
          target="_blank"
          rel="noopener noreferrer"
        >
          powered by blog-1999 system ({commit.substring(0, 8)})
        </a>
      </div>
    </footer>
  );
}
