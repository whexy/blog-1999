import Image from "next/image";
import { readFileSync } from "fs";
import sizeOf from "image-size";

const ImgComponent = ({ src, alt }) => {
  const buffer = readFileSync(`public/${src}`);
  const dimensions = sizeOf(buffer);

  return (
    <div className="not-prose break-inside-avoid-page">
      <Image
        src={`/${src}`}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className="mx-auto rounded-lg"
      />
      {alt && (
        <p className="pt-2 text-center font-sans text-sm opacity-80">
          {alt}
        </p>
      )}
    </div>
  );
};
export default ImgComponent;
