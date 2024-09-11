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
      className={`link ${currentPath === pathPattern ? 'text-lg font-bold text-zinc-800  hover:animate-pulse hover:cursor-pointer' : 'text-lg hover:animate-pulse hover:text-green-700'}`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
