import { ImageType } from './ImageTypes';

export interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  userWebsite: string;
  userBio: string;
  userImage: ImageType;
  posts: [postId: string];
  favs: [postId: string];
  comments: [commentId: string];
}

// !User update (probablt to remove)
export type editFieldStatus = {
  inputField: boolean;
  editField: boolean;
  submitField: boolean;
};
