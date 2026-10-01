import twemoji from "msemoji";

interface TwemojiProps {
  emoji: string;
}

const Twemoji = ({ emoji }: TwemojiProps) => (
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
