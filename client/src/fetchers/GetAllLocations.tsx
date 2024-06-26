import { FetchError } from '../types/GeneralTypes';
import { locationType } from '../types/LocationTypes';

export const getAllLocations = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
  });

  if (response.ok) {
    const data: { number: number; locations: locationType[] } =
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
