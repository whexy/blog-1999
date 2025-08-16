"use client";

import Giscus from "@giscus/react";
import React, { useEffect, useState } from "react";

const Comment = ({ slug }: { slug: string }) => {
  const [theme, setTheme] = useState("/giscus.css");

  useEffect(() => {
    // Set absolute URL once client-side
    setTheme(`${window.location.origin}/giscus.css`);

    const sendMessage = <T,>(message: T) => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        "iframe.giscus-frame",
      );
      if (!iframe) return;
      iframe.contentWindow?.postMessage(
        { giscus: message },
        "https://giscus.app",
      );
    };

    // Force update theme after iframe loads
    const timer = setTimeout(() => {
      sendMessage({
        setConfig: {
          theme: `${window.location.origin}/giscus.css`,
        },
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
        theme={theme}
      />
    </div>
  );
};

export default Comment;
