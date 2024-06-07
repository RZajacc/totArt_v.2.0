import { post } from '../types/types';

// Error interface to return more information from fetcher
interface FetchError extends Error {
  info?: any;
  status?: number;
}

export const locationDetails = async (locationID: string) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('id', locationID);

  const response = await fetch('http://localhost:5000/api/posts/details', {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: post = await response.json();
    return result;
  } else {
    // Attach extra info to the error object.
    const result = await response.json();
    // Create error
    const error = new Error(
      'An error occurred while fetching the data.',
    ) as FetchError;
    // Assign information returning from request to extended error
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
