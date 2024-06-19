import { FetchError } from '../types/UserTypes';

type editCommentSucc = {
  msg: string;
  updatedVal: string;
  editDate: string;
};

type editCommentErr = {
  msg: string;
};

export const editComment = async (
  url: string,
  {
    arg,
  }: {
    arg: { commentId: string; updatedComment: string; editedAt: string };
  },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('commentId', arg.commentId);
  urlencoded.append('updatedComment', arg.updatedComment);
  urlencoded.append('editedAt', arg.editedAt);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: editCommentSucc = await response.json();
    return result;
  } else {
    const result: editCommentErr = await response.json();
    const error: FetchError = new Error(
      'Something went wront with editing comment!',
    );
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
