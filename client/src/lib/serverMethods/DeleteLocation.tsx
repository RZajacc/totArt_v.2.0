'use server';
// Types
import type { FetchError } from '@/types/GeneralTypes';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const DeleteLocation = async (
  imageId: string,
  impagePublicId: string,
  locationId: string,
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('imageId', imageId);
  urlencoded.append('imagePublicId', impagePublicId);
  urlencoded.append('locationId', locationId);

  const response = await fetch(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/locations/deleteLocation`,
    {
      method: 'DELETE',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    },
  );

  if (response.ok) {
    // Revalidate locations page
    revalidatePath('/locations', 'page');
    redirect('/locations');
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
