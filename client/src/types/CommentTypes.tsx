import { authorType } from './locationTypes';

export type populatedComment = {
  _id: string;
  comment: string;
  createdAt: string;
  editedAt?: string;
  isEdited?: boolean;
  author: authorType;
  relatedPost: string;
};

export type comment = {
  _id: string;
  comment: string;
  createdAt: string;
  editedAt?: string;
  isEdited?: boolean;
  author: string;
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
