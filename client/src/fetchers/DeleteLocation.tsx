// Types
import type { FetchError } from '@/types/GeneralTypes';

export const DeleteLocation = async (
  url: string,
  {
    arg,
  }: { arg: { imageId: string; impagePublicId: string; locationId: string } },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('imageId', arg.imageId);
  urlencoded.append('imagePublicId', arg.impagePublicId);
  urlencoded.append('locationId', arg.locationId);

  const response = await fetch(url, {
    method: 'DELETE',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: {
      msg: string;
      cloudinaryResponse: string;
      deletedImageId: string;
      locationTitle: string;
      locationAuthor: string;
    } = await response.json();
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
