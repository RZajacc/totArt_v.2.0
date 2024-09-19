// Libraries
import { FormEvent, useContext, useState } from 'react';
import Image from 'next/image';
// Context data
import { AuthContext } from '@/context/AuthContext';
// Assets
import noUser from '@/assets/noUser.png';
import pencil from '@/assets/pencil.svg';
import trash from '@/assets/trash-can.svg';
// Types
import type { comment } from '@/types/locationTypes';
import Modal from '../ui/Modal';
import LabeledTextArea from '../ui/inputs/LabeledTextArea';

type modalData = {
  displayModal: boolean;
  seletectedAction: string;
  cancelText: string;
  submitText: string;
};

type Props = {
  comment: comment;
};

function CommentElement({ comment }: Props) {
  const modalDefault: modalData = {
    displayModal: false,
    seletectedAction: '',
    cancelText: '',
    submitText: '',
  };
  // Context data
  const { user } = useContext(AuthContext);
  // Verify if user is an author
  const [isAuthor] = useState(comment.author._id === user?._id);
  // Modal display options
  const [modalData, setModalData] = useState<modalData>(modalDefault);

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
    console.log('Deleting');
    // setDisplayModal(true);
    // setDeleteAction(true);
    // Show the delete warning modal
    // setShowDeleteCommentModal(true);
    // Pass up the id of a current comment
    // setSelectedCommentId(comment._id);
  };

  // Handle edit comment
  const handleEditComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Editing');
    // setDisplayModal(true);
    // setEditAction(true);
    // Show edit comment modal
    // setShowEditCommentModal(true);
    // Pass up the id of a current comment
    // setSelectedCommentId(comment._id);
    // Pass up comments value
    // setSelectedCommentContent(comment.comment);
  };

  const handleEditModal = () => {
    setModalData({
      displayModal: true,
      seletectedAction: 'edit',
      cancelText: 'Cancel',
      submitText: 'Submit',
    });
  };

  const handleDeleteModal = () => {
    setModalData({
      displayModal: true,
      seletectedAction: 'delete',
      cancelText: 'Cancel!',
      submitText: 'Yes, Im sure..',
    });
  };

  const closeModalHandler = () => {
    setModalData(modalDefault);
  };

  const handleModalAction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modalData.seletectedAction === 'edit') {
      handleEditComment(e);
    }
    if (modalData.seletectedAction === 'delete') {
      handleDeleteComment();
    }
    setModalData(modalDefault);
  };

  console.log(modalData);
  return (
    <>
      <div
        className={`${isAuthor ? 'comment__author' : 'comment'} rounded-2xl`}
      >
        <div className="comment__user-image self-center rounded-tr-2xl">
          {comment.author.userImage ? (
            <Image
              src={comment.author.userImage.secure_url}
              alt="user-image"
              width={comment.author.userImage.width}
              height={comment.author.userImage.height}
              className="rounded-lg pr-1"
            />
          ) : (
            <Image src={noUser} alt="user-image" className="rounded-lg pr-1" />
          )}
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
              value="edit"
              onClick={handleEditModal}
              className="comment__edit flex items-center justify-center gap-3 rounded-bl-2xl bg-blue-400 p-1 font-bold text-white"
            >
              <Image src={pencil} alt="pencil" width={15} height={15} />
              Edit
            </button>
            <button
              value="delete"
              onClick={handleDeleteModal}
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

      <Modal
        modalDisplay={modalData.displayModal}
        cancelButtonText={modalData.cancelText}
        submitButtonText={modalData.submitText}
        closeHandler={closeModalHandler}
        submitHandler={handleModalAction}
      >
        {modalData.seletectedAction === 'edit' && (
          <LabeledTextArea
            labelFor="comment"
            labelText="Change"
            rows={3}
            defaultValue={comment.comment}
          />
        )}
        {modalData.seletectedAction === 'delete' && (
          <>
            <h1 className="text-center font-bold">Warning!</h1>
            <p>
              Are you sure you want to delete your comment? They change is not
              reversible!
            </p>
          </>
        )}
      </Modal>
    </>
  );
}

export default CommentElement;
