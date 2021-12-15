import { mdrender } from "../../lib/markdown";
import Image from "next/image";
import metadata from "../../data/metadata";
import avatar from "../../public/img/notion-avatar.svg";
export default function Dialog({ content }) {
  return (
    <div className="ml-4 not-prose flex justify-end items-center space-x">
      <div className="p-3 rounded bg-red-200/20 border border-red-200/80 font-serif">
        <inner dangerouslySetInnerHTML={{ __html: mdrender(content) }} />
      </div>
      <Image
        className="text-red-500"
        src={avatar}
        alt={metadata.author.name}
        width={64}
        height={64}
      />
    </div>
  );
}
