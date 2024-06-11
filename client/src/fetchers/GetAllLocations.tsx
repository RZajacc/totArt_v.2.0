import { FetchError, contentData } from '../types/types';

type ErrRes = {
  msg: string;
};

export const getAllLocations = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
  });

  if (response.ok) {
    const data: contentData = await response.json();
    return data;
  } else {
    const result: ErrRes = await response.json();
    const error: FetchError = new Error('Locations cannot be found');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
