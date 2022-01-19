import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/solid";

const Series = ({ title, series, seriesPosts }) => {
  let thisTitle = title;
  return (
    <div className="not-prose font-sans relative bg-violet-200/10 rounded-lg border-2 border-violet-200/80 p-4 m-4 break-inside-avoid-page">
      <div className="absolute left-0 top-0 px-2 bg-violet-300/10 border-b border-r border-violet-300/80 font-bold flex space-x-2 justify-center items-center">
        <BookOpenIcon className="w-6 h-6" />
        <div>{series}</div>
      </div>
      <div className="text-sm font-light pt-6 pb-4">
        This article is part of a series.
      </div>
      <ul className="list-decimal list-inside">
        {seriesPosts.map(({ id, title }) => (
          <li
            key={id}
            className={`hover:underline ${
              thisTitle === title && "font-bold underline"
            }`}
          >
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Series;
