import { parseISO, compareDesc } from "date-fns";
import { getAllBlogPosts } from "@/lib/blog";
import Link from "next/link";

type Language = "en" | "zh";

interface PostsViewProps {
  lang?: Language;
}

const PostsView = ({ lang }: PostsViewProps) => {
  const allBlogs = getAllBlogPosts();

  const posts = allBlogs.sort((p1, p2) =>
    compareDesc(
      parseISO(p1.metadata.publishDate),
      parseISO(p2.metadata.publishDate),
    ),
  );

  const filteredBlogPosts = posts.filter(
    p => p.metadata.lang === lang,
  );

  const urlPrefix = lang ? `/${lang}` : "";

  return (
    <div className="flex w-full flex-col gap-12 overflow-hidden rounded-3xl border border-white/20 bg-white/80 px-6 py-8 backdrop-blur-sm sm:gap-16 sm:px-8 sm:py-12">
      {filteredBlogPosts.map(post => (
        <PostCard
          key={`${post.slug}-${post.metadata.lang}`}
          title={post.metadata.title}
          url={`${urlPrefix}/posts/${post.slug}`}
          summary={post.metadata.summary}
          showSummary={true}
        />
      ))}
    </div>
  );
};

const PostCard = ({ title, url, summary, showSummary = false }) => {
  return (
    <div className="flex w-full flex-col gap-2.5 text-black">
      <Link href={url ? url : "/"} className="group">
        <div className="group-hover:secondbg -m-4 rounded-2xl p-4 transition-all duration-300">
          <h3 className="font-article text-lg font-bold leading-relaxed transition-colors duration-200 group-hover:text-gray-800 sm:text-xl">
            {title}
          </h3>
          {showSummary && summary && (
            <p className="mt-2.5 font-article text-sm leading-relaxed opacity-60 transition-opacity duration-200 group-hover:opacity-80 sm:text-base">
              {summary}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PostsView;
