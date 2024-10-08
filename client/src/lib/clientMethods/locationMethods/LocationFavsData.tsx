// Types
import type { FetchError } from '@/types/GeneralTypes';

export const locationFavsData = async (
  url: string,
  { arg }: { arg: { email: string; locactionId: string } },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('email', arg.email);
  urlencoded.append('favId', arg.locactionId);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: { msg: string; favs: [postId: string] } =
      await response.json();
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error("Something didn't go entirely well");
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
