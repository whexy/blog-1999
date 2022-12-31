import WelcomeCard from "@/components/homepage/WelcomeCard";
import RecentPosts from "@/components/homepage/RecentPosts";
import { getSanityContent } from "@/lib/sanity";

export default async function Page() {
  const data = await getSanityContent({
    query: `
      query AllBlogs {
        allBlog(sort: [{ date: DESC }], limit: 5) {
          title
          slug {
            current
          }
          date
          excerpt
        }
      }`,
  });

  return (
    <>
      <WelcomeCard />
      <RecentPosts data={data} />
    </>
  );
}
