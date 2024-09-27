// Types
import type { FetchError } from '@/types/GeneralTypes';
import type { AddComment } from '@/types/CommentTypes';

export const addNewComment = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      comment: string;
      createdAt: string;
      author: string;
      relatedPost: string;
    };
  },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('comment', arg.comment);
  urlencoded.append('createdAt', arg.createdAt);
  urlencoded.append('author', arg.author);
  urlencoded.append('relatedPost', arg.relatedPost);

  const response = await fetch(url, {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });
  if (response.ok) {
    const result: AddComment = await response.json();
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
