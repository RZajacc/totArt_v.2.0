export const BuildFetchUrl = () => {
  // Define if local or remote URL should be used (Remote is necessary for production only)
  const LOCAL_URL = process.env.NEXT_PUBLIC_API_URL;
  const REMOTE_URL = process.env.NEXT_PUBLIC_REMOTE_API_URL;

  // Build fetch URL
  const FETCH_URL =
    process.env.NODE_ENV === 'development' ? LOCAL_URL : REMOTE_URL;
  return FETCH_URL;
};
