import React, { useContext, useState } from 'react';
import PasswordChange from './PasswordChange';
import DeleteField from '../ui/DeleteField';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { DeleteUserAccount } from '../../fetchers/DeleteUserAccount';
import { AuthContext } from '../../context/AuthContext';

type Props = {};

function ProfileActions({}: Props) {
  // Handle display state of changing password and deleteing account
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  // States required for DeleteField component to work properly
  const [showIncorrectInput, setShowIncorrectInput] = useState(false);
  const [deletePhrase, setDeletePhrase] = useState('');

  // Create instance of a router to redirect user after successfull deletion
  const router = useRouter();

  // SWR method to trigger deleting a user
  const { trigger: triggerDeletingUser } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/users/deleteUser`,
    DeleteUserAccount,
  );

  // Getting user data from context
  const { user } = useContext(AuthContext);

  // Handling displaying state of password change window and delete account
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
      setShowIncorrectInput(false);
      setShowDeleteAccount((prevState) => {
        if (showPasswordChange) {
          setShowPasswordChange(false);
        }
        return !prevState;
      });
    }
  };

  // Deleting user account
  const deleteUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behaviour
    e.preventDefault();

    // Create a form data element
    const formData = new FormData(e.currentTarget);

    // Collect the data from input
    const typedPhrase = formData.get('delete-phrase') as string;

    // Check if provided phrase match the pattern
    if (typedPhrase === 'DELETE') {
      await triggerDeletingUser({ _id: user ? user._id : '' });
      router.push('/farewell');
    } else {
      setDeletePhrase(typedPhrase);
      setShowIncorrectInput(true);
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
          className="rounded-lg border-2 border-black bg-red-500 p-1 px-2 text-stone-200 shadow-md shadow-black hover:font-bold"
          value={'delete-account'}
          onClick={actionsHandler}
        >
          Delete account
        </button>
      </div>
      {showPasswordChange && (
        <PasswordChange setShowPasswordChange={setShowPasswordChange} />
      )}
      {showDeleteAccount && (
        <div className="rounded-sm bg-slate-200 p-2 text-center">
          <DeleteField
            handleRemovingData={deleteUserHandler}
            elementDescription="your account"
            showIncorrectInput={showIncorrectInput}
            setShowIncorrectInput={setShowIncorrectInput}
            providedVal={deletePhrase}
          />
        </div>
      )}
    </>
  );
}

export default ProfileActions;
