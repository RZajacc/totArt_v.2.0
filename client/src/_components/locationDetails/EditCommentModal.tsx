import React from 'react';

type Props = {
  showEditCommentModal: boolean;
  setShowEditCommentModal: (show: boolean) => void;
  selectedCommentContent: string;
  setSelectedCommentContent: (comment: string) => void;
};

function EditCommentModal({
  showEditCommentModal,
  setShowEditCommentModal,
  selectedCommentContent,
  setSelectedCommentContent,
}: Props) {
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
            name=""
            id=""
            value={selectedCommentContent}
            className="w-full bg-slate-400"
            onChange={(e) => {
              setSelectedCommentContent(e.target.value);
            }}
          ></textarea>
        </section>
        <section className="flex justify-end gap-x-2 px-2">
          <button className="rounded-md bg-green-400 px-2 py-1 hover:border-2 hover:border-black">
            Update
          </button>
          <button
            className="rounded-md bg-red-500 px-2 py-1 hover:border-2 hover:border-black"
            onClick={() => {}}
          >
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}

export default EditCommentModal;
