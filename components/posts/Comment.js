import { Giscus } from "@giscus/react";
const Comment = () => {
  return (
    <div className="max-w-4xl py-5 px-2 sm:px-5 secondbg border mx-auto text-black-readable dark:text-white-readable rounded-lg">
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
    </div>
  );
};

export default Comment;
