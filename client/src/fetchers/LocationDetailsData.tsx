import { FetchError } from '../types/GeneralTypes';
import type { locationData } from '../types/locationTypes';

export const locationDetailsData = async (locationID: string) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('_id', locationID);

  const response = await fetch(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/locations/details`,
    {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    },
  );

  if (response.ok) {
    const result: locationData = await response.json();
    return result;
  } else {
    // Attach extra info to the error object.
    const result = await response.json();
    // Create error
    const error: FetchError = new Error(
      'An error occurred while fetching the data.',
    );
    // Assign information returning from request to extended error
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
