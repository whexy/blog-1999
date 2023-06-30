export const getRepoData = async (repo: string) => {
  const github_token = process.env.GITHUB_TOKEN;
  const REPO_ENDPOINT = `https://api.github.com/repos`;
  const response = await fetch(`${REPO_ENDPOINT}/${repo}`, {
    headers: {
      Authorization: `token${github_token}`,
    },
  });
  if (response.status !== 200) {
    return null;
  }
  return response.json();
};

export const getUserData = async (username: string) => {
  const github_token = process.env.GITHUB_TOKEN;
  const USER_ENDPOINT = `https://api.github.com/users`;
  const response = await fetch(`${USER_ENDPOINT}/${username}`, {
    headers: {
      Authorization: `token${github_token}`,
    },
  });
  if (response.status !== 200) {
    return null;
  }
  return response.json();
};
