import Image from "@/components/Image99";

const ImgComponent = ({ src, alt, width, height }) => {
  return (
    <div className="break-inside-avoid-page">
      <div className="grid place-items-center overflow-hidden rounded-lg">
        <Image
          src={`/${src}`}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
      {alt && (
        <div className="mt-2 text-center font-sans text-sm font-light opacity-80">
          {alt}
        </div>
      )}
    </div>
  );
};
export default ImgComponent;
