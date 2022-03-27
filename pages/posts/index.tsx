import AllPosts from "@/components/AllPosts";
import Main from "@/components/Main";
import PageTitle from "@/components/tiny/PageTitle";
import { allBlogs } from "contentlayer/generated";
import { pick } from "lodash";

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
  const posts = allBlogs.map(post =>
    pick(post, [
      "title",
      "slug",
      "image",
      "summary",
      "preview",
      "publishDate",
    ]),
  );
  return { props: { posts } };
}
