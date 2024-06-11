import { useContext } from 'react';
import { comment } from '../../types/types';
import { AuthContext } from '../../context/AuthContext';

type Props = {
  comment: comment;
  handleDeleteComment: (id: string) => void;
};

function Comment({ comment, handleDeleteComment }: Props) {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    handleDeleteComment(comment._id);
  };

  return (
    <>
      <div className="comment rounded-2xl bg-slate-100 p-2">
        <img
          src={comment.author.userImage}
          alt=""
          className="comment__user-image self-center rounded-full"
        />

        <p className="comment__user-name ml-4 text-lg font-bold">
          {comment.author.userName}
        </p>
        <p className="comment__content ml-4">{comment.comment}</p>
        <p className="comment__date ml-4 text-sm italic text-gray-400">
          temp_date - 2024-06-11
        </p>

        {comment.author._id === user?._id ? (
          <button value={comment.comment} onClick={handleDelete}>
            Delete
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default Comment;
