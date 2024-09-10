// Types
import type { FetchError } from '@/types/GeneralTypes';

export const UpdateUserPassword = async (
  url: string,
  { arg }: { arg: { email: string; password: string } },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('email', arg.email);
  urlencoded.append('password', arg.password);

  const response = await fetch(url, {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: { msg: string } = await response.json();
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Something went wrong!');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
