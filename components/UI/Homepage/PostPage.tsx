import { allBlogs } from "contentlayer/generated";
import pick from "lodash/pick";
import { format, parseISO, compareDesc } from "date-fns";
import PostCard from "@/components/UI/Homepage/PostCard";

const PostsView = ({ feature_only = false }) => {
  const posts = allBlogs
    .map(post =>
      pick(post, [
        "title",
        "slug",
        "image",
        "summary",
        "preview",
        "publishDate",
        "cat",
        "featured",
      ]),
    )
    .sort((p1, p2) =>
      compareDesc(parseISO(p1.publishDate), parseISO(p2.publishDate)),
    );
  let filteredBlogPosts = posts;
  if (feature_only) {
    filteredBlogPosts = posts.filter(post => post.featured == true);
  }
  return (
    <div className="primary mx-auto mt-4 space-y-6 py-5 sm:mt-10 sm:px-4">
      {filteredBlogPosts.map(post => (
        <PostCard
          key={post.title}
          title={post.title}
          url={`/posts/${post.slug}`}
          date={format(parseISO(post.publishDate), "yyyy/LL/dd")}
          summary={post.summary}
          showSummary={true}
        />
      ))}
    </div>
  );
};

export default PostsView;
