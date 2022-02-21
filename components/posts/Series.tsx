import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/solid";
import { parseISO } from "date-fns";

import { allBlogs } from ".contentlayer/data";

const Series = ({ slug, series }) => {
  const seriesPosts = allBlogs
    .filter(p => p.series === series)
    .sort(
      (a, b) =>
        parseISO(a.publishDate).getTime() -
        parseISO(b.publishDate).getTime(),
    )
    .map(p => ({
      title: p.title,
      slug: p.slug,
    }));
  const thisSlug = slug;

  const trackSeriesRoute = (from: string, to: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).umami.trackEvent(`${from} - ${to}`, "series");
  };

  return (
    <div className="not-prose relative m-4 break-inside-avoid-page rounded-lg border-2 border-violet-200/80 bg-violet-200/10 p-4 font-sans">
      <div className="absolute left-0 top-0 flex items-center justify-center space-x-2 border-b border-r border-violet-300/80 bg-violet-300/10 px-2 font-bold">
        <BookOpenIcon className="h-6 w-6" />
        <div>{series}</div>
      </div>
      <div className="pt-6 pb-4 text-sm font-light">
        This article is part of a series.
      </div>
      <ul className="list-inside list-decimal">
        {seriesPosts.map(({ slug, title }) => (
          <li
            key={slug}
            className={`hover:underline ${
              slug === thisSlug && "font-bold underline"
            }`}
          >
            <Link href={`/posts/${slug}`}>
              <a onClick={() => trackSeriesRoute(thisSlug, slug)}>
                {title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Series;
