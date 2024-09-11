import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function LinkGreen({ children, ...props }: Props) {
  return (
    <Link
      {...props}
      className="mx-auto rounded-md border border-zinc-100 bg-gradient-to-br from-emerald-500 to-emerald-300 px-4 py-2 text-zinc-900 shadow-md shadow-black hover:border-zinc-900 hover:from-pink-400 hover:to-pink-300 "
    >
      {children}
    </Link>
  );
}

export default LinkGreen;
