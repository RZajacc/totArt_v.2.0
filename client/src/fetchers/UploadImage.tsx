import { FetchError, Image } from '../types/UserTypes';

export const uploadImage = async (
  url: string,
  { arg }: { arg: { file: File; folder: string } },
) => {
  const formdata = new FormData();
  formdata.append('userImage', arg.file);
  formdata.append('folder', arg.folder);

  const response = await fetch(url, {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: { Image: Image } = await response.json();
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
