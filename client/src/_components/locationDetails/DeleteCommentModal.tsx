import React from 'react';
import useSWRMutation from 'swr/mutation';
import { deleteComment } from '../../fetchers/DeleteComment';
import { User, post } from '../../types/types';

type Props = {
  showDeleteCommentModal: boolean;
  setShowDeleteCommentModal: (show: boolean) => void;
  mutateUser: (user?: User) => void;
  mutateLocation: (location?: post) => void;
  setSelectedCommentId: (id: string) => void;
  selectedCommentId: string | null;
};

function DeleteCommentModal({
  showDeleteCommentModal,
  setShowDeleteCommentModal,
  mutateUser,
  mutateLocation,
  setSelectedCommentId,
  selectedCommentId,
}: Props) {
  const { trigger } = useSWRMutation(
    'http://localhost:5000/api/comments/deleteComment',
    deleteComment,
  );

  const handleDeleteComment = async () => {
    try {
      await trigger({ commentId: selectedCommentId ? selectedCommentId : '' });
      // Refetch user and location
      mutateUser();
      mutateLocation();
      // Reset comment to delete id value to empty string
      setSelectedCommentId('');
      // Hide the modal
      setShowDeleteCommentModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`fixed left-0 top-0 ${!showDeleteCommentModal ? 'hidden' : ''} h-screen w-screen bg-slate-600/70`}
      onClick={() => {
        setShowDeleteCommentModal(false);
      }}
    >
      <div
        className="relative top-1 mx-auto w-10/12 rounded-md border-2 border-black bg-slate-50 py-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <section className="border-b-2 pb-2 text-center font-bold">
          Are you 100% sure?
        </section>
        <section className="my-4 px-1">
          Deleting this comment will be permanent. You cannot take it back!
        </section>
        <section className="flex justify-end gap-x-2 px-2">
          <button
            className="rounded-md border-2 bg-green-400 px-2 py-1 hover:border-2 hover:border-black"
            onClick={handleDeleteComment}
          >
            Yes!
          </button>
          <button
            className="rounded-md bg-red-500 px-2 py-1 hover:border-2 hover:border-black"
            onClick={() => {
              setShowDeleteCommentModal(false);
            }}
          >
            No!
          </button>
        </section>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
