import React, { useState } from 'react';
import PasswordChange from './PasswordChange';
import DeleteField from '../ui/DeleteField';

type Props = {};

function ProfileActions({}: Props) {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const actionsHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e.currentTarget.value === 'password-change') {
      setShowPasswordChange((prevState) => {
        if (showDeleteAccount) {
          setShowDeleteAccount(false);
        }
        return !prevState;
      });
    } else if (e.currentTarget.value === 'delete-account') {
      setShowDeleteAccount((prevState) => {
        if (showPasswordChange) {
          setShowPasswordChange(false);
        }
        return !prevState;
      });
    }
  };
  return (
    <>
      <div className="my-2 flex justify-around rounded-sm p-1">
        <button
          className="rounded-lg border-2 border-black bg-stone-300 p-1 px-2 shadow-md shadow-black hover:font-bold"
          value={'password-change'}
          onClick={actionsHandler}
        >
          Change password
        </button>
        <button
          className="rounded-lg border-2 border-black bg-red-500 p-1 px-2 text-stone-300 shadow-md shadow-black hover:font-bold"
          value={'delete-account'}
          onClick={actionsHandler}
        >
          Delete account
        </button>
      </div>
      {showPasswordChange && (
        <PasswordChange setShowPasswordChange={setShowPasswordChange} />
      )}
      {/* {showDeleteAccount && <DeleteField />} */}
    </>
  );
}

export default ProfileActions;
