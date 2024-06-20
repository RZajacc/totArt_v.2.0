import { FetchError } from '../types/GeneralTypes';
import { ImageType } from '../types/ImageTypes';

export const locationImageUpload = async (
  url: string,
  { arg }: { arg: { file: File; folder: string; related_location: string } },
) => {
  const formdata = new FormData();
  formdata.append('userImage', arg.file);
  formdata.append('folder', arg.folder);
  formdata.append('related_location', arg.related_location);

  const response = await fetch(url, {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  });

  if (response.ok) {
    const result: { Image: ImageType } = await response.json();
    return result;
  } else {
    const result: { msg: string } = await response.json();
    const error: FetchError = new Error('Something went wrong');
    error.info = result.msg;
    error.status = response.status;
    throw error;
  }
};
