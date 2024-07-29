import React from 'react';

type Props = {
  showDeleteField: boolean;
  handleRemovingData: (e: React.FormEvent<HTMLFormElement>) => void;
};

function DeleteField({ showDeleteField, handleRemovingData }: Props) {
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
          placeholder="type: DELETE"
          className="w-9/12 rounded-l-md px-1 py-1 focus-visible:outline-none"
        />
        <button
          type="submit"
          className=" w-3/12 rounded-r-sm border-l-2 border-black bg-red-500 py-1 font-bold text-stone-200 hover:bg-stone-200 hover:text-red-500"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export default DeleteField;
