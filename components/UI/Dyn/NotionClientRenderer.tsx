"use client";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";
import Link from "next/link";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(m => m.Code),
);
import { Collection } from "react-notion-x/build/third-party/collection";
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then(
    m => m.Equation,
  ),
);
const Modal = dynamic(
  () =>
    import("react-notion-x/build/third-party/modal").then(
      m => m.Modal,
    ),
  {
    ssr: false,
  },
);

interface NotionImageWrapperProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const NotionImageWrapper = ({
  src,
  alt,
  className,
  style,
}: NotionImageWrapperProps) => {
  // In my CloudFront settings, /notion-img?url=<img_url> is cached.
  // Inline data: URLs need no proxying.
  const imageSrc = src?.startsWith("data:")
    ? src
    : "/notion-img?url=" + encodeURIComponent(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      style={style}
      src={imageSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
};

// react-notion-x passes className ("notion-page-link", ...),
// style, etc.; forward everything to next/link.
const NotionPageLink = ({
  href,
  children,
  ...rest
}: React.ComponentProps<typeof Link>) => (
  <Link href={href} {...rest}>
    {children}
  </Link>
);

type RenderProps = React.ComponentProps<typeof NotionRenderer>;

export default function NotionClientRenderer(props: RenderProps) {
  return (
    <NotionRenderer
      mapPageUrl={pageId => `/dyn/${pageId}`}
      forceCustomImages={true}
      components={{
        nextImage: NotionImageWrapper,
        Code,
        Collection,
        Equation,
        Modal,
        PageLink: NotionPageLink,
      }}
      {...props}
    />
  );
}
