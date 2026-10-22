"use client";

import { useEffect } from "react";
import Giscus from "@giscus/react";
import { track } from "@/lib/analytics";

/** What the giscus iframe posts to this page. */
interface GiscusMessage {
  error?: string;
  discussion?: { totalCommentCount: number };
  viewer?: { login: string };
}

const Comment = ({ slug }: { slug: string }) => {
  // giscus has no "commented" message, but with emitMetadata it
  // re-posts the discussion whenever it changes; a rise in the
  // top-level count while signed in is the reader's own comment.
  // A signed-out reader's viewer is giscus's GitHub App
  // ("giscus[bot]"). Replies are not counted: totalReplyCount only
  // covers loaded pages and grows on "load more".
  useEffect(() => {
    let count: number | undefined;
    const onMessage = (
      e: MessageEvent<{ giscus?: GiscusMessage }>,
    ) => {
      if (e.origin !== "https://giscus.app") return;
      const message = e.data?.giscus;
      // A post's first comment creates its discussion.
      if (message?.error?.includes("Discussion not found")) count = 0;
      const total = message?.discussion?.totalCommentCount;
      if (total === undefined) return;
      const signedIn =
        message.viewer && !message.viewer.login.endsWith("[bot]");
      if (count !== undefined && total > count && signedIn) {
        track("comment", { slug });
      }
      count = total;
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [slug]);

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
        emitMetadata="1"
        loading="lazy"
      />
    </div>
  );
};

export default Comment;
