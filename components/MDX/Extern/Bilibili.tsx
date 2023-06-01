"use client";

import Image from "next/image";
import Link from "next/link";

import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/fetcher";

const Bilibili = ({ bvid }: { bvid: string }) => {
  // get detailed info

  const { data } = useSWRImmutable(
    "/api/bilibili-video?bvid=" + bvid,
    fetcher,
  );

  return (
    <Link
      href={`https://www.bilibili.com/video/${bvid}`}
      className="secondbg not-prose mx-2 flex break-inside-avoid-page flex-col overflow-hidden rounded-lg sm:flex-row"
    >
      {data && (
        <>
          <Image
            src={data.data.pic}
            alt={bvid}
            width={512}
            height={288}
            className="sm:w-1/3"
          />
          <div className="p-6">
            <div className="pb-4">
              <p className="font-bold">{data.data.title}</p>
              <p className="text-sm">{data.data.owner.name}</p>
            </div>
            <p className="text-xs opacity-70">{data.data.desc}</p>
          </div>
        </>
      )}
    </Link>
  );
};

export default Bilibili;
