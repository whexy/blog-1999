import PageTitle from "@/components/UI/Website/PageTitle";
import { getSavedArticles } from "@/lib/freshrss";
import Link from "next/link";

const Page = async () => {
  const articles = await getSavedArticles();

  return (
    <div>
      <PageTitle title="My Collection" emoji="❤️" />
      <p className="pb-4">
        The following article list is updated dynamically, showing my
        featured articles as I browse the internet. Most of them are
        related to computer security, and there are also some
        interesting news pieces from around the digital world.
      </p>
      <div className="rounded-lg bg-white p-4">
        <h2 className="px-2 pb-4 font-title text-2xl font-bold">
          Stars (Recent 10)
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
    </div>
  );
};

export default Page;
