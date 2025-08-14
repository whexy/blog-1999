import metadata from "@/data/metadata";
import Avatar from "@/components/UI/Graphic/icons/Avatar";
import Depth3D from "@/components/UI/Animation/Depth3D";
import Link from "next/link";

export default function Footer() {
  const commitURL = `https://github.com/whexy/blog-1999`;

  // get current year
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center px-2 py-4">
      <Depth3D hardness={5}>
        <div className="select-none pb-2 pt-2">
          <div className="mx-auto flex w-60 items-center justify-center divide-x divide-white/20 rounded-xl border border-white/10">
            <Avatar className="h-16 w-16" />
            <div className="px-2">
              <p className="pb-2 text-white">
                {metadata.author.name}&apos;s Blog
              </p>
              <p className="text-xs text-gray-300">
                Copyright © 2014-{year}
              </p>
            </div>
          </div>
        </div>
      </Depth3D>
      <div className="pb-2">
        <Link
          href={commitURL}
          className="font-mono text-xs text-white/40 hover:text-white/80"
          target="_blank"
          rel="noopener noreferrer">
          powered by blog-1999 system
        </Link>
      </div>
    </footer>
  );
}
