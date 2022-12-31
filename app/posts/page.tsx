import Main from "@/components/Main";
import { getSanityContent } from "@/lib/sanity";
import PostCard from "@/components/PostCard";
import { format, parseISO } from "date-fns";
import PageTitle from "@/components/tiny/PageTitle";

export default async function Page() {
  const data = await getSanityContent({
    query: `
      query AllBlogs {
        allBlog(sort: [{ date: DESC }]) {
          title
          slug {
            current
          }
          date
          excerpt
        }
      }`,
  });

  const blogs = data.allBlog.map(blog => ({
    title: blog.title,
    slug: blog.slug.current,
    date: blog.date,
    excerpt: blog.excerpt,
  }));

  return (
    <Main>
      <PageTitle title="Posts" emoji="📝" />
      <div className="pb-10">
        <div className="primary mx-auto mt-4 max-w-3xl space-y-6 py-5 sm:mt-10 sm:px-4">
          {blogs.map(blog => (
            <PostCard
              key={blog.slug}
              title={blog.title}
              url={`/posts/${blog.slug}`}
              date={format(parseISO(blog.date), "yyyy/LL/dd")}
              summary={blog.excerpt}
              showSummary={true}
            ></PostCard>
          ))}
        </div>
      </div>
    </Main>
  );
}
