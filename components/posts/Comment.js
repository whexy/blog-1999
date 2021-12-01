import { Giscus } from "@giscus/react";

export default function Comment() {
  return (
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
    // <div>
    //   <script
    //     src="https://giscus.app/client.js"
    //     data-repo="whexy/whexy-blog-comments"
    //     data-repo-id="R_kgDOGOIOyA"
    //     data-category="General"
    //     data-category-id="DIC_kwDOGOIOyM4B_rnZ"
    //     data-mapping="pathname"
    //     data-reactions-enabled="0"
    //     data-emit-metadata="1"
    //     data-theme="light"
    //     data-lang="en"
    //     crossOrigin="anonymous"
    //     async
    //   ></script>
    // </div>
  );
}
