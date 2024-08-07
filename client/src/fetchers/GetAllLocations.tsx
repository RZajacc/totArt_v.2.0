import { FetchError } from '../types/GeneralTypes';
import type { locationData } from '../types/locationTypes';

export const getAllLocations = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
  });

  if (response.ok) {
    const data: { number: number; locations: locationData[] } =
      await response.json();
    return data;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Locations cannot be found');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
