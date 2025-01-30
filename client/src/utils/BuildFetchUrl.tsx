export const BuildFetchUrl = () => {
  // Pick url depending if component is SSR or CSR (important for docker only)
  const LOCAL_URL =
    process.env.API_URL_SERVER || process.env.NEXT_PUBLIC_API_URL;
  // Remote URL for deployed version
  const REMOTE_URL = process.env.NEXT_PUBLIC_REMOTE_API_URL;

  // Build fetch URL
  const FETCH_URL =
    process.env.NODE_ENV === 'development' ? LOCAL_URL : REMOTE_URL;
  return FETCH_URL;
};
