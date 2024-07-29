import React from 'react';

type Props = {
  showDeleteField: boolean;
  handleRemovingData: (e: React.FormEvent<HTMLFormElement>) => void;
  showIncorrectInput: boolean;
  providedVal: string;
};

function DeleteField({
  showDeleteField,
  handleRemovingData,
  showIncorrectInput,
  providedVal,
}: Props) {
  return (
    <div className={`${!showDeleteField && 'hidden'}`}>
      <p>
        If you're sure you want to delete this location, type{' '}
        <strong>'DELETE'</strong> below:
      </p>

      <form
        onSubmit={handleRemovingData}
        className="rounded-md border-2 border-black text-center focus-within:border-red-500"
      >
        <input
          type="text"
          name="delete-phrase"
          placeholder="type: DELETE"
          className="w-9/12 rounded-l-md px-2 py-1 focus-visible:outline-none"
        />
        <button
          type="submit"
          className=" w-3/12 rounded-r-sm border-l-2 border-red-500 bg-red-500 py-1 font-bold text-stone-200 hover:bg-stone-200 hover:text-red-500"
        >
          Delete
        </button>
      </form>
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
