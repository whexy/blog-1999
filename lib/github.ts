export const getRepoData = async (repo: string) => {
  const github_token = process.env.GITHUB_TOKEN;
  const REPO_ENDPOINT = `https://api.github.com/repos`;

  try {
    const response = await fetch(`${REPO_ENDPOINT}/${repo}`, {
      headers: {
        Authorization: `token${github_token}`,
      },
    });

    if (response.status === 403) {
      const rateLimitRemaining = response.headers.get(
        "x-ratelimit-remaining",
      );
      const rateLimitReset = response.headers.get(
        "x-ratelimit-reset",
      );
      console.warn(
        `GitHub API rate limit exceeded for repo ${repo}. Remaining: ${rateLimitRemaining}, Reset: ${rateLimitReset}`,
      );
      return null;
    }

    if (response.status !== 200) {
      console.error(
        `GitHub API error for repo ${repo}: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(
      `Network error fetching repo data for ${repo}:`,
      error,
    );
    return null;
  }
};

export const getUserData = async (username: string) => {
  const github_token = process.env.GITHUB_TOKEN;
  const USER_ENDPOINT = `https://api.github.com/users`;

  try {
    const response = await fetch(`${USER_ENDPOINT}/${username}`, {
      headers: {
        Authorization: `token${github_token}`,
      },
    });

    if (response.status === 403) {
      const rateLimitRemaining = response.headers.get(
        "x-ratelimit-remaining",
      );
      const rateLimitReset = response.headers.get(
        "x-ratelimit-reset",
      );
      console.warn(
        `GitHub API rate limit exceeded for user ${username}. Remaining: ${rateLimitRemaining}, Reset: ${rateLimitReset}`,
      );
      return null;
    }

    if (response.status !== 200) {
      console.error(
        `GitHub API error for user ${username}: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(
      `Network error fetching user data for ${username}:`,
      error,
    );
    return null;
  }
};
