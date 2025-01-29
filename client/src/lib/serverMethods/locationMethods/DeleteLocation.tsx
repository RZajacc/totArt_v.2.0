'use server';
// Types
import type { FetchError } from '@/types/GeneralTypes';
import { BuildFetchUrl } from '@/utils/BuildFetchUrl';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const DeleteLocation = async (
  imageId: string,
  impagePublicId: string,
  locationId: string,
  redirectPath?: string,
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('imageId', imageId);
  urlencoded.append('imagePublicId', impagePublicId);
  urlencoded.append('locationId', locationId);

  // Build Fetch url
  const FETCH_URL = BuildFetchUrl();

  const response = await fetch(`${FETCH_URL}/api/locations/deleteLocation`, {
    method: 'DELETE',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    // Revalidate locations page
    revalidatePath('/locations', 'page');
    if (redirectPath) {
      redirect(redirectPath);
    }
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
