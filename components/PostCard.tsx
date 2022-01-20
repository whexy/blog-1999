import Link from "next/link";
import Image from "next/image";

export default function PostCard({
  title,
  url,
  image,
  summary,
  preview,
  vol,
}) {
  return (
    <div>
      <Link href={url ? url : "/"}>
        <a>
          <div className="flex flex-col -space-y-1 secondbg border transition-all rounded-xl p-4">
            <div className="text-sm tracking-wide text-red-600 dark:text-red-500 font-light pb-1">
              <span>VOL.{vol}</span>
            </div>
            <div className="flex space-x-2 items-center">
              <p className="text-lg hover:underline">{title}</p>
              {preview && (
                <div className="bg-yellow-600 text-white-readable px-2 rounded text-sm">
                  PREVIEW
                </div>
              )}
            </div>
            <div className="pt-2 flex flex-col-reverse sm:space-x-2 sm:flex-row">
              <div className="text-sm text-gray-700 dark:text-jbgray-light font-light">
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
