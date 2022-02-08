import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";

const SpotifyIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 fill-[#1DB954]"
  >
    <title>Spotify</title>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const NowPlaying = () => {
  const { data } = useSWR("/api/now-playing", fetcher, {
    refreshInterval: 30000, // Fetch API every 30 seconds
  });
  // const data = null;

  const props = useSpring({
    loop: true,
    from: { rotate: "0deg" },
    to: { rotate: "360deg" },
    config: { duration: 30000 },
  });

  return (
    <div className="flex items-center justify-between text-white-readable">
      {data && data.isPlaying ? (
        <div className="flex flex-shrink-0 items-center space-x-4">
          <div className="relative grid h-[50px] w-[50px] place-items-center overflow-hidden rounded-full border border-white/20">
            <div className="absolute z-20 grid h-[50px] w-[50px] place-items-center">
              <div className="h-[10px] w-[10px] rounded-full border border-white/10 bg-black-readable"></div>
            </div>
            <animated.div style={props}>
              <div className="relative h-[50px] w-[50px]">
                <Image
                  src={data.albumImageUrl}
                  alt="Album"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </animated.div>
          </div>
          <a
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col"
          >
            <p className="flex-shrink-0">{data.title}</p>
            <p className="flex-shrink-0 text-sm text-jbgray-light">
              {data.artist}
            </p>
          </a>
        </div>
      ) : (
        <p>
          Not Playing
          <span className="text-jbgray-light"> - Spotify</span>
        </p>
      )}
      <SpotifyIcon />
    </div>
  );
};

export default NowPlaying;
