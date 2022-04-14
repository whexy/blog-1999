import Giscus from "@giscus/react";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

import React from "react";

const Comment = ({ slug }: { slug: string }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="mx-auto max-w-3xl px-2">
      <Giscus
        repo="whexy/whexy-blog-comments"
        repoId="R_kgDOGOIOyA"
        category="General"
        categoryId="DIC_kwDOGOIOyM4B_rnZ"
        mapping="specific"
        term={`posts/${slug}`}
        reactionsEnabled="0"
        emitMetadata="1"
        theme={theme}
      />
    </div>
  );
};

export default Comment;
