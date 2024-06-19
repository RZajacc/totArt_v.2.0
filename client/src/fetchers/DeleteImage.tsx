import { FetchError } from '../types/GeneralTypes';

export const deleteImage = async (
  url: string,
  { arg }: { arg: { publicId: string } },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('publicId', arg.publicId);

  const response = await fetch(url, {
    method: 'DELETE',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: { message: string; userImage: { result: string } } =
      await response.json();
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Failed to delete the image');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
