import { memo } from "react";
import twemoji from "twemoji";

const Twemoji = ({ emoji }) => (
  <span
    className="not-prose"
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        folder: "svg",
        ext: ".svg",
      }) as unknown as string,
    }}
  />
);

export default memo(Twemoji);
