import metadata from "@/data/metadata";
import Avatar from "@/public/img/notion-avatar.svg";
import Link from "next/link";
import NowPlaying from "@/components/NowPlaying";

export default function Footer() {
  const commit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const commitURL = `https://github.com/whexy/blog-1999/commit/${commit}`;
  return (
    <footer className="mx-auto bg-black-readable sm:max-w-2xl">
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
      <div className="flex justify-center pb-5">
        <Link href={commitURL}>
          <a className="font-mono text-xs text-white/20 hover:text-white/40">
            wenxuan-1999 blog system ({commit.substring(0, 8)})
          </a>
        </Link>
      </div>
      <hr className="mx-10 border-white/20" />
      <div className="px-10 py-5">
        <NowPlaying />
      </div>
      <div className="mx-auto mb-10 grid grid-cols-1 space-y-4 px-10 text-sm font-light sm:grid-cols-3 sm:space-y-0">
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
