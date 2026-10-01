import { getBilibiliData } from "@/lib/bilibili";

interface BilibiliProps {
  bvid: string;
}

const Bilibili = async ({ bvid }: BilibiliProps) => {
  const video = await getBilibiliData(bvid);

  return (
    <a
      href={`https://www.bilibili.com/video/${bvid}`}
      target="_blank"
      rel="noopener noreferrer"
      className="secondbg not-prose mx-2 flex break-inside-avoid-page flex-col overflow-hidden rounded-xl font-sans sm:flex-row">
      {video ? (
        <>
          {/* Plain <img>: the cover host varies (i0/i1/i2.hdslb.com)
              and its hotlink protection needs no Referer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.pic.replace(/^http:/, "https:")}
            alt={video.title}
            width={512}
            height={288}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-auto w-full object-cover sm:w-1/3"
          />
          <div className="p-6">
            <div className="pb-4">
              <p className="font-bold">{video.title}</p>
              <p className="text-sm">{video.owner.name}</p>
            </div>
            <p className="text-xs opacity-70">{video.desc}</p>
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-4 p-4">
          <div className="flex h-15 w-15 flex-none items-center justify-center rounded-full bg-neutral-200">
            <svg
              className="h-7 w-7 text-neutral-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-lg">
              Bilibili video{" "}
              <span className="font-semibold">{bvid}</span>
            </p>
            <p className="text-sm text-neutral-500">
              Video information unavailable &middot; watch on
              bilibili.com
            </p>
          </div>
        </div>
      )}
    </a>
  );
};

export default Bilibili;
