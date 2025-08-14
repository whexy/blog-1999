import { parseISO, compareDesc } from "date-fns";
import PostCard from "@/components/UI/Homepage/PostCard";
import { getBlogPosts } from "@/lib/blog";

const PostsView = ({ feature_only = false }) => {
  const allBlogs = getBlogPosts();

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
  return (
    <div className="flex w-full flex-col gap-12 overflow-hidden rounded-3xl border border-white/20 bg-white/80 px-6 py-8 backdrop-blur-sm sm:gap-16 sm:px-8 sm:py-12">
      {filteredBlogPosts.map(post => (
        <PostCard
          key={post.metadata.title}
          title={post.metadata.title}
          url={`/posts/${post.slug}`}
          summary={post.metadata.summary}
          showSummary={true}
        />
      ))}
    </div>
  );
};

export default PostsView;
