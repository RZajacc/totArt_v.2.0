import React, { useState } from 'react';
import PasswordField from '../ui/PasswordField';
import useSWRMutation from 'swr/mutation';
import { VerifyUserPassword } from '../../fetchers/VerifyUserPassword';
import { validatePassword } from '../../utils/ValidatePassword';

type Props = {};

function PasswordChange({}: Props) {
  // Password validation state variables
  const [isCurrentPswValid, setIsCurrentPswValid] = useState(true);
  const [isNewPswValid, setIsNewPswValid] = useState(true);
  const [newPswErrorList, setNewPswErrorList] = useState<string[]>([]);

  // Renderable elements
  const currentPswInvalidParagraph = (
    <p className="text-red-400">Password is incorrect!</p>
  );
  const newPswErrorParagraph = (
    <ol className="list-inside list-disc px-1 text-red-400">
      {newPswErrorList.map((err, idx) => {
        return <li key={idx}>{err}</li>;
      })}
    </ol>
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
    const newPassword = formData.get('new-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    // Verify users current password
    const verifyPassword = await triggerPswVerification({
      email: 'rf.zajac@gmail.com',
      password: currentPassword,
    });

    // Check if current password is valid
    if (!verifyPassword.passwordValid) {
      setIsCurrentPswValid(false);
    } else {
      setIsCurrentPswValid(true);
      // Check if new password is valid
      const validNewPsw = validatePassword(newPassword, confirmPassword);
      // Method returns a list of elements
      if (validNewPsw.length !== 0) {
        setIsNewPswValid(false);
        setNewPswErrorList(validNewPsw);
      }
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
        isValid={isNewPswValid}
        setIsValid={setIsNewPswValid}
      />
      <PasswordField
        labelName="confirm-password"
        labelValue="Repeat password:"
        isValid={isNewPswValid}
        setIsValid={setIsNewPswValid}
      />
      {!isNewPswValid && newPswErrorParagraph}
      <button className="my-2 rounded-sm bg-black p-2 text-white shadow-md shadow-gray-600">
        Submit
      </button>
    </form>
  );
}

export default PasswordChange;
