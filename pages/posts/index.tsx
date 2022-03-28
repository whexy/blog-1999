import AllPosts from "@/components/AllPosts";
import Main from "@/components/Main";
import PageTitle from "@/components/tiny/PageTitle";
import { allBlogs } from "contentlayer/generated";
import { pick } from "lodash";
import { parseISO, compareDesc } from "date-fns";

const PostsView = ({ posts }) => {
  return (
    <Main>
      <PageTitle title="Posts" emoji="📝" />
      <AllPosts posts={posts} />
    </Main>
  );
};

export default PostsView;

export async function getStaticProps() {
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
      ]),
    )
    .sort((p1, p2) =>
      compareDesc(parseISO(p1.publishDate), parseISO(p2.publishDate)),
    );
  return { props: { posts } };
}
