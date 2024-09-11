import React from 'react';

type Props = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonDark({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="rounded-md bg-gradient-to-br from-zinc-500 to-zinc-900 px-5 py-1 text-zinc-100 shadow-sm shadow-black hover:border-zinc-900 hover:from-zinc-300 hover:to-zinc-100 hover:text-zinc-900"
    >
      {children}
    </button>
  );
}

export default ButtonDark;
