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
  favs: [{ _id: string; title: string }];
  comments: [commentId: string];
}
