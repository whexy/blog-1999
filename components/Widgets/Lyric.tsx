// Show lyric like Apple Music and Instagram

import Image from "next/image";

interface LyricProps {
  lyric: string | string[];
  song: string;
  artist: string;
  img: string;
}

export default function Lyric({
  lyric,
  song,
  artist,
  img,
}: LyricProps) {
  return (
    <div className="relative h-screen font-default">
      <Image
        src={img}
        alt={song}
        fill
        className="rounded-lg blur-2xl"
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10 grid grid-rows-3 place-items-center">
        <div>
          <h1 className="text-2xl font-bold">
            擁有你 就不需要魔法給的勇氣
          </h1>
          <h2 className="text-right font-mono opacity-50">
            Whexy&apos;s Collection Vol.42
          </h2>
        </div>
        <div className="w-4/5 overflow-hidden rounded-2xl text-white sm:w-5/12">
          <div className="px-4 py-2 text-2xl font-semibold backdrop-brightness-[0.2] backdrop-opacity-50">
            {typeof lyric === "string" ? (
              <div>{lyric}</div>
            ) : (
              lyric.map(line => <div key={line}>{line}</div>)
            )}
          </div>
          <div className="flex space-x-3 px-4 py-4 backdrop-brightness-[0.2] backdrop-opacity-60">
            <Image
              src={img}
              alt={song}
              width="48"
              height="48"
              className="h-12 w-12 rounded"
            />
            <div>
              <p className="text-lg font-bold leading-tight">
                {song}
              </p>
              <p className="text-lg">{artist}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
