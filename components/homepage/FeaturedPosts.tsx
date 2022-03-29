import { Blog } from "contentlayer/generated";
import { parseISO, compareDesc } from "date-fns";
import { PostsShowCase } from "@/components/PostsShowCase";

const FeaturedPosts = ({ posts }: { posts: Blog[] }) => {
  const featuredPosts = posts
    .sort((p1, p2) =>
      compareDesc(parseISO(p1.publishDate), parseISO(p2.publishDate)),
    )
    .filter(p => p.featured);
  return (
    <div className="py-5">
      <div className="flex items-center justify-between">
        <h2 className="pb-2 font-title text-xl font-bold">
          Featured Posts
        </h2>
        {/* <Link href="/posts">
          <a className="py-2 font-mono text-red-500 underline">
            {">>> All Posts"}
          </a>
        </Link> */}
      </div>
      <PostsShowCase posts={featuredPosts} />
    </div>
  );
};

export default FeaturedPosts;
