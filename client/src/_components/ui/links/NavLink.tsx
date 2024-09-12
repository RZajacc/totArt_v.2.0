import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
  href: string;
  currentPath?: string;
  pathPattern?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function NavLink({ children, currentPath, pathPattern, ...props }: Props) {
  return (
    <Link
      {...props}
      className={`link ${currentPath === pathPattern && ' font-bold'} rounded-md px-3  text-lg text-zinc-800 hover:animate-pulse hover:cursor-pointer hover:border  hover:border-zinc-800 hover:bg-gradient-to-br hover:from-pink-400 hover:to-pink-300 hover:text-zinc-100 hover:shadow-sm hover:shadow-black`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
