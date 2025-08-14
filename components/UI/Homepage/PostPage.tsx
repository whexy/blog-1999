import { parseISO, compareDesc } from "date-fns";
import PostCard from "@/components/UI/Homepage/PostCard";
import { getBlogPosts } from "@/lib/blog";

type Language = "en" | "zh";

interface PostsViewProps {
  feature_only?: boolean;
  lang?: Language;
}

const PostsView = ({
  feature_only = false,
  lang,
}: PostsViewProps) => {
  const allBlogs = getBlogPosts(lang);

  const posts = allBlogs.sort((p1, p2) =>
    compareDesc(
      parseISO(p1.metadata.publishDate),
      parseISO(p2.metadata.publishDate),
    ),
  );

  let filteredBlogPosts = posts;
  if (feature_only) {
    filteredBlogPosts = posts.filter(
      post => post.metadata.featured === "true",
    );
  }

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

export default PostsView;
