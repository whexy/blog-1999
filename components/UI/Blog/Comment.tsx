"use client";

import Giscus from "@giscus/react";

const Comment = ({ slug }: { slug: string }) => {
  return (
    <div className="mx-auto max-w-full px-2">
      <Giscus
        repo="whexy/whexy-blog-comments"
        repoId="R_kgDOGOIOyA"
        category="General"
        categoryId="DIC_kwDOGOIOyM4B_rnZ"
        mapping="specific"
        term={`posts/${slug}`}
        reactionsEnabled="0"
        loading="lazy"
      />
    </div>
  );
};

export default Comment;
