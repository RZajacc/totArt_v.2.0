import { FetchError, Image } from '../types/types';

type responseOk = {
  msg: string;
  Image: Image;
};

type responseErr = {
  msg: string;
};

export const uploadImage = async (formData: FormData) => {
  // Append cloudinary folder name
  formData.append('folder', 'postImages');

  const response = await fetch('http://localhost:5000/api/images/imageUpload', {
    method: 'POST',
    body: formData,
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
