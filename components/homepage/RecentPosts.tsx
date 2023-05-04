import { parseISO, compareDesc } from "date-fns";
import type { Blog } from "contentlayer/generated";
import { allBlogs } from "contentlayer/generated";
import BigCard from "@/components/postcard/BigCard";
import MediumCard from "@/components/postcard/MediumCard";

const RecentPosts = () => {
  const posts: Blog[] = allBlogs;

  const recentPosts = posts
    .sort((p1, p2) =>
      compareDesc(parseISO(p1.publishDate), parseISO(p2.publishDate)),
    )
    .slice(0, 3);
  const featuredPosts = posts
    .sort((p1, p2) =>
      compareDesc(parseISO(p1.publishDate), parseISO(p2.publishDate)),
    )
    .filter(post => post.featured);
  return (
    <div className="sm:px-1">
      <div className="py-5">
        <div className="primary divide-y divide-black/10 overflow-hidden">
          {featuredPosts.map(post => (
            <BigCard blog={post} key={post.slug} />
          ))}
        </div>
      </div>
      <div className="py-5">
        <div className="grid gap-10 lg:grid-cols-3">
          {recentPosts.map(post => (
            <MediumCard blog={post} key={post.slug} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
