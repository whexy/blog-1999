import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { StarIcon, UserIcon } from "@heroicons/react/outline";

const GithubRepo = ({ repo }: { repo: string }) => {
  // should be a pure client rendered component
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getRepoData(repo: string) {
      const RepoEndpoint = `https://api.github.com/repos/` + repo;
      const res = await fetch(RepoEndpoint);
      const data = await res.json();

      // API hit
      if ("name" in data) {
        setData(data);
        setIsLoading(false);
        return;
      }

      // Fallback
      const FallbackRepoEndpoint =
        `https://whexy.com/api/github-repo/` + repo;
      const FallbackRes = await fetch(FallbackRepoEndpoint);
      const FallbackData = await FallbackRes.json();

      // Fallback hit
      if ("name" in FallbackData) {
        setData(FallbackData);
        setIsLoading(false);
        return;
      }
    }
    getRepoData(repo);
  }, [repo]);

  return (
    <div>
      {isLoading ? (
        <Link href={`https://github.com/${repo}`}>
          <a>{`https://github.com/${repo}`}</a>
        </Link>
      ) : (
        <div className="not-prose max-w-xl mx-auto">
          <Link href={data.html_url}>
            <a className="group">
              <div className="p-4 secondbg border rounded-xl flex space-x-4">
                <div className="flex-none grid place-items-center">
                  <Image
                    src={data.owner.avatar_url}
                    alt={data.owner.login}
                    height={60}
                    width={60}
                  />
                </div>
                <div className="flex flex-col justify-between space-y-1">
                  <div>
                    <p className="font-semibold text-lg group-hover:underline">
                      {data.name}
                    </p>
                    <p className="font-light text-sm">
                      {data.description}
                    </p>
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <div className="flex space-x-1 items-center">
                      <UserIcon className="w-4 h-4" />
                      <p>{data.owner.login}</p>
                    </div>
                    <div className="flex space-x-1 items-center">
                      <StarIcon className="w-4 h-4" />
                      <p>{data.stargazers_count}</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default GithubRepo;
