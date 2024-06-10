import { FetchError } from '../types/types';

type result = {
  msg: string;
  favs: [postId: string];
};

type responseErr = {
  msg: string;
};

export const locationFavsData = async ([email, favId]: string[]) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('email', email);
  urlencoded.append('favId', favId);

  const response = await fetch(
    'http://localhost:5000/api/users/addToUserFavourites',
    {
      method: 'PATCH',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    },
  );

  if (response.ok) {
    const result: result = await response.json();
    return result;
  } else {
    const result: responseErr = await response.json();
    const error: FetchError = new Error("Something didn't go entirely well");
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
