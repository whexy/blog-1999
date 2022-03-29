import PostCard from "@/components/PostCard";
import { Blog } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { VFC } from "react";

export const PostsShowCase: VFC<{ posts: Blog[] }> = ({ posts }) => {
  return (
    <div className="space-y-2 sm:grid sm:grid-cols-3 sm:space-x-2 sm:space-y-0">
      {posts.map(post => (
        <PostCard
          key={post.slug}
          title={post.title}
          url={`/posts/${post.slug}`}
          image={post.image}
          summary={post.summary}
          date={format(parseISO(post.publishDate), "yyyy-LL-dd")}
        />
      ))}
    </div>
  );
};
