import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const Series = ({ title, series, seriesPosts }) => {
  let thisTitle = title;
  return (
    <div className="not-prose font-sans relative bg-violet-200/10 rounded-lg border-2 border-violet-200/80 p-4 m-4">
      <p className="absolute left-0 top-0 px-2 bg-violet-300/10 border-b border-r border-violet-300/80 font-bold">
        <span>
          <FontAwesomeIcon icon={faBook} className="w-4 h-4" />
        </span>
        <span>{" "}{series}</span>
      </p>
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
