import React, { useRef } from 'react';
import PasswordField from '../ui/PasswordField';

type Props = {};

function PasswordChange({}: Props) {
  const testRef = useRef<HTMLInputElement | null>(null);
  const handlePasswordUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('current-password');
    testRef.current?.validity.valid!;
    console.log(testRef.current?.setAttribute('isvalid', 'false'));
  };
  return (
    <form
      className="flex flex-col gap-2 bg-slate-200 p-2"
      onSubmit={handlePasswordUpdate}
    >
      <input type="text" ref={testRef} className="invalid:text-red-500" />
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
