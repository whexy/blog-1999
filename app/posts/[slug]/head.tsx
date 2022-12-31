import { getSanityContent } from "@/lib/sanity";

export default async function BlogHead({ params }) {
  const slug = params.slug;

  const data = await getSanityContent({
    query: `
            query BlogBySlug($slug: String!) { 
                allBlog(where: { slug: { current: { eq: $slug } } }) {
                    title
                }
            }`,
    variables: {
      slug: slug,
    },
  });

  const post = data.allBlog[0];

  return (
    <>
      <title>{post.title}</title>
    </>
  );
}
