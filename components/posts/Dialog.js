import { mdrender } from "../../lib/markdown";
import Image from "next/image";
import metadata from "../../data/metadata";
import avatar from "../../public/img/notion-avatar.svg";

export const Dialog = ({ content, children }) => {
  return (
    <div className="ml-4 not-prose flex justify-end items-center space-x">
      <div className="p-3 rounded bg-red-200/20 border border-red-200/80 font-serif">
        <inner
          dangerouslySetInnerHTML={{ __html: mdrender(content || children) }}
        />
      </div>
      <div className="flex-shrink-0">
        <Image
          src={avatar}
          alt={metadata.author.name}
          width={64}
          height={64}
          quality={100}
        />
      </div>
    </div>
  );
};

export const DialogBack = ({ content, children }) => {
  return (
    <div className="mr-4 not-prose flex justify-start items-center space-x">
      <div style={{ transform: `scale(-1, 1)` }} className="flex-shrink-0">
        <Image
          src={avatar}
          alt={metadata.author.name}
          width={64}
          height={64}
          quality={100}
        />
      </div>
      <div className="p-3 rounded bg-blue-200/20 border border-blue-200/80 font-serif">
        <inner
          dangerouslySetInnerHTML={{ __html: mdrender(content || children) }}
        />
      </div>
    </div>
  );
};
