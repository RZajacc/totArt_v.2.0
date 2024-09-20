import { authorType } from './locationTypes';

export type comment = {
  _id: string;
  comment: string;
  createdAt: string;
  editedAt?: string;
  isEdited?: boolean;
  author: authorType;
  relatedPost: string;
};

export type AddComment = {
  msg: string;
  comment: {
    comment: string;
    createdAt: string;
    author: string;
    relatedPost: string;
  };
};
