import Image from "next/image";

const ImgComponent = ({ src, alt, width, height }) => {
  return (
    <div className="break-inside-avoid-page">
      <div className="grid place-items-center overflow-hidden rounded-lg dark:border dark:border-white/10">
        <Image
          src={`/${src}`}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
      {alt && (
        <div className="text-center font-sans text-sm font-light opacity-80 mt-2">
          {alt}
        </div>
      )}
    </div>
  );
};
export default ImgComponent;
