import NextImage from "next/image";
import { StarIcon } from "@heroicons/react/24/outline";
import {
  CodiconIssues,
  IconoirGitFork,
} from "@/components/UI/Graphic/icons/Github";
import GithubLangBar from "@/components/MDX/Extern/GithubLangBar";
import { getRepoData } from "@/lib/github";

const githubMark =
  "M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z";

interface GithubRepoProps {
  repo: string;
}

const GithubRepo = async ({ repo }: GithubRepoProps) => {
  const [username, repoName] = repo.split("/");
  const info = await getRepoData(repo);
  const available = Boolean(info?.owner);

  const stats = [
    { Icon: StarIcon, label: "Stars", value: info?.stargazers_count },
    {
      Icon: IconoirGitFork,
      label: "Forks",
      value: info?.forks_count,
    },
    {
      Icon: CodiconIssues,
      label: "Open issues",
      value: info?.open_issues_count,
    },
  ];

  return (
    <div
      className={`not-prose mx-auto max-w-xl font-sans transition-all duration-200 ${
        available ? "sm:hover:scale-[1.02]" : ""
      }`}>
      <a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="secondbg block overflow-hidden rounded-xl">
        <div className="flex space-x-4 p-4">
          <div className="grid flex-none place-items-center">
            {available ? (
              <NextImage
                src={info.owner.avatar_url}
                className="overflow-hidden rounded-full"
                alt={username}
                height={60}
                width={60}
              />
            ) : (
              <div className="flex h-15 w-15 items-center justify-center overflow-hidden rounded-full bg-neutral-200">
                <svg
                  className="h-8 w-8 text-neutral-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d={githubMark}
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between space-y-1">
            <div>
              <p className="text-lg">
                {username}/
                <span className="font-semibold">{repoName}</span>
              </p>
              {available ? (
                info.description && (
                  <p className="text-sm">{info.description}</p>
                )
              ) : (
                <p className="text-sm text-neutral-500">
                  Repository information unavailable
                </p>
              )}
            </div>
            <div
              className={`flex space-x-4 text-sm ${
                available ? "" : "text-neutral-400"
              }`}>
              {stats.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center space-x-1"
                  title={label}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <p>
                    <span className="sr-only">{label}: </span>
                    {available ? value : "-"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {available && <GithubLangBar repo={repo} />}
      </a>
    </div>
  );
};

export default GithubRepo;
