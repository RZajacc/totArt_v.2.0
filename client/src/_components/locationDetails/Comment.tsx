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
      <img src={comment.author.userImage} alt="" className="picStyle" />

      <p>
        <strong>{comment.author.userName}</strong>
      </p>
      <p>{comment.comment}</p>

      {comment.author._id === user?._id ? (
        <button value={comment.comment} onClick={handleDelete}>
          Delete
        </button>
      ) : (
        ''
      )}
    </>
  );
}

export default Comment;
