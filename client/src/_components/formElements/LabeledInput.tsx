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
        className="rounded-md border border-slate-600 p-1 focus:outline-none focus:ring-1 focus:ring-slate-600 "
        {...props}
      />
    </>
  );
}

export default LabeledInput;
