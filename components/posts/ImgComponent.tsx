const ImgComponent = ({ src, alt }) => {
  return (
    <div className="break-inside-avoid-page">
      <div className="grid place-items-center overflow-hidden rounded-lg">
        <img
          src={`https://whexy-blog-1999-images.s3.us-east-2.amazonaws.com/${src}`}
          alt={alt}
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
