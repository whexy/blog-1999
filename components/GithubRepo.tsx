import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import fetcher from "@/lib/fetcher";
import { StarIcon, UserIcon } from "@heroicons/react/outline";

const GithubRepo = ({ repo }: { repo: string }) => {
  const RepoEndpoint = `https://api.github.com/repos/` + repo;
  const { data } = useSWR(RepoEndpoint, fetcher);
  const { name, description, html_url, owner, stargazers_count } =
    data;
  const { login, avatar_url } = owner;

  return (
    <div className="not-prose max-w-xl mx-auto">
      <Link href={html_url}>
        <a>
          <div className="p-4 secondbg border rounded-xl flex">
            <div className="grid place-items-center">
              <Image
                src={avatar_url}
                alt={login}
                height={100}
                width={100}
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-semibold text-lg">{name}</p>
                <p className="font-light text-sm">{description}</p>
              </div>
              <div className="flex space-x-4 text-sm">
                <div className="flex space-x-1 items-center">
                  <UserIcon className="w-4 h-4" />
                  <p>{login}</p>
                </div>
                <div className="flex space-x-1 items-center">
                  <StarIcon className="w-4 h-4" />
                  <p>{stargazers_count}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default GithubRepo;
