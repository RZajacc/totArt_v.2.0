'use server';
// Types
import type { FetchError } from '@/types/GeneralTypes';
import { BuildFetchUrl } from '@/utils/BuildFetchUrl';
import { revalidatePath } from 'next/cache';

export const editLocation = async (
  locationId: string,
  title: string,
  description: string,
  location: string,
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('locationId', locationId);
  urlencoded.append('title', title);
  urlencoded.append('description', description);
  urlencoded.append('location', location);

  // Build Fetch url
  const FETCH_URL = BuildFetchUrl();

  const response = await fetch(`${FETCH_URL}/api/locations/updateLocation`, {
    method: 'PATCH',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: { msg: string } = await response.json();
    revalidatePath('/locations', 'layout');
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
