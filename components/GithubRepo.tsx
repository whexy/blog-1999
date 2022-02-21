import Image from "next/image";
import Link from "next/link";
import { StarIcon, UserIcon } from "@heroicons/react/outline";
import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/fetcher";
import Skeleton from "@/components/Skeleton";
import { SkeletonTheme } from "react-loading-skeleton";

const GithubRepo = ({ repo }: { repo: string }) => {
  const html_url = `https://github.com/${repo}`;
  const username = repo.split("/")[0];
  const repo_name = repo.split("/")[1];

  const { data, error } = useSWRImmutable(
    `/api/github-repo?repo=${repo}`,
    fetcher,
  );

  // we need `data.owner.avatar_url`, `data.description`,
  // and `data.stargazers_count`

  return (
    <SkeletonTheme enableAnimation={!error}>
      <div className="not-prose mx-auto max-w-xl font-sans">
        <Link href={html_url}>
          <a>
            <div className="secondbg flex space-x-4 rounded-xl p-4">
              <div className="grid flex-none place-items-center">
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
                  <p className="text-lg font-semibold">{repo_name}</p>
                  <p className="text-sm font-light">
                    {(data && data.description) || <Skeleton />}
                  </p>
                </div>
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <UserIcon className="h-4 w-4" />
                    <p>{username}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4" />
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
