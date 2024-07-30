import React, { useState } from 'react';
import PasswordField from '../ui/PasswordField';

type Props = {};

function PasswordChange({}: Props) {
  // Password validation state variables
  const [isCurrentPswValid, setIsCurrentPswValid] = useState(false);
  const [isNewPswValid, setIsNewPswValid] = useState(false);

  // Handle password update method
  const handlePasswordUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('current-password') as string;
    console.log(currentPassword);
  };
  return (
    <form
      className="my-6 flex flex-col gap-2 bg-slate-200 p-4"
      onSubmit={handlePasswordUpdate}
    >
      <PasswordField
        labelName="current-password"
        labelValue="Current password:"
        isValid={true}
      />
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
