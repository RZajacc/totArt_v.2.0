import { populatedComment } from './CommentTypes';
import { ImageType } from './ImageTypes';

export type locationData = {
  _id: string;
  title: string;
  description: string;
  location: string;
  image: ImageType;
  author: authorType;
  comments: [populatedComment];
};

export type authorType = {
  _id: string;
  userName: string;
  userImage: ImageType;
};
