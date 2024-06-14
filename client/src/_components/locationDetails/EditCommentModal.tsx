import React from 'react';
import useSWRMutation from 'swr/mutation';
import { editComment } from '../../fetchers/EditComment';
import { User, post } from '../../types/types';

type Props = {
  showEditCommentModal: boolean;
  setShowEditCommentModal: (show: boolean) => void;
  selectedCommentContent: string;
  setSelectedCommentContent: (comment: string) => void;
  selectedCommentId: string;
  setSelectedCommentId: (id: string) => void;
  mutateUser: (user?: User) => void;
  mutateLocation: (location?: post) => void;
};

function EditCommentModal({
  showEditCommentModal,
  setShowEditCommentModal,
  selectedCommentContent,
  setSelectedCommentContent,
  selectedCommentId,
  setSelectedCommentId,
  mutateUser,
  mutateLocation,
}: Props) {
  // Create a mutation
  const { trigger } = useSWRMutation(
    'http://localhost:5000/api/comments/editComment',
    editComment,
  );
  const handleEditComment = async () => {
    //   Create editedAt date
    const editedAt = new Date().toISOString();
    try {
      // Trigger editing comment
      await trigger({
        commentId: selectedCommentId,
        editedAt: editedAt,
        updatedComment: selectedCommentContent,
      });
      // Reset comment id
      setSelectedCommentId('');
      // Mutate user and location data
      mutateUser();
      mutateLocation();
      // Close the modal
      setShowEditCommentModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 ${!showEditCommentModal ? 'hidden' : ''} h-screen w-screen bg-slate-600/70`}
      onClick={() => {
        setShowEditCommentModal(false);
      }}
    >
      <div
        className="relative top-1/3 mx-auto w-10/12 rounded-md border-2 border-orange-500 bg-slate-50 py-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <section className="border-b-2 pb-2 text-center font-bold">
          Edit your comment
        </section>
        <section className="my-4 px-1">
          <textarea
            value={selectedCommentContent}
            className="w-full p-1"
            rows={5}
            onChange={(e) => {
              setSelectedCommentContent(e.target.value);
            }}
          ></textarea>
        </section>
        <section className="flex justify-end gap-x-2 px-2">
          <button
            onClick={handleEditComment}
            className="rounded-md bg-green-400 px-2 py-1 hover:border-2 hover:border-black"
          >
            Update
          </button>
          <button
            className="rounded-md bg-red-500 px-2 py-1 hover:border-2 hover:border-black"
            onClick={() => {
              setShowEditCommentModal(false);
            }}
          >
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}

export default EditCommentModal;
