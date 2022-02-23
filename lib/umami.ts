const username = process.env.UMAMI_USERNAME;
const password = process.env.UMAMI_PASSWORD;

const getAccessToken = async () => {
  const response = await fetch(
    "https://tc.shiwx.org/api/auth/login",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    },
  );

  return response.json();
};

export const getVisitors = async (
  start_at: string,
  end_at: string,
) => {
  const { token } = await getAccessToken();
  const response = await fetch(
    `https://tc.shiwx.org/api/website/1/stats?start_at=${start_at}&end_at=${end_at}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
};
