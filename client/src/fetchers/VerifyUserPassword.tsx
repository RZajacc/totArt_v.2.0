import { FetchError } from '../types/GeneralTypes';

export const VerifyUserPassword = async (
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
    const result: { passwordValid: boolean } = await response.json();
    return result;
  } else {
    const result: { passwordValid: boolean } = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.passwordValid;
    error.status = response.status;
    return error;
  }
};
