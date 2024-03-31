import twemoji from "msemoji";

const Twemoji = ({ emoji }) => (
  <span
    className="not-prose"
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        folder: "Color",
        ext: ".svg",
      }) as unknown as string,
    }}
  />
);

export default Twemoji;
