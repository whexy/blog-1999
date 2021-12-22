import Main from "../../components/Main";
import { getSortedPostsData } from "../../lib/posts";
import Link from "next/link";
import PostCard from "../../components/PostCard";

const PostPage = ({ postsData }) => {
  return (
    <Main>
      <PostView posts={postsData} />
    </Main>
  );
};

const PostView = ({ posts }) => {
  return (
    <div>
      <div className="pt-2 sm:pl-3 flex-1 flex-col space-y-5">
        {posts
          .filter((post) => post.hidden !== true)
          .map((post) => {
            post.url = `/posts/${post.id}`;
            return <PostCard {...post} key={post.id} />;
          })}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const postsData = getSortedPostsData();
  const allPosts = postsData;
  return {
    props: {
      postsData: allPosts,
    },
  };
}

export default PostPage;
