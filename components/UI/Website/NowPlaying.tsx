"use client";

import useSWR from "swr";
import Image from "next/image";

const SpotifyIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 fill-[#1DB954]">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

interface NowPlayingData {
  isPlaying: boolean;
  albumImageUrl: string;
  songUrl: string;
  title: string;
  artist: string;
}

async function fetcher(
  input: RequestInfo,
  init?: RequestInit,
): Promise<NowPlayingData> {
  const res = await fetch(input, init);
  return res.json();
}

const NowPlaying = () => {
  const { data } = useSWR("/api/now-playing", fetcher, {
    refreshInterval: 30000, // Fetch API every 30 seconds
  });
  if (data && data.isPlaying)
    return (
      <div className="select-none pb-2 pt-2">
        <div className="mx-auto flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2">
          <div className="flex items-center">
            <Image
              src={data.albumImageUrl}
              alt="Album"
              width="64"
              height="64"
            />
            <div className="ml-3 px-1">
              <a
                href={data.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col">
                <p className="text-sm text-white">{data.title}</p>
              </a>
              <p className="text-xs text-jbgray-light">
                by{" "}
                <span className="text-white/70">{data.artist}</span>
              </p>
            </div>
          </div>
          <SpotifyIcon />
        </div>
      </div>
    );
};

export default NowPlaying;
