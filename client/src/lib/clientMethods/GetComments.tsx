import { comment } from '@/types/CommentTypes';
import { FetchError } from '@/types/GeneralTypes';

export const getComments = async (locationId: string) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('locationId', locationId);

  const response = await fetch(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/comments/getComments`,
    {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    },
  );

  if (response.ok) {
    const data: { count: number; comments: comment[] } = await response.json();
    return data;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
