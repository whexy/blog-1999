import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { parseISO } from "date-fns";
import { getAllBlogPosts } from "@/lib/blog";

const Series = ({ slug, series, lang = "en" }) => {
  const seriesPosts = getAllBlogPosts()
    .filter(
      p => p.metadata.series === series && p.metadata.lang === lang,
    )
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
    <div className="not-prose relative m-4">
      <div className="glass-card rounded-2xl p-6">
        {/* Background decoration */}
        <div className="glass-tint from-red-100/20 via-red-50/10 to-orange-100/20" />
        <div className="glow-blob -top-8 -right-8 h-32 w-32 from-red-200/20 to-orange-200/20 blur-2xl" />
        <div className="glow-blob -bottom-6 -left-6 h-24 w-24 from-red-200/15 to-orange-200/15 blur-xl" />

        {/* Glass shine effect */}
        <div className="glass-shine" />

        {/* Header */}
        <div className="relative mb-6 flex items-center gap-3">
          <div className="icon-tile bg-gradient-to-br from-red-500/20 to-orange-500/20">
            <BookOpenIcon className="h-5 w-5 text-red-700" />
          </div>
          <h3 className="font-title text-lg font-semibold text-neutral-800">
            {series}
          </h3>
        </div>

        {/* Series list */}
        <div className="relative space-y-2">
          {seriesPosts.map(({ slug, title }, index) => {
            const isActive = slug === thisSlug;
            return (
              <Link
                key={slug}
                href={`/${lang}/posts/${slug}`}
                className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-white/40 shadow-sm"
                    : "hover:bg-white/20"
                }`}>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-red-500 to-orange-600 text-white shadow-md"
                      : "bg-white/30 text-neutral-600 group-hover:bg-white/50"
                  }`}>
                  {index + 1}
                </span>
                <span
                  className={`text-sm leading-tight ${
                    isActive
                      ? "font-semibold text-neutral-900"
                      : "text-neutral-700 group-hover:text-neutral-900"
                  }`}>
                  {title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Series;
