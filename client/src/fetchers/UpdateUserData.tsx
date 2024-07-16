import { FetchError } from '../types/GeneralTypes';

export const updateUserData = async (
  url: string,
  {
    arg,
  }: { arg: { email: string; elementName: string; elementValue: string } },
) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('email', arg.email);
  urlencoded.append('elementName', arg.elementName);
  urlencoded.append('elementValue', arg.elementValue);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: { msg: string } = await response.json();
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    return error;
  }
};
