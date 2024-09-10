// Types
import type { ImageType } from './ImageTypes';

export interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  userWebsite: string;
  userBio: string;
  userImage: ImageType;
  posts: [
    { _id: string; title: string; image: { _id: string; public_id: string } },
  ];
  favs: [{ _id: string; title: string }];
  comments: [commentId: string];
}
