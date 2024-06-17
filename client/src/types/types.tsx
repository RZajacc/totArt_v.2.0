export interface FetchError extends Error {
  info?: any;
  status?: number;
}

export interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  userWebsite: string;
  userBio: string;
  userImage: string;
  posts: [postId: string];
  favs: [postId: string];
  comments: [commentId: string];
}

export type contentData = {
  number: number;
  posts: post[];
};

export type post = {
  _id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  author: authorType;
  comments: [comment];
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

export type comment = {
  _id: string;
  comment: string;
  createdAt: string;
  editedAt?: string;
  isEdited?: boolean;
  author: authorType;
  relatedPost: string;
};

export type authorType = {
  _id: string;
  userName: string;
  userImage: string;
};

export type ImageUrlUpdateResponse = {
  msg: string;
};

export type editFieldStatus = {
  inputField: boolean;
  editField: boolean;
  submitField: boolean;
};

export type Image = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
};
