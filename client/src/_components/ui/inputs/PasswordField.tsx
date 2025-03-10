// Libraries
import Image from 'next/image';
import React, { useState } from 'react';
// Components
import PasswordTooltip from './PasswordTooltip';
// Assets
import showPasswordIcon from '@/assets/eye-password-show-svgrepo-com.svg';
import hidePasswordIcon from '@/assets/eye-off-svgrepo-com.svg';

type Props = {
  labelName: string;
  labelValue: string;
  invalidateInput: boolean;
  setInvalidateInput: React.Dispatch<React.SetStateAction<boolean>>;
  showTooltip?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

function PasswordField({
  labelName,
  labelValue,
  invalidateInput,
  setInvalidateInput,
  showTooltip,
  ...props
}: Props) {
  // Toggle text or password display on input
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label
        htmlFor={labelName}
        className="flex items-center justify-between font-bold"
      >
        {labelValue}

        {/* Show or hide tooltip */}
        {showTooltip && <PasswordTooltip />}
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

        {/* Show or hide password field */}
        <button
          type="button"
          className="absolute right-2 top-1 w-7"
          onClick={() => {
            setShowPassword((prevState) => !prevState);
          }}
        >
          <Image
            src={showPassword ? hidePasswordIcon : showPasswordIcon}
            alt="show-hide password"
            priority
          />
        </button>
      </div>
    </>
  );
}

export default PasswordField;
