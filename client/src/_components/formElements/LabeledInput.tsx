import React from 'react';

type Props = {
  labelFor: string;
  labelText: string;
  inputType: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function LabeledInput({ labelFor, labelText, inputType, ...props }: Props) {
  return (
    <>
      <label htmlFor={labelFor} className="font-bold">
        {labelText}
      </label>
      <input
        type={inputType}
        name={labelFor}
        className="rounded-sm p-1 focus:outline-none focus:ring-2 focus:ring-green-400"
        required
        {...props}
      />
    </>
  );
}

export default LabeledInput;
