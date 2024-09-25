import { Border, Rounded, Shadow } from 'enums/StyleEnums';
import React from 'react';

type Props = {
  shadowSize?: Shadow;
  border?: Border;
  rounded?: Rounded;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonBlack({
  shadowSize,
  border,
  rounded,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`${shadowSize} ${border} ${rounded} border-zinc-950 bg-gradient-to-br from-zinc-700 to-zinc-950 px-5 py-1 text-zinc-100 shadow-black hover:border-zinc-900 hover:from-zinc-300 hover:to-zinc-100 hover:text-zinc-900`}
    >
      {children}
    </button>
  );
}

export default ButtonBlack;
