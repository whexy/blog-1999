"use client";

import Giscus from "@giscus/react";
// import { useSelector } from "react-redux";

import React from "react";
// import { AppState } from "@/store/store";

const Comment = ({ slug }: { slug: string }) => {
  // const darkMode = useSelector(
  //   (state: AppState) => state.theme.darkMode,
  // );
  // const theme = darkMode ? "dark" : "light";
  const theme = "light";
  return (
    <div className="mx-auto max-w-4xl px-2">
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
