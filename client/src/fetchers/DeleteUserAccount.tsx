import { FetchError } from '../types/GeneralTypes';

export const DeleteUserAccount = async (
  url: string,
  { arg }: { arg: { _id: string } },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('_id', arg._id);

  const response = await fetch(url, {
    method: 'DELETE',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: { msg: string } = await response.json();
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error(
      'Something went wrong while deleting user account',
    );
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
