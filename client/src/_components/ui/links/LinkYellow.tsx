import { Border, Rounded, Shadow } from 'enums/StyleEnums';
import Link from 'next/link';
import React from 'react';

type Props = {
  shadowSize?: Shadow;
  border?: Border;
  rounded?: Rounded;
  children: React.ReactNode;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function LinkYellow({
  shadowSize,
  border,
  rounded,
  children,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      className={`${shadowSize} ${border} ${rounded} border-black bg-gradient-to-br from-amber-200 to-amber-400 px-5 py-[5px] text-black shadow-black hover:border-zinc-900 hover:from-pink-400 hover:to-pink-300 hover:text-zinc-900`}
    >
      {children}
    </Link>
  );
}

export default LinkYellow;
