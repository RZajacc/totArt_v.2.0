import { useContext } from 'react';
import { User, comment, post } from '../../types/types';
import { AuthContext } from '../../context/AuthContext';

import pencil from '../../../public/pencil.svg';
import trash from '../../../public/trash-can.svg';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';
import { deleteComment } from '../../fetchers/DeleteComment';

type Props = {
  comment: comment;
  mutateUser: (user?: User) => void;
  mutateLocation: (location?: post) => void;
};

function CommentElement({ comment, mutateUser, mutateLocation }: Props) {
  const { user } = useContext(AuthContext);

  const { trigger } = useSWRMutation(
    'http://localhost:5000/api/comments/deleteComment',
    deleteComment,
  );

  // Converting date back from ISO string and formatting it for proper display
  const date = new Date(comment.createdAt).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  // TODO Handle delete comment
  // Delete comment
  const handleDeleteComment = async () => {
    // !Call modal and call this function in it
    // !Maybe to avoid passing down mutations just make another call to SWR inside
    try {
      await trigger({ commentId: comment._id });
      // Refetch user and location
      mutateUser();
      mutateLocation();
    } catch (error) {
      console.log(error);
    }
  };

  // TODO Handle edit comment
  const handleEditComment = async () => {
    console.log('Im running!');
  };
  return (
    <>
      <div
        className={`${comment.author._id === user?._id ? 'comment__author' : 'comment'} rounded-2xl bg-slate-100`}
      >
        <Image
          src={comment.author.userImage}
          alt="user-image"
          width={42}
          height={42}
          className="comment__user-image self-center justify-self-center rounded-full"
        />

        <p className="comment__user-name ml-4 p-1 font-bold">
          {comment.author.userName}
        </p>
        <p className="comment__content ml-4 p-1">{comment.comment}</p>
        <p className="comment__date ml-4 text-sm italic text-gray-400">
          {date}
        </p>

        {comment.author._id === user?._id ? (
          <>
            <button
              onClick={handleEditComment}
              className="comment__edit bg-blue-400 px-2 font-bold text-white"
            >
              <Image src={pencil} alt="pencil" width={25} height={25} />
            </button>
            <button
              onClick={handleDeleteComment}
              className="comment__delete rounded-r-2xl bg-red-500 px-2 font-bold text-white hover:bg-slate-300"
            >
              <Image src={trash} alt="trash-can" width={25} height={25} />
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default CommentElement;
