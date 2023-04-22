import type { Blog } from "contentlayer/generated";
import Link from "next/link";
import { parseISO } from "date-fns";
import Image from "next/image";

const BigCard = ({
  blog,
  vertical = false,
}: {
  blog: Blog;
  vertical?: boolean;
}) => {
  return (
    <div
      className={
        "group overflow-hidden rounded-2xl bg-white transition-all hover:bg-gray-50"
      }
    >
      <Link href={`/posts/${blog.slug}`}>
        <div className={`justify-between ${vertical || "lg:flex"}`}>
          <div
            className={`relative overflow-hidden ${
              vertical && "h-[194px] lg:h-[194px]"
            }`}
          >
            <Image
              src={`/head/${blog.slug}.png`}
              alt={blog.slug}
              width={3860}
              height={2160}
              className="object-cover transition-all group-hover:scale-105"
            />
          </div>
          <div className="flex flex-shrink-0 flex-grow flex-col justify-between p-8">
            <div>
              <p className="text-xs font-bold text-[#6e6e73]">
                {blog.cat}
              </p>
              <h2
                className={`font-bold ${
                  vertical ? "text-2xl" : "text-[32px]"
                }`}
              >
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

export default BigCard;
