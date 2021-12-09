import Image from "next/image";
import playlist from "../data/playlist";
import { useState } from "react";

const PlayListHead = () => {
  return (
    <>
      <h1 className="text-center text-black-readble dark:text-white-readable text-3xl">🎧 歌单</h1>
      <div className="text-center font-light py-5">
        <p className="text-black-readable dark:text-white-readable">
          个人精选歌单，随缘更新。点击歌曲可在线聆听<sup>*</sup>。
        </p>
        <p className="text-jbgray dark:text-jbgray-light text-sm font-thin">
          *需要 <i className="fab fa-spotify"></i> Spotify
          <span className="text-[0.25em]"></span>网络连接条件。
        </p>
      </div>
    </>
  );
};

const PlayListBody = () => {
  return (
    <>
      {playlist.map((category) => (
        <div
          key={category.name}
          className="py-4 px-2 sm:w-9/12 mx-auto flex flex-col space-y-1 text-black-readble dark:text-white-readable select-none"
        >
          <h2 className="text-black-readble dark:text-white-readable">{category.name}</h2>
          {category.songs.map((song) => (
            <SongCard key={song.name} song={song} />
          ))}
        </div>
      ))}
    </>
  );
};

const SongCard = ({ song }) => {
  let [expand, setExpand] = useState(false);
  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <>
      <div className="bg-gray-200 dark:bg-spgray-secondary dark:hover:bg-spgray-bright rounded">
        <div className="pr-2 flex flex-row justify-between items-center">
          <div className={`flex-none ${expand && "blur scale-75"}`}>
            <div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-l">
              <Image src={song.pic} alt={song.name} width={128} height={128} />
            </div>
          </div>
          <div>
            <p className="text-black-readable dark:text-white-readable text-center font-semibold">{song.title}</p>
            <p className="text-gray-600 dark:text-gray-400 text-center whitespace-nowrap">
              {song.word}
            </p>
          </div>
          <button className="text-lg" onClick={toggleExpand}>
            <i
              className={`text-black-readable dark:text-white-readable fas w-8 h-8 ${
                expand ? "fa-caret-up" : "fa-caret-down"
              }`}
            ></i>
          </button>
        </div>
        {expand && (
          <div className="p-4 rounded-b">
            <iframe
              src={song.link}
              width="100%"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
};
const PlayListView = () => {
  return (
    <div className="bg-white-readable dark:bg-spgray">
      <div className="py-10 mx-auto max-w-md sm:max-w-3xl">
        <PlayListHead />
        <PlayListBody />
      </div>
    </div>
  );
};

export default PlayListView;
