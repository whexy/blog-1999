import PageTitle from "@/components/UI/Website/PageTitle";
import { getSavedArticles } from "@/lib/freshrss";
import Link from "next/link";
import Image from "next/image";

import { getRecentPlayed } from "@/lib/emby";
import { getTopTracks } from "@/lib/spotify";

const Page = async () => {
  return (
    <div className="pb-8">
      <PageTitle title="Dashboard" emoji="📈" />
      <RSS />
      <Spotify />
      <Emby />
    </div>
  );
};

const RSS = async () => {
  const articles = await getSavedArticles();
  return (
    <div className="rounded-lg bg-white p-4">
      <h2 className="px-2 pb-4 font-title text-2xl font-bold">
        Articles (Recent 10)
      </h2>
      {articles.map(({ title, url, originTitle, published }) => (
        <Link href={url} key={title}>
          <div className="flex items-center px-1 py-2 transition-all hover:bg-gray-50">
            <div className="min-w-0 flex-grow">
              <p>
                <span className="font-bold">{title}</span>
              </p>
              <p className="truncate text-sm sm:text-base">
                {originTitle}
              </p>
            </div>
            <p className="flex-shrink-0 font-mono text-xs text-gray-500 sm:text-sm">
              {published.toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const Emby = async () => {
  const recentPlayed = await getRecentPlayed();

  return (
    <div className="mt-5 rounded-lg bg-white p-4">
      <h2 className="px-2 pb-4 font-title text-2xl font-bold">
        Movies & Shows (Recent 5)
      </h2>
      <div className="grid place-items-center gap-4 lg:grid-cols-2">
        {recentPlayed.map(({ Name, Id, Type }) => (
          <div
            key={Id}
            className={`${Type === "Movie" && "row-span-2"}`}>
            <Image
              src={`/api/emby?img=${Id}`}
              alt={Name}
              height={300}
              width={300}
              className="rounded-lg object-contain"
            />
            <p className="w-[300px] text-center font-title text-black/80">
              {Name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Spotify = async () => {
  const resp = await getTopTracks();
  const topTracks = await resp.json();

  return (
    <div className="mt-5 rounded-lg bg-white p-4">
      <h2 className="px-2 pb-4 font-title text-2xl font-bold">
        Songs (Last 4 weeks, Top 6 tracks)
      </h2>
      <div className="grid grid-cols-2 place-items-center gap-4 lg:grid-cols-3">
        {topTracks.items.map(({ name, album, artists }) => (
          <div key={name}>
            <Image
              src={album.images[0].url}
              alt={name}
              height={150}
              width={150}
              className="rounded-lg"
            />
            <p>{name}</p>
            <p className="text-sm">
              {artists.map(({ name }) => name).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
