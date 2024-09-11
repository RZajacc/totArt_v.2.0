import React from 'react';

type Props = {
  labelFor: string;
  labelText: string;
  rows: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function LabeledTextArea({ labelFor, labelText, rows, ...props }: Props) {
  return (
    <>
      <label htmlFor={labelFor} className="font-bold">
        {labelText}
      </label>
      <textarea
        name={labelFor}
        rows={rows}
        className="rounded-md border border-slate-600 p-1 focus:outline-none focus:ring-1 focus:ring-slate-600 "
        {...props}
      />
    </>
  );
}

export default LabeledTextArea;
