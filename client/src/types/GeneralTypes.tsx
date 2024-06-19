export interface FetchError extends Error {
  info?: any;
  status?: number;
}
