import React from 'react';

type Props = {
  children: React.ReactNode;
};

function SubmitButton({ children }: Props) {
  return (
    <button
      type="submit"
      className="my-2 rounded-sm border border-black bg-black p-1 text-white hover:bg-slate-200 hover:text-black"
    >
      {children}
    </button>
  );
}

export default SubmitButton;
