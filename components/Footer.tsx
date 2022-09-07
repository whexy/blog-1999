import NowPlaying from "@/components/NowPlaying";
import Link from "next/link";
import metadata from "@/data/metadata";
import dynamic from "next/dynamic";
import Avatar from "@/components/icons/Avatar";
const AnimatedFancyCard = dynamic(
  () => import("./AnimatedFancyCard"),
);

const ExternalLink = ({ href, children }) => (
  <a
    className="text-white/50 transition hover:text-white/60"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  const commit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const commitURL = `https://github.com/whexy/blog-1999`;
  return (
    <footer className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-2 sm:items-start">
      <div className="w-full pb-4">
        <NowPlaying />
      </div>
      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 pb-6 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-white/50 transition hover:text-white/60">
              Home
            </a>
          </Link>
          <Link href="/about">
            <a className="text-white/50 transition hover:text-white/60">
              About
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://twitter.com/whexyshi">
            Twitter
          </ExternalLink>
          <ExternalLink href="https://github.com/whexy">
            GitHub
          </ExternalLink>
          <ExternalLink href="https://space.bilibili.com/4661672">
            Bilibili
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <Link href="/guestbook">
            <a className="text-white/50 transition hover:text-white/60">
              Guestbook
            </a>
          </Link>
          <Link href="/snippets">
            <a className="text-white/50 transition hover:text-white/60">
              Snippets
            </a>
          </Link>
          <Link href="/gallery">
            <a className="text-white/50 transition hover:text-white/60">
              Gallery
            </a>
          </Link>
        </div>
      </div>
      <AnimatedFancyCard hardness={5}>
        <div className="select-none pt-2 pb-2">
          <div className="mx-auto flex w-60 items-center justify-center divide-x divide-white/20 rounded-xl border border-white/10">
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
      <div className="pb-2">
        <a
          href={commitURL}
          className="font-mono text-xs text-white/20 hover:text-white/40"
          target="_blank"
          rel="noopener noreferrer"
        >
          powered by blog-1999 system ({commit.substring(0, 8)})
        </a>
      </div>
      <div className="flex justify-center space-x-2 pb-2 font-mono text-xs">
        <a href="whexy.ssh.pub">
          <abbr
            title="SHA256:pFZ1bs/uRKhUn5oP2bgZQH6lmGG0BQWti7JYZMDTeI0"
            className="text-white/20 hover:text-white/40"
          >
            pFZ1bs...(SSH)
          </abbr>
        </a>
        <a href="whexy.pgp.asc">
          <abbr
            title="59A4 998E 07C1 D6FB 2557  51CC A513 A02F DDFF 1598"
            className="text-white/20 hover:text-white/40"
          >
            0xDDFF1598(PGP)
          </abbr>
        </a>
      </div>
    </footer>
  );
}
