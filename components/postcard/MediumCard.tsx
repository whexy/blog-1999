import type { Blog } from "contentlayer/generated";
import Link from "next/link";
import { parseISO } from "date-fns";
import Image from "next/image";

const MediumCard = ({ blog }: { blog: Blog }) => {
  return (
    <div
      className={
        "primary group overflow-hidden transition-all hover:bg-gray-50"
      }
    >
      <Link href={`/posts/${blog.slug}`} scroll={true}>
        <div className={`justify-between`}>
          <div
            className={
              "relative h-[194px] overflow-hidden lg:h-[194px]"
            }
          >
            <Image
              src={`/head/${blog.slug}.png`}
              alt={blog.slug}
              width={1024}
              height={576}
              className="object-cover transition-all group-hover:scale-105"
            />
          </div>
          <div className="flex flex-shrink-0 flex-grow flex-col justify-between p-5">
            <div>
              <p className="text-xs font-bold text-[#6e6e73]">
                {blog.cat}
              </p>
              <h2 className="font-title text-2xl font-bold">
                {blog.title}
              </h2>
            </div>
            <div className="pt-2 text-sm font-semibold tracking-wide opacity-60">
              {parseISO(blog.publishDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MediumCard;
