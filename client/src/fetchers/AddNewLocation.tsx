import { FetchError } from '../types/GeneralTypes';

export const addNewLocation = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      title: string;
      description: string;
      location: string;
      imageUrl: string;
      author: string;
    };
  },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('title', arg.title);
  urlencoded.append('description', arg.description);
  urlencoded.append('location', arg.location);
  urlencoded.append('imageUrl', arg.imageUrl);
  urlencoded.append('author', arg.author);

  const response = await fetch(url, {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: { msg: string; postId: string } = await response.json();
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Failed adding new location');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
