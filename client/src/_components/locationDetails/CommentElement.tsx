import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import pencil from '../../../public/pencil.svg';
import trash from '../../../public/trash-can.svg';
import Image from 'next/image';
import { comment } from '../../types/LocationTypes';

type Props = {
  comment: comment;
  setShowDeleteCommentModal: (show: boolean) => void;
  setShowEditCommentModal: (show: boolean) => void;
  setSelectedCommentId: (id: string) => void;
  setSelectedCommentContent: (comment: string) => void;
};

function CommentElement({
  comment,
  setShowDeleteCommentModal,
  setShowEditCommentModal,
  setSelectedCommentId,
  setSelectedCommentContent,
}: Props) {
  const { user } = useContext(AuthContext);

  const [isAuthor] = useState(comment.author._id === user?._id);

  // Converting date back from ISO string and formatting it for proper display
  const date = new Date(
    comment.isEdited ? comment.editedAt! : comment.createdAt,
  ).toLocaleDateString('de-DE', {
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
    setSelectedCommentId(comment._id);
  };

  // Handle edit comment
  const handleEditComment = async () => {
    // Show edit comment modal
    setShowEditCommentModal(true);
    // Pass up the id of a current comment
    setSelectedCommentId(comment._id);
    // Pass up comments value
    setSelectedCommentContent(comment.comment);
  };
  return (
    <>
      <div
        className={`${isAuthor ? 'comment__author' : 'comment'} rounded-2xl`}
      >
        <div className="comment__user-image self-center rounded-tr-2xl p-1">
          <Image
            src={comment.author.userImage}
            alt="user-image"
            width={36}
            height={36}
            className="rounded-xl"
          />
        </div>

        <p className="comment__user-name rounded-t-2xl bg-slate-200 pl-4 pt-2 font-bold">
          {comment.author.userName}
        </p>

        <p className="comment__content bg-slate-200 px-4 py-2">
          {comment.comment}
        </p>
        <p
          className={`${!isAuthor ? 'rounded-b-2xl' : ''} comment__date bg-slate-300 px-2 py-1 text-end text-sm italic text-black `}
        >
          <strong>{comment.isEdited ? 'Edited' : 'Added'}:</strong> {date}
        </p>

        {isAuthor ? (
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
