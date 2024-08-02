import React from 'react';

type Props = {
  labelFor: string;
  labelText: string;
  inputType: string;
};

function LabeledInput({ labelFor, labelText, inputType }: Props) {
  return (
    <>
      <label htmlFor={labelFor} className="font-bold">
        {labelText}
      </label>
      <input
        type={inputType}
        name={labelFor}
        autoComplete="first-name"
        className="rounded-sm p-1 focus:outline-none focus:ring-2 focus:ring-green-400"
        required
      />
    </>
  );
}

export default LabeledInput;
