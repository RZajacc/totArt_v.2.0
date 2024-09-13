import { Border, Rounded, Shadow } from 'enums/StyleEnums';
import React from 'react';

type Props = {
  shadowSize?: Shadow;
  border?: Border;
  rounded?: Rounded;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonYellow({
  shadowSize,
  border,
  rounded,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`${shadowSize} ${border} ${rounded} border-black bg-gradient-to-br from-amber-200 to-amber-400 px-5 py-1 text-black shadow-black hover:border-zinc-900 hover:from-zinc-300 hover:to-zinc-100 hover:text-zinc-900`}
    >
      {children}
    </button>
  );
}

export default ButtonYellow;
