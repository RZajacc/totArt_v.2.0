'use server';
// Types
import type { FetchError } from '@/types/GeneralTypes';
import { BuildFetchUrl } from '@/utils/BuildFetchUrl';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addNewLocation = async (
  title: string,
  description: string,
  location: string,
  imageId: string,
  author: string,
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('title', title);
  urlencoded.append('description', description);
  urlencoded.append('location', location);
  urlencoded.append('image', imageId);
  urlencoded.append('author', author);

  // Build Fetch url
  const FETCH_URL = BuildFetchUrl();

  const response = await fetch(`${FETCH_URL}/api/locations/addNewLocation`, {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    revalidatePath('/locations');
    redirect('/locations');
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Failed adding new location');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
