import { Giscus } from "@giscus/react";
const Comment = () => {
  return (
    <div>
      <div className="max-w-3xl py-5 mb-5 px-2 sm:px-5 secondbg border mx-auto text-black-readable dark:text-white-readable print:hidden">
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
      <div className="text-[0px] opacity-0">Wish you happy</div>
    </div>
  );
};

export default Comment;
