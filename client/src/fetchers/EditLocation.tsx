// Types
import type { FetchError } from '@/types/GeneralTypes';

export const editLocation = async (
  url: string,
  {
    arg,
  }: {
    arg: { locatinId: string; propertyName: string; updatedValue: string };
  },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('locationId', arg.locatinId);
  urlencoded.append('propertyName', arg.propertyName);
  urlencoded.append('updatedValue', arg.updatedValue);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: { msg: string } = await response.json();
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
