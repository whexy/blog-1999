import { getSanityContent } from "@/lib/sanity";
import Prose from "@/components/Prose";
import Comment from "@/components/posts/Comment";
import License from "@/components/posts/License";
import { format, parseISO } from "date-fns";

export default async function BlogLayout({ children, params }) {
  const slug = params.slug;

  const data = await getSanityContent({
    query: `
            query BlogBySlug($slug: String!) { 
                allBlog(where: { slug: { current: { eq: $slug } } }) {
                    title
                    date
                }
            }`,
    variables: {
      slug: slug,
    },
  });

  const post = data.allBlog[0];

  return (
    <>
      <article className="pb-5 font-article sm:pt-10">
        <Prose>
          <h1>{post.title}</h1>
          <div className="-mt-5 flex items-center justify-between pb-5 font-sans text-sm font-light lg:text-base">
            <div className="inline-flex items-center space-x-1">
              <div>Wenxuan Shi / </div>
              <span>
                {format(parseISO(post.date), "MMMM dd, yyyy")}
              </span>
            </div>
          </div>
          {children}
          <License />
        </Prose>
      </article>
      <div className="pb-10">
        <Comment slug={slug} />
      </div>
    </>
  );
}
