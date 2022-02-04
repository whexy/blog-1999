import metadata from "@/data/metadata";
import Avatar from "@/public/img/notion-avatar.svg";
import Link from "next/link";
import NowPlaying from "@/components/NowPlaying";

export default function Footer() {
  const commit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const commitURL = `https://github.com/whexy/blog-1999/commit/${commit}`;
  return (
    <footer className="mx-auto sm:max-w-2xl bg-black-readable">
      <div className="pt-5 pb-2 select-none">
        <div className="w-60 mx-auto bg-white/10 rounded-xl flex justify-center items-center divide-x divide-white/20">
          <Avatar className="w-16 h-16" />
          <div className="px-2">
            <p className="text-white pb-2">
              {metadata.author.name}&apos;s Blog
            </p>
            <p className="text-xs text-jbgray-light font-light">
              Copyright © 2014-{metadata.year}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-5">
        <Link href={commitURL}>
          <a className="text-white/20 hover:text-white/40 text-xs font-mono">
            wenxuan-1999 blog system ({commit.substring(0, 8)})
          </a>
        </Link>
      </div>
      <hr className="mx-10 border-white/20" />
      <div className="px-10 py-5">
        <NowPlaying />
      </div>
      <div className="mx-auto mb-10 px-10 text-sm font-light grid grid-cols-1 sm:grid-cols-3 space-y-4 sm:space-y-0">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-jbgray-light hover:opacity-50">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-jbgray-light hover:opacity-50">
              About
            </a>
          </Link>
          <Link href="/posts">
            <a className="text-jbgray-light hover:opacity-50">
              Posts
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <Link href="https://github.com/whexy">
            <a className="text-jbgray-light hover:opacity-50">
              GitHub
            </a>
          </Link>
          <Link href="https://twitter.com/whexyshi">
            <a className="text-jbgray-light hover:opacity-50">
              Twitter
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <Link href="/keys">
            <a className="text-jbgray-light hover:opacity-50">Keys</a>
          </Link>
          <Link href="/friends">
            <a className="text-jbgray-light hover:opacity-50">
              Friends
            </a>
          </Link>
          <Link href="/feed/feed.xml">
            <a className="text-jbgray-light hover:opacity-50">RSS</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
