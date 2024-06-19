import { FetchError } from '../types/UserTypes';

type deleteResponse = {
  msg: string;
};

export const deleteComment = async (
  url: string,
  { arg }: { arg: { commentId: string } },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('_id', arg.commentId);

  const response = await fetch(url, {
    method: 'DELETE',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: deleteResponse = await response.json();
    return result;
  } else {
    const result: deleteResponse = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
