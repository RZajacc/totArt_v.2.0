import { useContext } from 'react';
import { comment } from '../../types/types';
import { AuthContext } from '../../context/AuthContext';

import pencil from '../../../public/pencil.svg';
import trash from '../../../public/trash-can.svg';
import Image from 'next/image';

type Props = {
  comment: comment;
  setShowDeleteCommentModal: (show: boolean) => void;
  setCommentIdToDelete: (id: string) => void;
};

function CommentElement({
  comment,
  setShowDeleteCommentModal,
  setCommentIdToDelete,
}: Props) {
  const { user } = useContext(AuthContext);

  // Converting date back from ISO string and formatting it for proper display
  const date = new Date(comment.createdAt).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  // Delete comment
  const handleDeleteComment = async () => {
    // Show the delete warning modal
    setShowDeleteCommentModal(true);
    // Pass up the id of a current comment
    setCommentIdToDelete(comment._id);
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
        <p className="comment__date bg-slate-300 px-2 py-1 text-end text-sm italic text-black">
          <strong>Added:</strong> {date}
        </p>

        {comment.author._id === user?._id ? (
          <>
            <button
              onClick={handleEditComment}
              className="comment__edit flex items-center justify-center gap-3 rounded-bl-2xl bg-blue-400 p-1 font-bold text-white"
            >
              <Image src={pencil} alt="pencil" width={15} height={15} />
              Edit
            </button>
            <button
              onClick={handleDeleteComment}
              className="comment__delete flex items-center justify-center gap-3 rounded-br-2xl bg-red-500 px-2 font-bold text-white hover:bg-slate-300"
            >
              Delete
              <Image src={trash} alt="trash-can" width={15} height={15} />
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
