import Link from "next/link";
import Image from "next/image";

export default function PostCard({
  title,
  url,
  image,
  summary,
  date,
}) {
  return (
    <div>
      <Link href={url ? url : "/"}>
        <a>
          <div className="secondbg flex h-full flex-col -space-y-1 rounded-xl p-4 transition-all">
            <div className="pb-1 text-sm font-light tracking-wide text-red-600 dark:text-red-500">
              <span>{date}</span>
            </div>
            <p className="text-lg hover:underline">{title}</p>
            <div className="flex flex-col-reverse pt-2">
              <div className="text-sm font-light opacity-80">
                <p>{summary}</p>
              </div>
              {image && (
                <div className="grid w-full shrink-0 place-content-center object-cover pb-2">
                  <Image
                    src={`/${image}`}
                    alt="Cover"
                    height={200}
                    width={400}
                    className="h-auto w-full rounded-xl"
                  />
                </div>
              )}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
