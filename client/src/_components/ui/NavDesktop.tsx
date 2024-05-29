import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logoNormal from '../../../public/logo_normal.png';
import { usePathname } from 'next/navigation';

type Props = {};

function NavDesktop({}: Props) {
  const pathname = usePathname();
  return (
    <div className="hidden items-center justify-between md:flex">
      <section>
        <Link href={'/'}>
          <Image src={logoNormal} alt="logo" width={30} className="mx-5" />
        </Link>
      </section>

      <section className="space-x-5">
        <Link
          href={'/'}
          className={`link ${pathname === '/' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
        >
          Home
        </Link>
        <Link
          href={'locations'}
          className={`link ${pathname === '/locations' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
        >
          Locations
        </Link>
        <Link
          href={'contact'}
          className={`link ${pathname === '/contact' ? 'font-bold hover:animate-pulse hover:cursor-default' : 'hover:animate-pulse hover:text-green-500'}`}
        >
          Contact
        </Link>
      </section>

      {/* User section */}
      <section className="mx-5 flex space-x-5">
        <Link
          href={'login'}
          className={`link ${pathname === '/login' ? 'font-bold hover:animate-pulse' : 'hover:animate-pulse hover:text-green-500'}`}
        >
          Login
        </Link>
      </section>
    </div>
  );
}

export default NavDesktop;
