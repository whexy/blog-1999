import { Giscus } from "@giscus/react";
const Comment = () => {
  return (
    <>
      <div className="dark:hidden">
        <Giscus
          repo="whexy/whexy-blog-comments"
          repoId="R_kgDOGOIOyA"
          category="General"
          categoryId="DIC_kwDOGOIOyM4B_rnZ"
          mapping="pathname"
          reactionsEnabled="0"
          emitMetadata="1"
          theme="light"
        />
      </div>
      <div className="hidden dark:block">
        <Giscus
          repo="whexy/whexy-blog-comments"
          repoId="R_kgDOGOIOyA"
          category="General"
          categoryId="DIC_kwDOGOIOyM4B_rnZ"
          mapping="pathname"
          reactionsEnabled="0"
          emitMetadata="1"
          theme="dark"
        />
      </div>
    </>
  );
};

export default Comment;
