import Link from "next/link";
import Image from "next/image";

export default function PostCard({
  title,
  url,
  image,
  summary,
  vol,
}) {
  return (
    <div>
      <Link href={url ? url : "/"}>
        <a>
          <div className="flex flex-col -space-y-1 secondbg transition-all rounded-xl p-4">
            <div className="text-sm tracking-wide text-red-600 dark:text-red-500 font-light pb-1">
              <span>VOL.{vol}</span>
            </div>
            <p className="text-lg hover:underline">{title}</p>
            <div className="pt-2 flex flex-col-reverse sm:space-x-2 sm:flex-row">
              <div className="text-sm opacity-80 font-light">
                <p>{summary}</p>
              </div>
              {image && (
                <div className="shrink-0 w-full sm:w-1/3 grid place-content-center object-cover pb-2">
                  <Image
                    src={image}
                    alt="Cover"
                    height={200}
                    width={400}
                    className="rounded-xl w-full h-auto"
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
