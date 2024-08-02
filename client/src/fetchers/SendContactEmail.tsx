import { FetchError } from '../types/GeneralTypes';

export const sendContactEmail = async (
  url: string,
  {
    arg,
  }: { arg: { name: string; email: string; subject: string; message: string } },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('name', arg.name);
  urlencoded.append('email', arg.email);
  urlencoded.append('subject', arg.subject);
  urlencoded.append('message', arg.message);

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
    const error: FetchError = new Error('Something went wront');
    error.info = 'Email was not sent!';
    error.status = response.status;
    throw error;
  }
};
