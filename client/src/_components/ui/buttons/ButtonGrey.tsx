import { Border, Shadow } from 'enums/StyleEnums';
import React from 'react';

type Props = {
  shadowSize?: Shadow;
  border?: Border;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonGrey({ shadowSize, border, children, ...props }: Props) {
  return (
    <button
      {...props}
      className={`shadow-${shadowSize} ${border} rounded-md border-black bg-gradient-to-br from-gray-300 to-gray-600 px-5 py-1 text-zinc-100 shadow-black hover:border-zinc-900 hover:from-zinc-300 hover:to-zinc-100 hover:text-zinc-900`}
    >
      {children}
    </button>
  );
}

export default ButtonGrey;
