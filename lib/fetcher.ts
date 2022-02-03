class APIError extends Error {
  status: number;
  info: unknown;
}

export default async function fetcher(input, init) {
  const res = await fetch(input, init);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new APIError(
      "An error occurred while fetching the data.",
    );
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}
