import React from 'react';

type Props = {
  handleRemovingData: (e: React.FormEvent<HTMLFormElement>) => void;
  elementDescription: string;
  showIncorrectInput: boolean;
  setShowIncorrectInput: React.Dispatch<React.SetStateAction<boolean>>;
  providedVal: string;
};

function DeleteField({
  handleRemovingData,
  elementDescription,
  showIncorrectInput,
  setShowIncorrectInput,
  providedVal,
}: Props) {
  return (
    <div className="my-2 space-y-2 ">
      {/* Message to display */}
      <p>
        If you're sure you want to delete {elementDescription}, type{' '}
        <strong>'DELETE'</strong> below:
      </p>

      {/* Input from the user to confirm deletion */}
      <form
        onSubmit={handleRemovingData}
        className="rounded-md border-2 border-black text-center focus-within:border-rose-600"
      >
        <input
          type="text"
          name="delete-phrase"
          placeholder="type: DELETE"
          className="w-9/12 rounded-l-md px-2 py-1 focus-visible:outline-none"
          onChange={() => {
            setShowIncorrectInput(false);
          }}
        />
        <button
          type="submit"
          className=" w-3/12 rounded-r-sm border-l-2 bg-gradient-to-br from-rose-500 to-rose-900 py-1 text-zinc-100 hover:from-zinc-300 hover:to-zinc-100 hover:text-zinc-900"
        >
          Delete
        </button>
      </form>

      {/* Feedback upon failed validation */}
      <p className={`${!showIncorrectInput && 'hidden'} text-center font-bold`}>
        <small>
          Provided: <span className=" text-red-500">'{providedVal}'</span>{' '}
          instead of <span className=" text-red-500">'DELETE'</span>!
        </small>
      </p>
    </div>
  );
}

export default DeleteField;
