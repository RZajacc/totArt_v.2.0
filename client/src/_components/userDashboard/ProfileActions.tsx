import React from 'react';

type Props = {};

function ProfileActions({}: Props) {
  return (
    <>
      <div className="my-2 flex justify-around rounded-sm p-1">
        <button className="rounded-lg border-2 border-black bg-stone-300 p-1 px-2 shadow-md shadow-black hover:font-bold">
          Change password
        </button>
        <button className="rounded-lg border-2 border-black bg-red-500 p-1 px-2 text-stone-300 shadow-md shadow-black hover:font-bold">
          Delete account
        </button>
      </div>
    </>
  );
}

export default ProfileActions;
