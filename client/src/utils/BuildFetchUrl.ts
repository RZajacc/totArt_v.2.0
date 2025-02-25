export const BuildFetchUrl = () => {
  // Pick url depending if component is SSR or CSR (important for docker only)
  const FETCH_URL =
    process.env.API_URL_SERVER || process.env.NEXT_PUBLIC_API_URL;

  return FETCH_URL;
};
