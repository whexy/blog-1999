import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { parseISO } from "date-fns";
import { getBlogPosts } from "@/lib/blog";

const Series = ({ slug, series }) => {
  const seriesPosts = getBlogPosts()
    .filter(p => p.metadata.series === series)
    .sort(
      (a, b) =>
        parseISO(a.metadata.publishDate).getTime() -
        parseISO(b.metadata.publishDate).getTime(),
    )
    .map(p => ({
      title: p.metadata.title,
      slug: p.slug,
    }));
  const thisSlug = slug;

  return (
    <div>
      <div className="not-prose relative m-4 break-inside-avoid-page rounded-lg border-2 border-violet-200/80 bg-violet-200/5 p-4 font-sans">
        <div className="absolute left-0 top-0 flex items-center justify-center space-x-2 border-b border-r border-violet-300/80 bg-violet-300/10 px-2 font-bold">
          <BookOpenIcon className="h-6 w-6" />
          <div>{series}</div>
        </div>
        <ul className="list-inside list-decimal pt-6">
          {seriesPosts.map(({ slug, title }) => (
            <li
              key={slug}
              className={`${slug === thisSlug && "font-bold"}`}>
              <Link
                href={`/posts/${slug}`}
                className="rounded-sm p-1 transition-all hover:bg-violet-800/5">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Series;
