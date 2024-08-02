import React from 'react';

type Props = {
  labelFor: string;
  labelText: string;
  rows: number;
};

function LabeledTextArea({ labelFor, labelText, rows }: Props) {
  return (
    <>
      <label htmlFor={labelFor} className="font-bold">
        {labelText}
      </label>
      <textarea
        name={labelFor}
        rows={rows}
        required
        className="rounded-sm p-1 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </>
  );
}

export default LabeledTextArea;
