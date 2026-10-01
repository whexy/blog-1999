interface DiagramProps {
  /** Path under public/, without a leading slash. */
  src: string;
  alt?: string;
  width?: string | number;
}

const Diagram = ({ src, alt, width = "100%" }: DiagramProps) => {
  return (
    <div>
      <object
        width={width}
        data={`/${src}`}
        type="image/svg+xml"
        title={alt}
        className="mx-auto"
        style={{ maxWidth: "100%" }}></object>
      {alt && (
        <div className="text-center font-sans text-sm opacity-80">
          {alt}
        </div>
      )}
    </div>
  );
};

export default Diagram;
