import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { postPath, type Language } from "@/lib/site";

interface PostsViewProps {
  lang: Language;
}

const PostsView = ({ lang }: PostsViewProps) => {
  // getAllBlogPosts() is already sorted newest first.
  const posts = getAllBlogPosts().filter(
    p => p.metadata.lang === lang,
  );

  return (
    <div className="panel flex w-full flex-col gap-12 overflow-hidden px-6 py-8 sm:gap-16 sm:px-8 sm:py-12">
      {posts.map(post => (
        <PostCard
          key={`${post.slug}-${post.metadata.lang}`}
          title={post.metadata.title}
          url={postPath(lang, post.slug)}
          summary={post.metadata.summary}
          showSummary={true}
        />
      ))}
    </div>
  );
};

interface PostCardProps {
  title: string;
  url: string;
  summary?: string;
  showSummary?: boolean;
}

const PostCard = ({
  title,
  url,
  summary,
  showSummary = false,
}: PostCardProps) => {
  return (
    <div className="flex w-full flex-col gap-2.5 text-black">
      <Link href={url} className="group">
        <div className="group-hover:secondbg -m-4 rounded-2xl p-4 transition-all duration-300">
          <h3 className="font-title text-lg leading-snug font-bold tracking-tight transition-colors duration-200 group-hover:text-neutral-800 sm:text-xl">
            {title}
          </h3>
          {showSummary && summary && (
            <p className="font-article mt-2.5 text-sm leading-relaxed opacity-60 transition-opacity duration-200 group-hover:opacity-80 sm:text-base">
              {summary}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PostsView;
