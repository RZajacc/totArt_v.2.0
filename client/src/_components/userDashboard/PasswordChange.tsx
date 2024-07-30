import React, { useState } from 'react';
import PasswordField from '../ui/PasswordField';
import useSWRMutation from 'swr/mutation';
import { VerifyUserPassword } from '../../fetchers/VerifyUserPassword';

type Props = {};

function PasswordChange({}: Props) {
  // Password validation state variables
  const [isCurrentPswValid, setIsCurrentPswValid] = useState(true);
  const [isNewPswValid, setIsNewPswValid] = useState(true);

  // Renderable elements
  const currentPswInvalidParagraph = (
    <p className="text-red-400">Password is incorrect!</p>
  );
  // Methods to validate and update user password
  const { trigger: triggerPswVerification } = useSWRMutation(
    'http://localhost:5000/api/users/verifyUserPassword',
    VerifyUserPassword,
  );

  // Handle password update method
  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('current-password') as string;

    // Verify users current password
    const verifyPassword = await triggerPswVerification({
      email: 'rf.zajac@gmail.com',
      password: currentPassword,
    });

    if (!verifyPassword.passwordValid) {
      setIsCurrentPswValid(false);
    } else {
      setIsCurrentPswValid(true);
    }
  };
  return (
    <form
      className="my-6 flex flex-col gap-2 bg-slate-200 p-4"
      onSubmit={handlePasswordUpdate}
    >
      <PasswordField
        labelName="current-password"
        labelValue="Current password:"
        isValid={isCurrentPswValid}
        setIsValid={setIsCurrentPswValid}
      />
      {!isCurrentPswValid && currentPswInvalidParagraph}
      <PasswordField
        labelName="new-password"
        labelValue=" New password:"
        isValid={true}
      />
      <PasswordField
        labelName="confirm-password"
        labelValue="Repeat password:"
        isValid={false}
      />
      <button className="my-2 rounded-sm bg-black p-2 text-white shadow-md shadow-gray-600">
        Submit
      </button>
    </form>
  );
}

export default PasswordChange;
