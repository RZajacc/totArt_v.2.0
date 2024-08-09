import Image from 'next/image';
import React, { useState } from 'react';
import showPasswordIcon from '../../assets/eye-password-show-svgrepo-com.svg';
import hidePasswordIcon from '../../assets/eye-off-svgrepo-com.svg';

type Props = {
  labelName: string;
  labelValue: string;
  invalidateInput: boolean;
  setInvalidateInput: React.Dispatch<React.SetStateAction<boolean>>;
} & React.InputHTMLAttributes<HTMLInputElement>;

function PasswordField({
  labelName,
  labelValue,
  invalidateInput,
  setInvalidateInput,
  ...props
}: Props) {
  // Toggle text or password display on input
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label htmlFor={labelName} className="font-bold">
        {labelValue}
      </label>
      {/* Define input field */}
      <div className="relative flex">
        <input
          type={`${showPassword ? 'text' : 'password'}`}
          name={labelName}
          onChange={() => {
            setInvalidateInput(false);
          }}
          {...props}
          className={`w-full rounded-md border ${invalidateInput ? 'border-red-500 text-red-400 focus:ring-red-500' : 'border-slate-600 focus:ring-slate-600'}  p-1 px-2 focus:outline-none focus:ring-1 `}
        />
        <button
          className="absolute right-2 top-1 w-7"
          onClick={() => {
            setShowPassword((prevState) => !prevState);
          }}
        >
          <Image
            src={showPassword ? hidePasswordIcon : showPasswordIcon}
            alt="show"
          />
        </button>
      </div>
    </>
  );
}

export default PasswordField;
