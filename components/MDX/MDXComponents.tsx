import React from "react";

import Callout from "@/components/MDX/Layouts/Callout";
import { Dialog, DialogBack } from "@/components/MDX/Layouts/Dialog";
import ImgComponent from "@/components/MDX/Overload/ImgComponent";
import CodeComponent from "@/components/MDX/Overload/CodeComponent";
import Diagram from "@/components/MDX/Layouts/Diagram";
import TypstDiagram from "@/components/MDX/Layouts/TypstDiagram";
import QuoteComponent from "@/components/MDX/Layouts/QuoteComponent";
import Small from "@/components/MDX/Layouts/Small";
import GithubRepo from "@/components/MDX/Extern/GithubRepo";
import Bilibili from "@/components/MDX/Extern/Bilibili";
import Tweet from "@/components/MDX/Extern/Tweet";
import Spotify from "@/components/MDX/Extern/Spotify";
import AppleMusic from "@/components/MDX/Extern/AppleMusic";
import Food from "@/components/MDX/Extern/Food";
import Lyric from "@/components/Widgets/Lyric";

// Special Components
import Depth3D from "@/components/UI/Animation/Depth3D";
import Twemoji from "@/components/UI/Graphic/Twemoji";

import { createSlugger } from "@/lib/slug";

const staticComponents = {
  img: ImgComponent,
  pre: CodeComponent,
  Quote: QuoteComponent,
  Small,
  Callout,
  Diagram,
  TypstDiagram,
  Dialog,
  DialogBack,
  GithubRepo,
  Bilibili,
  AnimatedFancyCard: Depth3D,
  Twemoji,
  Tweet,
  Spotify,
  Lyric,
  AppleMusic,
  Food,
};

/** Flatten React children into plain text for slug generation. */
function childrenToText(children: React.ReactNode): string {
  let out = "";
  React.Children.forEach(children, child => {
    if (typeof child === "string" || typeof child === "number") {
      out += child;
    } else if (React.isValidElement(child)) {
      out += childrenToText(
        (child.props as { children?: React.ReactNode })?.children,
      );
    }
  });
  return out;
}

type HeadingProps = React.ComponentPropsWithoutRef<"h2">;

/**
 * Build a fresh MDX components map for a single post render.
 *
 * Each render gets its own slugger so heading anchor ids are
 * de-duplicated in document order, staying in lockstep with
 * lib/toc.ts (which slugs every heading level in the same order).
 * `scroll-mt-24` offsets the sticky site header on jump.
 */
export function createMDXComponents() {
  const slug = createSlugger();

  const makeHeading = (
    Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  ) => {
    const Heading = ({ children, ...props }: HeadingProps) => {
      const id = slug(childrenToText(children));
      return (
        <Tag id={id} className="scroll-mt-24" {...props}>
          {children}
        </Tag>
      );
    };
    Heading.displayName = `MDX(${Tag})`;
    return Heading;
  };

  return {
    ...staticComponents,
    h1: makeHeading("h1"),
    h2: makeHeading("h2"),
    h3: makeHeading("h3"),
    h4: makeHeading("h4"),
    h5: makeHeading("h5"),
    h6: makeHeading("h6"),
  };
}
