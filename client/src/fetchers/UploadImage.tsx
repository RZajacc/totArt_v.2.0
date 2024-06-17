import { FetchError, Image } from '../types/types';

type responseOk = {
  msg: string;
  Image: Image;
};

type responseErr = {
  msg: string;
};

export const uploadImage = async (
  url: string,
  { arg }: { arg: { image: File; folder: string } },
) => {
  // Append cloudinary folder name
  const formdata = new FormData();
  formdata.append('userImage', arg.image);
  formdata.append('folder', arg.folder);

  const response = await fetch(url, {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: responseOk = await response.json();
    return result;
  } else {
    const result: responseErr = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
