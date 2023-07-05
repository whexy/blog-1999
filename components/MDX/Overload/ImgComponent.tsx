import Image from "next/image";

const ImgComponent = ({ src, alt, width, height }) => {
  return (
    <div className="not-prose break-inside-avoid-page">
      <Image
        src={`/${src}`}
        alt={alt}
        width={width}
        height={height}
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
