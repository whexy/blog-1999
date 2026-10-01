/**
 * Minimal GitHub REST client used by the MDX `<GithubRepo>` embed.
 *
 * Requests are authenticated when `GITHUB_TOKEN` is set (5,000 req/h
 * instead of the anonymous 60 req/h, which a full static build can
 * exhaust). Every helper returns `null` on any failure so a flaky API
 * never breaks the build; callers render a fallback instead.
 */

const apiBase = "https://api.github.com";

/** The subset of `GET /repos/{owner}/{repo}` the blog renders. */
export interface GithubRepoInfo {
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    avatar_url: string;
  };
}

/** `GET /repos/{owner}/{repo}/languages`: language -> bytes. */
export type GithubLanguages = Record<string, number>;

/** Set once GitHub rejects GITHUB_TOKEN, to stop sending it. */
let tokenRejected = false;

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token && !tokenRejected) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

/**
 * GET a GitHub API path and parse the JSON body. Logs and returns
 * `null` on rate limiting, other HTTP errors and network failures.
 */
async function githubGet<T>(apiPath: string): Promise<T | null> {
  try {
    const url = `${apiBase}${apiPath}`;
    const headers = githubHeaders();
    let response = await fetch(url, { headers });

    // An invalid/expired token makes every request 401, even for
    // public repos; retry (and continue) anonymously instead.
    if (response.status === 401 && "Authorization" in headers) {
      if (!tokenRejected) {
        tokenRejected = true;
        console.warn(
          "GitHub rejected GITHUB_TOKEN (401); " +
            "falling back to unauthenticated requests.",
        );
      }
      response = await fetch(url, { headers: githubHeaders() });
    }

    if (response.ok) return (await response.json()) as T;

    const remaining = response.headers.get("x-ratelimit-remaining");
    if (
      response.status === 429 ||
      (response.status === 403 && remaining === "0")
    ) {
      const reset = response.headers.get("x-ratelimit-reset");
      console.warn(
        `GitHub API rate limit exceeded for ${apiPath}. ` +
          `Remaining: ${remaining}, Reset: ${reset}` +
          (process.env.GITHUB_TOKEN
            ? ""
            : " (set GITHUB_TOKEN to raise the limit)"),
      );
      return null;
    }

    console.error(
      `GitHub API error for ${apiPath}: ` +
        `${response.status} ${response.statusText}`,
    );
    return null;
  } catch (error) {
    console.error(`Network error fetching ${apiPath}:`, error);
    return null;
  }
}

export const getRepoData = (repo: string) =>
  githubGet<GithubRepoInfo>(`/repos/${repo}`);

export const getRepoLanguages = (repo: string) =>
  githubGet<GithubLanguages>(`/repos/${repo}/languages`);
