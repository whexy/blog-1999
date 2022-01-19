import Image from "next/image";
const ImgComponent = ({ src, alt, width, height, blurDataURL }) => {
  return (
    <div className="break-inside-avoid-page">
      <div className="grid place-items-center overflow-hidden rounded-lg dark:border dark:border-white/10">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      {alt && (
        <div className="text-center font-light text-jbgray-light text-sm">
          {alt}
        </div>
      )}
    </div>
  );
};
export default ImgComponent;
