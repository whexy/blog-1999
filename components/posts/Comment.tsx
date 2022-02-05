import { Giscus } from "@giscus/react";
import { toLightTheme, toDarkTheme } from "@/lib/Giscus";
import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../pages/_app";

import type { GiscusProps } from "@giscus/react";
import type { VFC } from "react";

// High speed Giscus Component
// 1. Identify the component with blog slug
// 2. Only refresh at slug change
// 3. Use sendMessage to change state

interface GiscusPropsWithSlug extends GiscusProps {
  slug: string;
}

const GiscusWithSlug: VFC<GiscusPropsWithSlug> = props => {
  return <Giscus {...props} />;
};

const MemoGiscus = React.memo(
  GiscusWithSlug,
  (
    prevProps: GiscusPropsWithSlug,
    nextProps: GiscusPropsWithSlug,
  ) => {
    return prevProps.slug === nextProps.slug;
  },
);

const Comment = ({ slug }: { slug: string }) => {
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);

  const revalidateTheme = theme => {
    if (theme === "light") {
      toLightTheme();
    } else {
      toDarkTheme();
    }
  };

  // Dynamically change the theme when context change
  useEffect(() => {
    if (!isLoading) revalidateTheme(theme);
  }, [theme, isLoading]);

  // Receive Message from Giscus
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== "https://giscus.app") return;
      if (!(typeof event.data === "object" && event.data.giscus))
        return;

      // remove listener to prevent dead loop
      window.removeEventListener("message", handleMessage);

      // Dynamically change the theme when load success
      if (isLoading) {
        setIsLoading(false);
        revalidateTheme(theme);
      }

      //   const giscusData = event.data.giscus;
      //   console.log(giscusData);
      // expecting, e.g. by using `if ('discussion' in giscusData)`.
    }
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  });

  return (
    <div className="mx-auto max-w-3xl px-2">
      <MemoGiscus
        slug={slug}
        repo="whexy/whexy-blog-comments"
        repoId="R_kgDOGOIOyA"
        category="General"
        categoryId="DIC_kwDOGOIOyM4B_rnZ"
        mapping="pathname"
        reactionsEnabled="0"
        emitMetadata="1"
        theme={theme} // First load with correct current theme
      />
    </div>
  );
};

export default Comment;
