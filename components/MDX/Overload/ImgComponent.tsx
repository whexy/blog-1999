import Image from "next/image";
import { existsSync, readFileSync } from "fs";
import path from "path";
import sizeOf from "image-size";

interface ImgComponentProps {
  /** `images/foo.png` (under public/) or an absolute http(s) URL. */
  src?: string;
  alt?: string;
}

const Caption = ({ alt }: { alt?: string }) =>
  alt ? (
    <p className="pt-2 text-center font-sans text-sm opacity-80">
      {alt}
    </p>
  ) : null;

const ImgComponent = ({ src = "", alt = "" }: ImgComponentProps) => {
  // Remote images: we can't size them at build time and their host
  // may not be in next.config's remotePatterns, so render as-is.
  if (/^https?:\/\//i.test(src)) {
    return (
      <div className="not-prose break-inside-avoid-page">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="mx-auto h-auto max-w-full rounded-lg"
        />
        <Caption alt={alt} />
      </div>
    );
  }

  const publicPath = src.replace(/^\/+/, "");
  const file = path.join(
    /*turbopackIgnore: true*/ process.cwd(),
    "public",
    publicPath,
  );
  if (!existsSync(file)) {
    throw new Error(
      `MDX image "${src}" not found: expected ${file}. ` +
        `Local image paths are resolved relative to public/.`,
    );
  }
  const { width, height } = sizeOf(readFileSync(file));

  return (
    <div className="not-prose break-inside-avoid-page">
      <Image
        src={`/${publicPath}`}
        alt={alt}
        width={width}
        height={height}
        className="mx-auto rounded-lg"
      />
      <Caption alt={alt} />
    </div>
  );
};

export default ImgComponent;
