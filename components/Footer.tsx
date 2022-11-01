import NowPlaying from "@/components/NowPlaying";
import metadata from "@/data/metadata";
import Avatar from "@/components/icons/Avatar";
import AnimatedFancyCard from "@/components/AnimatedFancyCard";

export default function Footer() {
  const commit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const commitURL = `https://github.com/whexy/blog-1999`;
  return (
    <footer className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-2 sm:items-start">
      <div className="w-full pb-4">
        <NowPlaying />
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
          className="font-mono text-xs text-white/40 hover:text-white/80"
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
            className="text-white/40 hover:text-white/80"
          >
            pFZ1bs...(SSH)
          </abbr>
        </a>
        <a href="whexy.pgp.asc">
          <abbr
            title="59A4 998E 07C1 D6FB 2557  51CC A513 A02F DDFF 1598"
            className="text-white/40 hover:text-white/80"
          >
            0xDDFF1598(PGP)
          </abbr>
        </a>
      </div>
    </footer>
  );
}
