import { useContext } from 'react';
import { comment } from '../../types/types';
import { AuthContext } from '../../context/AuthContext';

import pencil from '../../../public/pencil.svg';
import trash from '../../../public/trash-can.svg';
import Image from 'next/image';

type Props = {
  comment: comment;
  handleDeleteComment: (id: string) => void;
};

function CommentElement({ comment, handleDeleteComment }: Props) {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    handleDeleteComment(comment._id);
  };

  // Converting date back from ISO string and formatting it for proper display
  const date = new Date(comment.createdAt).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  // TODO Handle edit comment

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
              onClick={handleDelete}
              className="comment__edit bg-blue-400 px-2 font-bold text-white"
            >
              <Image src={pencil} alt="pencil" width={25} height={25} />
            </button>
            <button
              onClick={handleDelete}
              className="comment__delete rounded-r-2xl bg-red-500 px-2 font-bold text-white"
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
