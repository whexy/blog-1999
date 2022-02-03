import Image from "next/image";
import Link from "next/link";
import { StarIcon, UserIcon } from "@heroicons/react/outline";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import Skeleton from "@/components/Skeleton";
import { SkeletonTheme } from "react-loading-skeleton";

const GithubRepo = ({ repo }: { repo: string }) => {
  const html_url = `https://github.com/${repo}`;
  const username = repo.split("/")[0];
  const repo_name = repo.split("/")[1];

  // use www.whexy.com to forcibly use CDN
  const { data, error } = useSWR(`https://www.whexy.com/api/github-repo?repo=${repo}`, fetcher);

  // we need `data.owner.avatar_url`, `data.description`,
  // and `data.stargazers_count`

  return (
    <SkeletonTheme enableAnimation={!error}>
      <div className="not-prose max-w-xl mx-auto">
        <Link href={html_url}>
          <a>
            <div className="p-4 secondbg rounded-xl flex space-x-4">
              <div className="flex-none grid place-items-center">
                {data && data.owner ? (
                  <Image
                    src={data.owner.avatar_url}
                    alt={username}
                    height={60}
                    width={60}
                  />
                ) : (
                  <Skeleton height={60} width={60} />
                )}
              </div>
              <div className="flex flex-col justify-between space-y-1">
                <div>
                  <p className="font-semibold text-lg">
                    {repo_name}
                  </p>
                  <p className="font-light text-sm">
                    {(data && data.description) || <Skeleton />}
                  </p>
                </div>
                <div className="flex space-x-4 text-sm">
                  <div className="flex space-x-1 items-center">
                    <UserIcon className="w-4 h-4" />
                    <p>{username}</p>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <StarIcon className="w-4 h-4" />
                    <p>
                      {(data && data.stargazers_count) || (
                        <Skeleton width={10} />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </SkeletonTheme>
  );
};

export default GithubRepo;
