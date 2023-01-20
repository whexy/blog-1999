export async function getSanityContent({ query, variables = {} }) {
  const resp = await fetch(
    "https://tfex99hh.api.sanity.io/v1/graphql/production/default",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    },
  );
  const { data } = await resp.json();
  return data;
}
