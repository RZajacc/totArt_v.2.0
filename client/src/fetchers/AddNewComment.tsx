import { FetchError, comment } from '../types/types';

type badResponse = {
  msg: string;
};

export const addNewComment = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      comment: string;
      createdAt: Date;
      author: string;
      relatedPost: string;
    };
  },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('comment', arg.comment);
  urlencoded.append('createdAt', arg.createdAt.toString());
  urlencoded.append('author', arg.author);
  urlencoded.append('relatedPost', arg.relatedPost);

  const response = await fetch(url, {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });
  if (response.ok) {
    const result: comment = await response.json();
    return result;
  } else {
    const result: badResponse = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
