import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function LinkDark({ children, ...props }: Props) {
  return (
    <Link
      {...props}
      className="mx-auto rounded-md border border-zinc-100 bg-gradient-to-br from-zinc-500 to-zinc-900 px-4 py-2 text-zinc-50 shadow-sm shadow-black hover:border-zinc-900 hover:from-pink-400 hover:to-pink-300 "
    >
      {children}
    </Link>
  );
}

export default LinkDark;
