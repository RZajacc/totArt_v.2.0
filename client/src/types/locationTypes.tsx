export type post = {
  _id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  author: authorType;
  comments: [comment];
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
